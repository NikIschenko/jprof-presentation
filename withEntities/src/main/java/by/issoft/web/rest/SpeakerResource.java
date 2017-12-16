package by.issoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import by.issoft.service.SpeakerService;
import by.issoft.web.rest.errors.BadRequestAlertException;
import by.issoft.web.rest.util.HeaderUtil;
import by.issoft.service.dto.SpeakerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Speaker.
 */
@RestController
@RequestMapping("/api")
public class SpeakerResource {

    private final Logger log = LoggerFactory.getLogger(SpeakerResource.class);

    private static final String ENTITY_NAME = "speaker";

    private final SpeakerService speakerService;

    public SpeakerResource(SpeakerService speakerService) {
        this.speakerService = speakerService;
    }

    /**
     * POST  /speakers : Create a new speaker.
     *
     * @param speakerDTO the speakerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new speakerDTO, or with status 400 (Bad Request) if the speaker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/speakers")
    @Timed
    public ResponseEntity<SpeakerDTO> createSpeaker(@Valid @RequestBody SpeakerDTO speakerDTO) throws URISyntaxException {
        log.debug("REST request to save Speaker : {}", speakerDTO);
        if (speakerDTO.getId() != null) {
            throw new BadRequestAlertException("A new speaker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpeakerDTO result = speakerService.save(speakerDTO);
        return ResponseEntity.created(new URI("/api/speakers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /speakers : Updates an existing speaker.
     *
     * @param speakerDTO the speakerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated speakerDTO,
     * or with status 400 (Bad Request) if the speakerDTO is not valid,
     * or with status 500 (Internal Server Error) if the speakerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/speakers")
    @Timed
    public ResponseEntity<SpeakerDTO> updateSpeaker(@Valid @RequestBody SpeakerDTO speakerDTO) throws URISyntaxException {
        log.debug("REST request to update Speaker : {}", speakerDTO);
        if (speakerDTO.getId() == null) {
            return createSpeaker(speakerDTO);
        }
        SpeakerDTO result = speakerService.save(speakerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, speakerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /speakers : get all the speakers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of speakers in body
     */
    @GetMapping("/speakers")
    @Timed
    public List<SpeakerDTO> getAllSpeakers() {
        log.debug("REST request to get all Speakers");
        return speakerService.findAll();
        }

    /**
     * GET  /speakers/:id : get the "id" speaker.
     *
     * @param id the id of the speakerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the speakerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/speakers/{id}")
    @Timed
    public ResponseEntity<SpeakerDTO> getSpeaker(@PathVariable Long id) {
        log.debug("REST request to get Speaker : {}", id);
        SpeakerDTO speakerDTO = speakerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(speakerDTO));
    }

    /**
     * DELETE  /speakers/:id : delete the "id" speaker.
     *
     * @param id the id of the speakerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/speakers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpeaker(@PathVariable Long id) {
        log.debug("REST request to delete Speaker : {}", id);
        speakerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
