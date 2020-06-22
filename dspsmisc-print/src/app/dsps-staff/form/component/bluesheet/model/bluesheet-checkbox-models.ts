import { CheckBoxForm } from 'src/app/model/checkbox-form.model';


export class ExamsWithAccommodations {

    public elems: CheckBoxForm;
    constructor(public values: {}, public editable: boolean) {

        this.elems = new CheckBoxForm(
            'EXAMINATIONS WITH ACCOMMODATIONS',
            [

        ]);
        
    }
}