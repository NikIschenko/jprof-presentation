package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.SpeakerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Speaker and its DTO SpeakerDTO.
 */
@Mapper(componentModel = "spring", uses = {MeetupMapper.class})
public interface SpeakerMapper extends EntityMapper<SpeakerDTO, Speaker> {

    

    

    default Speaker fromId(Long id) {
        if (id == null) {
            return null;
        }
        Speaker speaker = new Speaker();
        speaker.setId(id);
        return speaker;
    }
}
