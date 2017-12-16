import { BaseEntity } from './../../shared';

export class ImageMeetingFaces implements BaseEntity {
    constructor(
        public id?: number,
        public imageUrl?: string,
        public date?: any,
        public meetups?: BaseEntity[],
        public faceId?: number,
    ) {
    }
}
