package by.issoft.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Speaker entity.
 */
public class SpeakerDTO implements Serializable {

    private Long id;

    @NotNull
    private String speakerName;

    private String email;

    private Set<MeetupDTO> meetups = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpeakerName() {
        return speakerName;
    }

    public void setSpeakerName(String speakerName) {
        this.speakerName = speakerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<MeetupDTO> getMeetups() {
        return meetups;
    }

    public void setMeetups(Set<MeetupDTO> meetups) {
        this.meetups = meetups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SpeakerDTO speakerDTO = (SpeakerDTO) o;
        if(speakerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), speakerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SpeakerDTO{" +
            "id=" + getId() +
            ", speakerName='" + getSpeakerName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
