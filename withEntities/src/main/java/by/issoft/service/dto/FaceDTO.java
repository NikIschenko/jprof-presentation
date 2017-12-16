package by.issoft.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import by.issoft.domain.enumeration.Gender;

/**
 * A DTO for the Face entity.
 */
public class FaceDTO implements Serializable {

    private Long id;

    @NotNull
    private String faceId;

    private Integer top;

    private Integer left;

    private Integer width;

    private Integer height;

    private Gender gender;

    private Double age;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaceId() {
        return faceId;
    }

    public void setFaceId(String faceId) {
        this.faceId = faceId;
    }

    public Integer getTop() {
        return top;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

    public Integer getLeft() {
        return left;
    }

    public void setLeft(Integer left) {
        this.left = left;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Double getAge() {
        return age;
    }

    public void setAge(Double age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FaceDTO faceDTO = (FaceDTO) o;
        if(faceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), faceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FaceDTO{" +
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
