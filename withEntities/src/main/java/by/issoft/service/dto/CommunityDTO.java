package by.issoft.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Community entity.
 */
public class CommunityDTO implements Serializable {

    private Long id;

    @NotNull
    private String communityName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommunityName() {
        return communityName;
    }

    public void setCommunityName(String communityName) {
        this.communityName = communityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommunityDTO communityDTO = (CommunityDTO) o;
        if(communityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), communityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommunityDTO{" +
            "id=" + getId() +
            ", communityName='" + getCommunityName() + "'" +
            "}";
    }
}
