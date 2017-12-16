import { BaseEntity } from './../../shared';

export class CommunityMeetingFaces implements BaseEntity {
    constructor(
        public id?: number,
        public communityName?: string,
    ) {
    }
}
