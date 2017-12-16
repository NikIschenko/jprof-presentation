package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.MeetupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Meetup and its DTO MeetupDTO.
 */
@Mapper(componentModel = "spring", uses = {CommunityMapper.class})
public interface MeetupMapper extends EntityMapper<MeetupDTO, Meetup> {

    @Mapping(source = "community.id", target = "communityId")
    MeetupDTO toDto(Meetup meetup); 

    @Mapping(source = "communityId", target = "community")
    @Mapping(target = "speakers", ignore = true)
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
