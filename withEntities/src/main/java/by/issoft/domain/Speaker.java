package by.issoft.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Speaker.
 */
@Entity
@Table(name = "speaker")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Speaker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "speaker_name", nullable = false)
    private String speakerName;

    @Column(name = "email")
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "speaker_meetup",
               joinColumns = @JoinColumn(name="speakers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="meetups_id", referencedColumnName="id"))
    private Set<Meetup> meetups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpeakerName() {
        return speakerName;
    }

    public Speaker speakerName(String speakerName) {
        this.speakerName = speakerName;
        return this;
    }

    public void setSpeakerName(String speakerName) {
        this.speakerName = speakerName;
    }

    public String getEmail() {
        return email;
    }

    public Speaker email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Meetup> getMeetups() {
        return meetups;
    }

    public Speaker meetups(Set<Meetup> meetups) {
        this.meetups = meetups;
        return this;
    }

    public Speaker addMeetup(Meetup meetup) {
        this.meetups.add(meetup);
        meetup.getSpeakers().add(this);
        return this;
    }

    public Speaker removeMeetup(Meetup meetup) {
        this.meetups.remove(meetup);
        meetup.getSpeakers().remove(this);
        return this;
    }

    public void setMeetups(Set<Meetup> meetups) {
        this.meetups = meetups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Speaker speaker = (Speaker) o;
        if (speaker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), speaker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Speaker{" +
            "id=" + getId() +
            ", speakerName='" + getSpeakerName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
