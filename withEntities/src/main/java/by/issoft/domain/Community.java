package by.issoft.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Community.
 */
@Entity
@Table(name = "community")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Community implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "community_name", nullable = false)
    private String communityName;

    @ManyToOne
    private Meetup meetup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommunityName() {
        return communityName;
    }

    public Community communityName(String communityName) {
        this.communityName = communityName;
        return this;
    }

    public void setCommunityName(String communityName) {
        this.communityName = communityName;
    }

    public Meetup getMeetup() {
        return meetup;
    }

    public Community meetup(Meetup meetup) {
        this.meetup = meetup;
        return this;
    }

    public void setMeetup(Meetup meetup) {
        this.meetup = meetup;
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
        Community community = (Community) o;
        if (community.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), community.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Community{" +
            "id=" + getId() +
            ", communityName='" + getCommunityName() + "'" +
            "}";
    }
}