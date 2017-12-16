package by.issoft.service.impl;

import by.issoft.service.MeetupService;
import by.issoft.domain.Meetup;
import by.issoft.repository.MeetupRepository;
import by.issoft.service.dto.MeetupDTO;
import by.issoft.service.mapper.MeetupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Meetup.
 */
@Service
@Transactional
public class MeetupServiceImpl implements MeetupService{

    private final Logger log = LoggerFactory.getLogger(MeetupServiceImpl.class);

    private final MeetupRepository meetupRepository;

    private final MeetupMapper meetupMapper;

    public MeetupServiceImpl(MeetupRepository meetupRepository, MeetupMapper meetupMapper) {
        this.meetupRepository = meetupRepository;
        this.meetupMapper = meetupMapper;
    }

    /**
     * Save a meetup.
     *
     * @param meetupDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MeetupDTO save(MeetupDTO meetupDTO) {
        log.debug("Request to save Meetup : {}", meetupDTO);
        Meetup meetup = meetupMapper.toEntity(meetupDTO);
        meetup = meetupRepository.save(meetup);
        return meetupMapper.toDto(meetup);
    }

    /**
     * Get all the meetups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MeetupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Meetups");
        return meetupRepository.findAll(pageable)
            .map(meetupMapper::toDto);
    }

    /**
     * Get one meetup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MeetupDTO findOne(Long id) {
        log.debug("Request to get Meetup : {}", id);
        Meetup meetup = meetupRepository.findOne(id);
        return meetupMapper.toDto(meetup);
    }

    /**
     * Delete the meetup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Meetup : {}", id);
        meetupRepository.delete(id);
    }
}
