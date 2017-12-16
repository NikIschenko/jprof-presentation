package by.issoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import by.issoft.service.CommunityService;
import by.issoft.web.rest.errors.BadRequestAlertException;
import by.issoft.web.rest.util.HeaderUtil;
import by.issoft.service.dto.CommunityDTO;
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
 * REST controller for managing Community.
 */
@RestController
@RequestMapping("/api")
public class CommunityResource {

    private final Logger log = LoggerFactory.getLogger(CommunityResource.class);

    private static final String ENTITY_NAME = "community";

    private final CommunityService communityService;

    public CommunityResource(CommunityService communityService) {
        this.communityService = communityService;
    }

    /**
     * POST  /communities : Create a new community.
     *
     * @param communityDTO the communityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new communityDTO, or with status 400 (Bad Request) if the community has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/communities")
    @Timed
    public ResponseEntity<CommunityDTO> createCommunity(@Valid @RequestBody CommunityDTO communityDTO) throws URISyntaxException {
        log.debug("REST request to save Community : {}", communityDTO);
        if (communityDTO.getId() != null) {
            throw new BadRequestAlertException("A new community cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommunityDTO result = communityService.save(communityDTO);
        return ResponseEntity.created(new URI("/api/communities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /communities : Updates an existing community.
     *
     * @param communityDTO the communityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated communityDTO,
     * or with status 400 (Bad Request) if the communityDTO is not valid,
     * or with status 500 (Internal Server Error) if the communityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/communities")
    @Timed
    public ResponseEntity<CommunityDTO> updateCommunity(@Valid @RequestBody CommunityDTO communityDTO) throws URISyntaxException {
        log.debug("REST request to update Community : {}", communityDTO);
        if (communityDTO.getId() == null) {
            return createCommunity(communityDTO);
        }
        CommunityDTO result = communityService.save(communityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, communityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /communities : get all the communities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of communities in body
     */
    @GetMapping("/communities")
    @Timed
    public List<CommunityDTO> getAllCommunities() {
        log.debug("REST request to get all Communities");
        return communityService.findAll();
        }

    /**
     * GET  /communities/:id : get the "id" community.
     *
     * @param id the id of the communityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the communityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/communities/{id}")
    @Timed
    public ResponseEntity<CommunityDTO> getCommunity(@PathVariable Long id) {
        log.debug("REST request to get Community : {}", id);
        CommunityDTO communityDTO = communityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(communityDTO));
    }

    /**
     * DELETE  /communities/:id : delete the "id" community.
     *
     * @param id the id of the communityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/communities/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        log.debug("REST request to delete Community : {}", id);
        communityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
