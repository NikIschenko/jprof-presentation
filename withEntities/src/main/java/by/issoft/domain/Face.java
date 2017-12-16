package by.issoft.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import by.issoft.domain.enumeration.Gender;

/**
 * A Face.
 */
@Entity
@Table(name = "face")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Face implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "face_id", nullable = false)
    private String faceId;

    @Column(name = "jhi_top")
    private Integer top;

    @Column(name = "jhi_left")
    private Integer left;

    @Column(name = "width")
    private Integer width;

    @Column(name = "height")
    private Integer height;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "age")
    private Double age;

    @ManyToOne
    private Image image;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaceId() {
        return faceId;
    }

    public Face faceId(String faceId) {
        this.faceId = faceId;
        return this;
    }

    public void setFaceId(String faceId) {
        this.faceId = faceId;
    }

    public Integer getTop() {
        return top;
    }

    public Face top(Integer top) {
        this.top = top;
        return this;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

    public Integer getLeft() {
        return left;
    }

    public Face left(Integer left) {
        this.left = left;
        return this;
    }

    public void setLeft(Integer left) {
        this.left = left;
    }

    public Integer getWidth() {
        return width;
    }

    public Face width(Integer width) {
        this.width = width;
        return this;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public Face height(Integer height) {
        this.height = height;
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Gender getGender() {
        return gender;
    }

    public Face gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Double getAge() {
        return age;
    }

    public Face age(Double age) {
        this.age = age;
        return this;
    }

    public void setAge(Double age) {
        this.age = age;
    }

    public Image getImage() {
        return image;
    }

    public Face image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
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
        Face face = (Face) o;
        if (face.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), face.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Face{" +
            "id=" + getId() +
            ", faceId='" + getFaceId() + "'" +
            ", top=" + getTop() +
            ", left=" + getLeft() +
            ", width=" + getWidth() +
            ", height=" + getHeight() +
            ", gender='" + getGender() + "'" +
            ", age=" + getAge() +
            "}";
    }
}
