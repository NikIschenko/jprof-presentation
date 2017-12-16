package by.issoft.service.impl;

import by.issoft.service.CommunityService;
import by.issoft.domain.Community;
import by.issoft.repository.CommunityRepository;
import by.issoft.service.dto.CommunityDTO;
import by.issoft.service.mapper.CommunityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Community.
 */
@Service
@Transactional
public class CommunityServiceImpl implements CommunityService{

    private final Logger log = LoggerFactory.getLogger(CommunityServiceImpl.class);

    private final CommunityRepository communityRepository;

    private final CommunityMapper communityMapper;

    public CommunityServiceImpl(CommunityRepository communityRepository, CommunityMapper communityMapper) {
        this.communityRepository = communityRepository;
        this.communityMapper = communityMapper;
    }

    /**
     * Save a community.
     *
     * @param communityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CommunityDTO save(CommunityDTO communityDTO) {
        log.debug("Request to save Community : {}", communityDTO);
        Community community = communityMapper.toEntity(communityDTO);
        community = communityRepository.save(community);
        return communityMapper.toDto(community);
    }

    /**
     * Get all the communities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CommunityDTO> findAll() {
        log.debug("Request to get all Communities");
        return communityRepository.findAll().stream()
            .map(communityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one community by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CommunityDTO findOne(Long id) {
        log.debug("Request to get Community : {}", id);
        Community community = communityRepository.findOne(id);
        return communityMapper.toDto(community);
    }

    /**
     * Delete the community by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Community : {}", id);
        communityRepository.delete(id);
    }
}
