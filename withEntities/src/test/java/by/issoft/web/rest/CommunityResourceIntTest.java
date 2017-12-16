package by.issoft.web.rest;

import by.issoft.WithEntitiesApp;

import by.issoft.domain.Community;
import by.issoft.repository.CommunityRepository;
import by.issoft.service.CommunityService;
import by.issoft.service.dto.CommunityDTO;
import by.issoft.service.mapper.CommunityMapper;
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
 * Test class for the CommunityResource REST controller.
 *
 * @see CommunityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WithEntitiesApp.class)
public class CommunityResourceIntTest {

    private static final String DEFAULT_COMMUNITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMMUNITY_NAME = "BBBBBBBBBB";

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private CommunityMapper communityMapper;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCommunityMockMvc;

    private Community community;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommunityResource communityResource = new CommunityResource(communityService);
        this.restCommunityMockMvc = MockMvcBuilders.standaloneSetup(communityResource)
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
    public static Community createEntity(EntityManager em) {
        Community community = new Community()
            .communityName(DEFAULT_COMMUNITY_NAME);
        return community;
    }

    @Before
    public void initTest() {
        community = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommunity() throws Exception {
        int databaseSizeBeforeCreate = communityRepository.findAll().size();

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);
        restCommunityMockMvc.perform(post("/api/communities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communityDTO)))
            .andExpect(status().isCreated());

        // Validate the Community in the database
        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeCreate + 1);
        Community testCommunity = communityList.get(communityList.size() - 1);
        assertThat(testCommunity.getCommunityName()).isEqualTo(DEFAULT_COMMUNITY_NAME);
    }

    @Test
    @Transactional
    public void createCommunityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = communityRepository.findAll().size();

        // Create the Community with an existing ID
        community.setId(1L);
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityMockMvc.perform(post("/api/communities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCommunityNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = communityRepository.findAll().size();
        // set the field null
        community.setCommunityName(null);

        // Create the Community, which fails.
        CommunityDTO communityDTO = communityMapper.toDto(community);

        restCommunityMockMvc.perform(post("/api/communities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communityDTO)))
            .andExpect(status().isBadRequest());

        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommunities() throws Exception {
        // Initialize the database
        communityRepository.saveAndFlush(community);

        // Get all the communityList
        restCommunityMockMvc.perform(get("/api/communities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(community.getId().intValue())))
            .andExpect(jsonPath("$.[*].communityName").value(hasItem(DEFAULT_COMMUNITY_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCommunity() throws Exception {
        // Initialize the database
        communityRepository.saveAndFlush(community);

        // Get the community
        restCommunityMockMvc.perform(get("/api/communities/{id}", community.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(community.getId().intValue()))
            .andExpect(jsonPath("$.communityName").value(DEFAULT_COMMUNITY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommunity() throws Exception {
        // Get the community
        restCommunityMockMvc.perform(get("/api/communities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommunity() throws Exception {
        // Initialize the database
        communityRepository.saveAndFlush(community);
        int databaseSizeBeforeUpdate = communityRepository.findAll().size();

        // Update the community
        Community updatedCommunity = communityRepository.findOne(community.getId());
        // Disconnect from session so that the updates on updatedCommunity are not directly saved in db
        em.detach(updatedCommunity);
        updatedCommunity
            .communityName(UPDATED_COMMUNITY_NAME);
        CommunityDTO communityDTO = communityMapper.toDto(updatedCommunity);

        restCommunityMockMvc.perform(put("/api/communities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communityDTO)))
            .andExpect(status().isOk());

        // Validate the Community in the database
        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeUpdate);
        Community testCommunity = communityList.get(communityList.size() - 1);
        assertThat(testCommunity.getCommunityName()).isEqualTo(UPDATED_COMMUNITY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCommunity() throws Exception {
        int databaseSizeBeforeUpdate = communityRepository.findAll().size();

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCommunityMockMvc.perform(put("/api/communities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communityDTO)))
            .andExpect(status().isCreated());

        // Validate the Community in the database
        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCommunity() throws Exception {
        // Initialize the database
        communityRepository.saveAndFlush(community);
        int databaseSizeBeforeDelete = communityRepository.findAll().size();

        // Get the community
        restCommunityMockMvc.perform(delete("/api/communities/{id}", community.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Community> communityList = communityRepository.findAll();
        assertThat(communityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Community.class);
        Community community1 = new Community();
        community1.setId(1L);
        Community community2 = new Community();
        community2.setId(community1.getId());
        assertThat(community1).isEqualTo(community2);
        community2.setId(2L);
        assertThat(community1).isNotEqualTo(community2);
        community1.setId(null);
        assertThat(community1).isNotEqualTo(community2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityDTO.class);
        CommunityDTO communityDTO1 = new CommunityDTO();
        communityDTO1.setId(1L);
        CommunityDTO communityDTO2 = new CommunityDTO();
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
        communityDTO2.setId(communityDTO1.getId());
        assertThat(communityDTO1).isEqualTo(communityDTO2);
        communityDTO2.setId(2L);
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
        communityDTO1.setId(null);
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(communityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(communityMapper.fromId(null)).isNull();
    }
}
