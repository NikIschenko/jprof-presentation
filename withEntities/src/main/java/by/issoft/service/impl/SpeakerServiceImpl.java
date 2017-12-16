package by.issoft.service.impl;

import by.issoft.service.SpeakerService;
import by.issoft.domain.Speaker;
import by.issoft.repository.SpeakerRepository;
import by.issoft.service.dto.SpeakerDTO;
import by.issoft.service.mapper.SpeakerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Speaker.
 */
@Service
@Transactional
public class SpeakerServiceImpl implements SpeakerService{

    private final Logger log = LoggerFactory.getLogger(SpeakerServiceImpl.class);

    private final SpeakerRepository speakerRepository;

    private final SpeakerMapper speakerMapper;

    public SpeakerServiceImpl(SpeakerRepository speakerRepository, SpeakerMapper speakerMapper) {
        this.speakerRepository = speakerRepository;
        this.speakerMapper = speakerMapper;
    }

    /**
     * Save a speaker.
     *
     * @param speakerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SpeakerDTO save(SpeakerDTO speakerDTO) {
        log.debug("Request to save Speaker : {}", speakerDTO);
        Speaker speaker = speakerMapper.toEntity(speakerDTO);
        speaker = speakerRepository.save(speaker);
        return speakerMapper.toDto(speaker);
    }

    /**
     * Get all the speakers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SpeakerDTO> findAll() {
        log.debug("Request to get all Speakers");
        return speakerRepository.findAllWithEagerRelationships().stream()
            .map(speakerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one speaker by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SpeakerDTO findOne(Long id) {
        log.debug("Request to get Speaker : {}", id);
        Speaker speaker = speakerRepository.findOneWithEagerRelationships(id);
        return speakerMapper.toDto(speaker);
    }

    /**
     * Delete the speaker by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Speaker : {}", id);
        speakerRepository.delete(id);
    }
}
