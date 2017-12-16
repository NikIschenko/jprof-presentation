package by.issoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import by.issoft.service.MeetupService;
import by.issoft.web.rest.errors.BadRequestAlertException;
import by.issoft.web.rest.util.HeaderUtil;
import by.issoft.web.rest.util.PaginationUtil;
import by.issoft.service.dto.MeetupDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Meetup.
 */
@RestController
@RequestMapping("/api")
public class MeetupResource {

    private final Logger log = LoggerFactory.getLogger(MeetupResource.class);

    private static final String ENTITY_NAME = "meetup";

    private final MeetupService meetupService;

    public MeetupResource(MeetupService meetupService) {
        this.meetupService = meetupService;
    }

    /**
     * POST  /meetups : Create a new meetup.
     *
     * @param meetupDTO the meetupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meetupDTO, or with status 400 (Bad Request) if the meetup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meetups")
    @Timed
    public ResponseEntity<MeetupDTO> createMeetup(@Valid @RequestBody MeetupDTO meetupDTO) throws URISyntaxException {
        log.debug("REST request to save Meetup : {}", meetupDTO);
        if (meetupDTO.getId() != null) {
            throw new BadRequestAlertException("A new meetup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeetupDTO result = meetupService.save(meetupDTO);
        return ResponseEntity.created(new URI("/api/meetups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meetups : Updates an existing meetup.
     *
     * @param meetupDTO the meetupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meetupDTO,
     * or with status 400 (Bad Request) if the meetupDTO is not valid,
     * or with status 500 (Internal Server Error) if the meetupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meetups")
    @Timed
    public ResponseEntity<MeetupDTO> updateMeetup(@Valid @RequestBody MeetupDTO meetupDTO) throws URISyntaxException {
        log.debug("REST request to update Meetup : {}", meetupDTO);
        if (meetupDTO.getId() == null) {
            return createMeetup(meetupDTO);
        }
        MeetupDTO result = meetupService.save(meetupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meetupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meetups : get all the meetups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of meetups in body
     */
    @GetMapping("/meetups")
    @Timed
    public ResponseEntity<List<MeetupDTO>> getAllMeetups(Pageable pageable) {
        log.debug("REST request to get a page of Meetups");
        Page<MeetupDTO> page = meetupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/meetups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /meetups/:id : get the "id" meetup.
     *
     * @param id the id of the meetupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meetupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/meetups/{id}")
    @Timed
    public ResponseEntity<MeetupDTO> getMeetup(@PathVariable Long id) {
        log.debug("REST request to get Meetup : {}", id);
        MeetupDTO meetupDTO = meetupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(meetupDTO));
    }

    /**
     * DELETE  /meetups/:id : delete the "id" meetup.
     *
     * @param id the id of the meetupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meetups/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeetup(@PathVariable Long id) {
        log.debug("REST request to delete Meetup : {}", id);
        meetupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
