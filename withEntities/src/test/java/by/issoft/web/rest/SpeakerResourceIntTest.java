package by.issoft.web.rest;

import by.issoft.WithEntitiesApp;

import by.issoft.domain.Speaker;
import by.issoft.repository.SpeakerRepository;
import by.issoft.service.SpeakerService;
import by.issoft.service.dto.SpeakerDTO;
import by.issoft.service.mapper.SpeakerMapper;
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

/**
 * Test class for the SpeakerResource REST controller.
 *
 * @see SpeakerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WithEntitiesApp.class)
public class SpeakerResourceIntTest {

    private static final String DEFAULT_SPEAKER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SPEAKER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private SpeakerRepository speakerRepository;

    @Autowired
    private SpeakerMapper speakerMapper;

    @Autowired
    private SpeakerService speakerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSpeakerMockMvc;

    private Speaker speaker;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpeakerResource speakerResource = new SpeakerResource(speakerService);
        this.restSpeakerMockMvc = MockMvcBuilders.standaloneSetup(speakerResource)
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
    public static Speaker createEntity(EntityManager em) {
        Speaker speaker = new Speaker()
            .speakerName(DEFAULT_SPEAKER_NAME)
            .email(DEFAULT_EMAIL);
        return speaker;
    }

    @Before
    public void initTest() {
        speaker = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpeaker() throws Exception {
        int databaseSizeBeforeCreate = speakerRepository.findAll().size();

        // Create the Speaker
        SpeakerDTO speakerDTO = speakerMapper.toDto(speaker);
        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speakerDTO)))
            .andExpect(status().isCreated());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeCreate + 1);
        Speaker testSpeaker = speakerList.get(speakerList.size() - 1);
        assertThat(testSpeaker.getSpeakerName()).isEqualTo(DEFAULT_SPEAKER_NAME);
        assertThat(testSpeaker.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createSpeakerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = speakerRepository.findAll().size();

        // Create the Speaker with an existing ID
        speaker.setId(1L);
        SpeakerDTO speakerDTO = speakerMapper.toDto(speaker);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speakerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSpeakerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setSpeakerName(null);

        // Create the Speaker, which fails.
        SpeakerDTO speakerDTO = speakerMapper.toDto(speaker);

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speakerDTO)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpeakers() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);

        // Get all the speakerList
        restSpeakerMockMvc.perform(get("/api/speakers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(speaker.getId().intValue())))
            .andExpect(jsonPath("$.[*].speakerName").value(hasItem(DEFAULT_SPEAKER_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);

        // Get the speaker
        restSpeakerMockMvc.perform(get("/api/speakers/{id}", speaker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(speaker.getId().intValue()))
            .andExpect(jsonPath("$.speakerName").value(DEFAULT_SPEAKER_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpeaker() throws Exception {
        // Get the speaker
        restSpeakerMockMvc.perform(get("/api/speakers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);
        int databaseSizeBeforeUpdate = speakerRepository.findAll().size();

        // Update the speaker
        Speaker updatedSpeaker = speakerRepository.findOne(speaker.getId());
        // Disconnect from session so that the updates on updatedSpeaker are not directly saved in db
        em.detach(updatedSpeaker);
        updatedSpeaker
            .speakerName(UPDATED_SPEAKER_NAME)
            .email(UPDATED_EMAIL);
        SpeakerDTO speakerDTO = speakerMapper.toDto(updatedSpeaker);

        restSpeakerMockMvc.perform(put("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speakerDTO)))
            .andExpect(status().isOk());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeUpdate);
        Speaker testSpeaker = speakerList.get(speakerList.size() - 1);
        assertThat(testSpeaker.getSpeakerName()).isEqualTo(UPDATED_SPEAKER_NAME);
        assertThat(testSpeaker.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingSpeaker() throws Exception {
        int databaseSizeBeforeUpdate = speakerRepository.findAll().size();

        // Create the Speaker
        SpeakerDTO speakerDTO = speakerMapper.toDto(speaker);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSpeakerMockMvc.perform(put("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speakerDTO)))
            .andExpect(status().isCreated());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);
        int databaseSizeBeforeDelete = speakerRepository.findAll().size();

        // Get the speaker
        restSpeakerMockMvc.perform(delete("/api/speakers/{id}", speaker.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Speaker.class);
        Speaker speaker1 = new Speaker();
        speaker1.setId(1L);
        Speaker speaker2 = new Speaker();
        speaker2.setId(speaker1.getId());
        assertThat(speaker1).isEqualTo(speaker2);
        speaker2.setId(2L);
        assertThat(speaker1).isNotEqualTo(speaker2);
        speaker1.setId(null);
        assertThat(speaker1).isNotEqualTo(speaker2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpeakerDTO.class);
        SpeakerDTO speakerDTO1 = new SpeakerDTO();
        speakerDTO1.setId(1L);
        SpeakerDTO speakerDTO2 = new SpeakerDTO();
        assertThat(speakerDTO1).isNotEqualTo(speakerDTO2);
        speakerDTO2.setId(speakerDTO1.getId());
        assertThat(speakerDTO1).isEqualTo(speakerDTO2);
        speakerDTO2.setId(2L);
        assertThat(speakerDTO1).isNotEqualTo(speakerDTO2);
        speakerDTO1.setId(null);
        assertThat(speakerDTO1).isNotEqualTo(speakerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(speakerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(speakerMapper.fromId(null)).isNull();
    }
}
