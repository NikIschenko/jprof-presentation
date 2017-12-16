package by.issoft.service;

import by.issoft.service.dto.MeetupDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Meetup.
 */
public interface MeetupService {

    /**
     * Save a meetup.
     *
     * @param meetupDTO the entity to save
     * @return the persisted entity
     */
    MeetupDTO save(MeetupDTO meetupDTO);

    /**
     * Get all the meetups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MeetupDTO> findAll(Pageable pageable);

    /**
     * Get the "id" meetup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MeetupDTO findOne(Long id);

    /**
     * Delete the "id" meetup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
