package by.issoft.service;

import by.issoft.service.dto.CommunityDTO;
import java.util.List;

/**
 * Service Interface for managing Community.
 */
public interface CommunityService {

    /**
     * Save a community.
     *
     * @param communityDTO the entity to save
     * @return the persisted entity
     */
    CommunityDTO save(CommunityDTO communityDTO);

    /**
     * Get all the communities.
     *
     * @return the list of entities
     */
    List<CommunityDTO> findAll();

    /**
     * Get the "id" community.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CommunityDTO findOne(Long id);

    /**
     * Delete the "id" community.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
