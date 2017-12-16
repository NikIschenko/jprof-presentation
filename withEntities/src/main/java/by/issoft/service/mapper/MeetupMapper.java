package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.MeetupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Meetup and its DTO MeetupDTO.
 */
@Mapper(componentModel = "spring", uses = {ImageMapper.class})
public interface MeetupMapper extends EntityMapper<MeetupDTO, Meetup> {

    @Mapping(source = "image.id", target = "imageId")
    MeetupDTO toDto(Meetup meetup); 

    @Mapping(target = "communities", ignore = true)
    @Mapping(target = "speakers", ignore = true)
    @Mapping(source = "imageId", target = "image")
    Meetup toEntity(MeetupDTO meetupDTO);

    default Meetup fromId(Long id) {
        if (id == null) {
            return null;
        }
        Meetup meetup = new Meetup();
        meetup.setId(id);
        return meetup;
    }
}
