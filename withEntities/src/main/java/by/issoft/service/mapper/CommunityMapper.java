package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.CommunityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Community and its DTO CommunityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CommunityMapper extends EntityMapper<CommunityDTO, Community> {

    

    

    default Community fromId(Long id) {
        if (id == null) {
            return null;
        }
        Community community = new Community();
        community.setId(id);
        return community;
    }
}
