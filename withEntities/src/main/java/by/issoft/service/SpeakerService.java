package by.issoft.service;

import by.issoft.service.dto.SpeakerDTO;
import java.util.List;

/**
 * Service Interface for managing Speaker.
 */
public interface SpeakerService {

    /**
     * Save a speaker.
     *
     * @param speakerDTO the entity to save
     * @return the persisted entity
     */
    SpeakerDTO save(SpeakerDTO speakerDTO);

    /**
     * Get all the speakers.
     *
     * @return the list of entities
     */
    List<SpeakerDTO> findAll();

    /**
     * Get the "id" speaker.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SpeakerDTO findOne(Long id);

    /**
     * Delete the "id" speaker.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
