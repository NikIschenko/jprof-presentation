package by.issoft.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Meetup entity.
 */
public class MeetupDTO implements Serializable {

    private Long id;

    @NotNull
    private String meetupName;

    private Instant date;

    private Long communityId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeetupName() {
        return meetupName;
    }

    public void setMeetupName(String meetupName) {
        this.meetupName = meetupName;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MeetupDTO meetupDTO = (MeetupDTO) o;
        if(meetupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meetupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MeetupDTO{" +
            "id=" + getId() +
            ", meetupName='" + getMeetupName() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
