package by.issoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Meetup.
 */
@Entity
@Table(name = "meetup")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Meetup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "meetup_name", nullable = false)
    private String meetupName;

    @Column(name = "jhi_date")
    private Instant date;

    @ManyToOne
    private Community community;

    @ManyToMany(mappedBy = "meetups")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Speaker> speakers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeetupName() {
        return meetupName;
    }

    public Meetup meetupName(String meetupName) {
        this.meetupName = meetupName;
        return this;
    }

    public void setMeetupName(String meetupName) {
        this.meetupName = meetupName;
    }

    public Instant getDate() {
        return date;
    }

    public Meetup date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Community getCommunity() {
        return community;
    }

    public Meetup community(Community community) {
        this.community = community;
        return this;
    }

    public void setCommunity(Community community) {
        this.community = community;
    }

    public Set<Speaker> getSpeakers() {
        return speakers;
    }

    public Meetup speakers(Set<Speaker> speakers) {
        this.speakers = speakers;
        return this;
    }

    public Meetup addSpeaker(Speaker speaker) {
        this.speakers.add(speaker);
        speaker.getMeetups().add(this);
        return this;
    }

    public Meetup removeSpeaker(Speaker speaker) {
        this.speakers.remove(speaker);
        speaker.getMeetups().remove(this);
        return this;
    }

    public void setSpeakers(Set<Speaker> speakers) {
        this.speakers = speakers;
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
        Meetup meetup = (Meetup) o;
        if (meetup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meetup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Meetup{" +
            "id=" + getId() +
            ", meetupName='" + getMeetupName() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
