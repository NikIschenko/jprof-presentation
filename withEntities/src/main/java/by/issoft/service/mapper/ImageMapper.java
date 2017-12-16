package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.ImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Image and its DTO ImageDTO.
 */
@Mapper(componentModel = "spring", uses = {FaceMapper.class})
public interface ImageMapper extends EntityMapper<ImageDTO, Image> {

    @Mapping(source = "face.id", target = "faceId")
    ImageDTO toDto(Image image); 

    @Mapping(target = "meetups", ignore = true)
    @Mapping(source = "faceId", target = "face")
    Image toEntity(ImageDTO imageDTO);

    default Image fromId(Long id) {
        if (id == null) {
            return null;
        }
        Image image = new Image();
        image.setId(id);
        return image;
    }
}
