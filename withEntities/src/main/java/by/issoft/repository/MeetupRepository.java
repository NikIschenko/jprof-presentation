package by.issoft.repository;

import by.issoft.domain.Meetup;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Meetup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeetupRepository extends JpaRepository<Meetup, Long> {

}
