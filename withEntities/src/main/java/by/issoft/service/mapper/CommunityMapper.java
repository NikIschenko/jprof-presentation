package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.CommunityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Community and its DTO CommunityDTO.
 */
@Mapper(componentModel = "spring", uses = {MeetupMapper.class})
public interface CommunityMapper extends EntityMapper<CommunityDTO, Community> {

    @Mapping(source = "meetup.id", target = "meetupId")
    CommunityDTO toDto(Community community); 

    @Mapping(source = "meetupId", target = "meetup")
    Community toEntity(CommunityDTO communityDTO);

    default Community fromId(Long id) {
        if (id == null) {
            return null;
        }
        Community community = new Community();
        community.setId(id);
        return community;
    }
}
