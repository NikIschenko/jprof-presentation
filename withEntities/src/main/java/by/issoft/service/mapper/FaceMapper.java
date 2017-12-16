package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.FaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Face and its DTO FaceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FaceMapper extends EntityMapper<FaceDTO, Face> {

    

    @Mapping(target = "images", ignore = true)
    Face toEntity(FaceDTO faceDTO);

    default Face fromId(Long id) {
        if (id == null) {
            return null;
        }
        Face face = new Face();
        face.setId(id);
        return face;
    }
}
