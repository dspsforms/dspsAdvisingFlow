import { BaseForm } from '../../model/baseform.model';



export class AccomplanForm extends BaseForm {

    constructor(
        public id: string,
        public studentName: string,
        public studentId: string,
        public imageUrl: string,
        public dateCreated?: Date,
        public lastMod?: Date
    )
    {
        super(id, studentName, studentId, imageUrl,  dateCreated || null, lastMod || null);
    }
}