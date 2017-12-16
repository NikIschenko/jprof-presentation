package by.issoft.web.rest;

import by.issoft.WithEntitiesApp;

import by.issoft.domain.Meetup;
import by.issoft.repository.MeetupRepository;
import by.issoft.service.MeetupService;
import by.issoft.service.dto.MeetupDTO;
import by.issoft.service.mapper.MeetupMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static by.issoft.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MeetupResource REST controller.
 *
 * @see MeetupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WithEntitiesApp.class)
public class MeetupResourceIntTest {

    private static final String DEFAULT_MEETUP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MEETUP_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MeetupRepository meetupRepository;

    @Autowired
    private MeetupMapper meetupMapper;

    @Autowired
    private MeetupService meetupService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMeetupMockMvc;

    private Meetup meetup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeetupResource meetupResource = new MeetupResource(meetupService);
        this.restMeetupMockMvc = MockMvcBuilders.standaloneSetup(meetupResource)
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
    public static Meetup createEntity(EntityManager em) {
        Meetup meetup = new Meetup()
            .meetupName(DEFAULT_MEETUP_NAME)
            .date(DEFAULT_DATE);
        return meetup;
    }

    @Before
    public void initTest() {
        meetup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeetup() throws Exception {
        int databaseSizeBeforeCreate = meetupRepository.findAll().size();

        // Create the Meetup
        MeetupDTO meetupDTO = meetupMapper.toDto(meetup);
        restMeetupMockMvc.perform(post("/api/meetups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetupDTO)))
            .andExpect(status().isCreated());

        // Validate the Meetup in the database
        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeCreate + 1);
        Meetup testMeetup = meetupList.get(meetupList.size() - 1);
        assertThat(testMeetup.getMeetupName()).isEqualTo(DEFAULT_MEETUP_NAME);
        assertThat(testMeetup.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createMeetupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meetupRepository.findAll().size();

        // Create the Meetup with an existing ID
        meetup.setId(1L);
        MeetupDTO meetupDTO = meetupMapper.toDto(meetup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeetupMockMvc.perform(post("/api/meetups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Meetup in the database
        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMeetupNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetupRepository.findAll().size();
        // set the field null
        meetup.setMeetupName(null);

        // Create the Meetup, which fails.
        MeetupDTO meetupDTO = meetupMapper.toDto(meetup);

        restMeetupMockMvc.perform(post("/api/meetups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetupDTO)))
            .andExpect(status().isBadRequest());

        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeetups() throws Exception {
        // Initialize the database
        meetupRepository.saveAndFlush(meetup);

        // Get all the meetupList
        restMeetupMockMvc.perform(get("/api/meetups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meetup.getId().intValue())))
            .andExpect(jsonPath("$.[*].meetupName").value(hasItem(DEFAULT_MEETUP_NAME.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getMeetup() throws Exception {
        // Initialize the database
        meetupRepository.saveAndFlush(meetup);

        // Get the meetup
        restMeetupMockMvc.perform(get("/api/meetups/{id}", meetup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meetup.getId().intValue()))
            .andExpect(jsonPath("$.meetupName").value(DEFAULT_MEETUP_NAME.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMeetup() throws Exception {
        // Get the meetup
        restMeetupMockMvc.perform(get("/api/meetups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeetup() throws Exception {
        // Initialize the database
        meetupRepository.saveAndFlush(meetup);
        int databaseSizeBeforeUpdate = meetupRepository.findAll().size();

        // Update the meetup
        Meetup updatedMeetup = meetupRepository.findOne(meetup.getId());
        // Disconnect from session so that the updates on updatedMeetup are not directly saved in db
        em.detach(updatedMeetup);
        updatedMeetup
            .meetupName(UPDATED_MEETUP_NAME)
            .date(UPDATED_DATE);
        MeetupDTO meetupDTO = meetupMapper.toDto(updatedMeetup);

        restMeetupMockMvc.perform(put("/api/meetups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetupDTO)))
            .andExpect(status().isOk());

        // Validate the Meetup in the database
        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeUpdate);
        Meetup testMeetup = meetupList.get(meetupList.size() - 1);
        assertThat(testMeetup.getMeetupName()).isEqualTo(UPDATED_MEETUP_NAME);
        assertThat(testMeetup.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMeetup() throws Exception {
        int databaseSizeBeforeUpdate = meetupRepository.findAll().size();

        // Create the Meetup
        MeetupDTO meetupDTO = meetupMapper.toDto(meetup);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMeetupMockMvc.perform(put("/api/meetups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetupDTO)))
            .andExpect(status().isCreated());

        // Validate the Meetup in the database
        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMeetup() throws Exception {
        // Initialize the database
        meetupRepository.saveAndFlush(meetup);
        int databaseSizeBeforeDelete = meetupRepository.findAll().size();

        // Get the meetup
        restMeetupMockMvc.perform(delete("/api/meetups/{id}", meetup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Meetup> meetupList = meetupRepository.findAll();
        assertThat(meetupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meetup.class);
        Meetup meetup1 = new Meetup();
        meetup1.setId(1L);
        Meetup meetup2 = new Meetup();
        meetup2.setId(meetup1.getId());
        assertThat(meetup1).isEqualTo(meetup2);
        meetup2.setId(2L);
        assertThat(meetup1).isNotEqualTo(meetup2);
        meetup1.setId(null);
        assertThat(meetup1).isNotEqualTo(meetup2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeetupDTO.class);
        MeetupDTO meetupDTO1 = new MeetupDTO();
        meetupDTO1.setId(1L);
        MeetupDTO meetupDTO2 = new MeetupDTO();
        assertThat(meetupDTO1).isNotEqualTo(meetupDTO2);
        meetupDTO2.setId(meetupDTO1.getId());
        assertThat(meetupDTO1).isEqualTo(meetupDTO2);
        meetupDTO2.setId(2L);
        assertThat(meetupDTO1).isNotEqualTo(meetupDTO2);
        meetupDTO1.setId(null);
        assertThat(meetupDTO1).isNotEqualTo(meetupDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(meetupMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(meetupMapper.fromId(null)).isNull();
    }
}
