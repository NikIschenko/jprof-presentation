import { BaseEntity } from './../../shared';

export const enum Gender {
    'MALE',
    'FEMALE'
}

export class FaceMeetingFaces implements BaseEntity {
    constructor(
        public id?: number,
        public faceId?: string,
        public top?: number,
        public left?: number,
        public width?: number,
        public height?: number,
        public gender?: Gender,
        public age?: number,
        public imageId?: number,
    ) {
    }
}
