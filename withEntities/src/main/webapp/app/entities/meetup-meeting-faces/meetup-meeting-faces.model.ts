import { BaseEntity } from './../../shared';

export class MeetupMeetingFaces implements BaseEntity {
    constructor(
        public id?: number,
        public meetupName?: string,
        public date?: any,
        public communities?: BaseEntity[],
        public speakers?: BaseEntity[],
        public imageId?: number,
    ) {
    }
}
