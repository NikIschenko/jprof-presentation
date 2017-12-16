import { BaseEntity } from './../../shared';

export class SpeakerMeetingFaces implements BaseEntity {
    constructor(
        public id?: number,
        public speakerName?: string,
        public email?: string,
        public meetups?: BaseEntity[],
    ) {
    }
}
