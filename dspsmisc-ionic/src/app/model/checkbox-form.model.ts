
export class CheckBoxElem {

    constructor(
        public varName: string,
        public label: string,
        public value?: string) { }
}


export class CheckBoxForm {

    constructor(
        public header: string,
        public elements: CheckBoxElem[]) { };
}