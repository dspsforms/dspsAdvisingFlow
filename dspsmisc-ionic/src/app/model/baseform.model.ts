export class BaseForm {

    constructor(
        public id: string,
        public studentName: string,
        public studentId: string,
        public imageUrl?: string,
        public dateCreated?: Date,
        public lastMod?: Date
    ) {}
    
}