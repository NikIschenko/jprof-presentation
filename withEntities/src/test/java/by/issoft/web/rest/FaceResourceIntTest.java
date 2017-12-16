package by.issoft.web.rest;

import by.issoft.WithEntitiesApp;

import by.issoft.domain.Face;
import by.issoft.repository.FaceRepository;
import by.issoft.service.FaceService;
import by.issoft.service.dto.FaceDTO;
import by.issoft.service.mapper.FaceMapper;
import by.issoft.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static by.issoft.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import by.issoft.domain.enumeration.Gender;
/**
 * Test class for the FaceResource REST controller.
 *
 * @see FaceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WithEntitiesApp.class)
public class FaceResourceIntTest {

    private static final String DEFAULT_FACE_ID = "AAAAAAAAAA";
    private static final String UPDATED_FACE_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_TOP = 1;
    private static final Integer UPDATED_TOP = 2;

    private static final Integer DEFAULT_LEFT = 1;
    private static final Integer UPDATED_LEFT = 2;

    private static final Integer DEFAULT_WIDTH = 1;
    private static final Integer UPDATED_WIDTH = 2;

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final Double DEFAULT_AGE = 1D;
    private static final Double UPDATED_AGE = 2D;

    @Autowired
    private FaceRepository faceRepository;

    @Autowired
    private FaceMapper faceMapper;

    @Autowired
    private FaceService faceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFaceMockMvc;

    private Face face;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FaceResource faceResource = new FaceResource(faceService);
        this.restFaceMockMvc = MockMvcBuilders.standaloneSetup(faceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Face createEntity(EntityManager em) {
        Face face = new Face()
            .faceId(DEFAULT_FACE_ID)
            .top(DEFAULT_TOP)
            .left(DEFAULT_LEFT)
            .width(DEFAULT_WIDTH)
            .height(DEFAULT_HEIGHT)
            .gender(DEFAULT_GENDER)
            .age(DEFAULT_AGE);
        return face;
    }

    @Before
    public void initTest() {
        face = createEntity(em);
    }

    @Test
    @Transactional
    public void createFace() throws Exception {
        int databaseSizeBeforeCreate = faceRepository.findAll().size();

        // Create the Face
        FaceDTO faceDTO = faceMapper.toDto(face);
        restFaceMockMvc.perform(post("/api/faces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceDTO)))
            .andExpect(status().isCreated());

        // Validate the Face in the database
        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeCreate + 1);
        Face testFace = faceList.get(faceList.size() - 1);
        assertThat(testFace.getFaceId()).isEqualTo(DEFAULT_FACE_ID);
        assertThat(testFace.getTop()).isEqualTo(DEFAULT_TOP);
        assertThat(testFace.getLeft()).isEqualTo(DEFAULT_LEFT);
        assertThat(testFace.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testFace.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testFace.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testFace.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    @Transactional
    public void createFaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faceRepository.findAll().size();

        // Create the Face with an existing ID
        face.setId(1L);
        FaceDTO faceDTO = faceMapper.toDto(face);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaceMockMvc.perform(post("/api/faces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Face in the database
        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFaceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = faceRepository.findAll().size();
        // set the field null
        face.setFaceId(null);

        // Create the Face, which fails.
        FaceDTO faceDTO = faceMapper.toDto(face);

        restFaceMockMvc.perform(post("/api/faces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceDTO)))
            .andExpect(status().isBadRequest());

        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFaces() throws Exception {
        // Initialize the database
        faceRepository.saveAndFlush(face);

        // Get all the faceList
        restFaceMockMvc.perform(get("/api/faces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(face.getId().intValue())))
            .andExpect(jsonPath("$.[*].faceId").value(hasItem(DEFAULT_FACE_ID.toString())))
            .andExpect(jsonPath("$.[*].top").value(hasItem(DEFAULT_TOP)))
            .andExpect(jsonPath("$.[*].left").value(hasItem(DEFAULT_LEFT)))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE.doubleValue())));
    }

    @Test
    @Transactional
    public void getFace() throws Exception {
        // Initialize the database
        faceRepository.saveAndFlush(face);

        // Get the face
        restFaceMockMvc.perform(get("/api/faces/{id}", face.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(face.getId().intValue()))
            .andExpect(jsonPath("$.faceId").value(DEFAULT_FACE_ID.toString()))
            .andExpect(jsonPath("$.top").value(DEFAULT_TOP))
            .andExpect(jsonPath("$.left").value(DEFAULT_LEFT))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFace() throws Exception {
        // Get the face
        restFaceMockMvc.perform(get("/api/faces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFace() throws Exception {
        // Initialize the database
        faceRepository.saveAndFlush(face);
        int databaseSizeBeforeUpdate = faceRepository.findAll().size();

        // Update the face
        Face updatedFace = faceRepository.findOne(face.getId());
        // Disconnect from session so that the updates on updatedFace are not directly saved in db
        em.detach(updatedFace);
        updatedFace
            .faceId(UPDATED_FACE_ID)
            .top(UPDATED_TOP)
            .left(UPDATED_LEFT)
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT)
            .gender(UPDATED_GENDER)
            .age(UPDATED_AGE);
        FaceDTO faceDTO = faceMapper.toDto(updatedFace);

        restFaceMockMvc.perform(put("/api/faces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceDTO)))
            .andExpect(status().isOk());

        // Validate the Face in the database
        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeUpdate);
        Face testFace = faceList.get(faceList.size() - 1);
        assertThat(testFace.getFaceId()).isEqualTo(UPDATED_FACE_ID);
        assertThat(testFace.getTop()).isEqualTo(UPDATED_TOP);
        assertThat(testFace.getLeft()).isEqualTo(UPDATED_LEFT);
        assertThat(testFace.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testFace.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testFace.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testFace.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    @Transactional
    public void updateNonExistingFace() throws Exception {
        int databaseSizeBeforeUpdate = faceRepository.findAll().size();

        // Create the Face
        FaceDTO faceDTO = faceMapper.toDto(face);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFaceMockMvc.perform(put("/api/faces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceDTO)))
            .andExpect(status().isCreated());

        // Validate the Face in the database
        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFace() throws Exception {
        // Initialize the database
        faceRepository.saveAndFlush(face);
        int databaseSizeBeforeDelete = faceRepository.findAll().size();

        // Get the face
        restFaceMockMvc.perform(delete("/api/faces/{id}", face.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Face> faceList = faceRepository.findAll();
        assertThat(faceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Face.class);
        Face face1 = new Face();
        face1.setId(1L);
        Face face2 = new Face();
        face2.setId(face1.getId());
        assertThat(face1).isEqualTo(face2);
        face2.setId(2L);
        assertThat(face1).isNotEqualTo(face2);
        face1.setId(null);
        assertThat(face1).isNotEqualTo(face2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FaceDTO.class);
        FaceDTO faceDTO1 = new FaceDTO();
        faceDTO1.setId(1L);
        FaceDTO faceDTO2 = new FaceDTO();
        assertThat(faceDTO1).isNotEqualTo(faceDTO2);
        faceDTO2.setId(faceDTO1.getId());
        assertThat(faceDTO1).isEqualTo(faceDTO2);
        faceDTO2.setId(2L);
        assertThat(faceDTO1).isNotEqualTo(faceDTO2);
        faceDTO1.setId(null);
        assertThat(faceDTO1).isNotEqualTo(faceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(faceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(faceMapper.fromId(null)).isNull();
    }
}
