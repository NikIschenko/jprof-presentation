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
 * A Image.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "jhi_date")
    private Instant date;

    @OneToMany(mappedBy = "image")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Meetup> meetups = new HashSet<>();

    @ManyToOne
    private Face face;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Image imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Instant getDate() {
        return date;
    }

    public Image date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<Meetup> getMeetups() {
        return meetups;
    }

    public Image meetups(Set<Meetup> meetups) {
        this.meetups = meetups;
        return this;
    }

    public Image addMeetup(Meetup meetup) {
        this.meetups.add(meetup);
        meetup.setImage(this);
        return this;
    }

    public Image removeMeetup(Meetup meetup) {
        this.meetups.remove(meetup);
        meetup.setImage(null);
        return this;
    }

    public void setMeetups(Set<Meetup> meetups) {
        this.meetups = meetups;
    }

    public Face getFace() {
        return face;
    }

    public Image face(Face face) {
        this.face = face;
        return this;
    }

    public void setFace(Face face) {
        this.face = face;
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
        Image image = (Image) o;
        if (image.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), image.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", imageUrl='" + getImageUrl() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
