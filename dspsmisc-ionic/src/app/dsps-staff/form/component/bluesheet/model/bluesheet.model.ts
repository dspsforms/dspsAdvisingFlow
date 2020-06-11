import { BaseForm } from '../../../../../model/baseform.model';



export class BlueSheetForm extends BaseForm {
    constructor(
        public id: string,
        public studentName: string,
        public collegeId: string,
        public imageUrl: string,
        
        public instructor: string,
        public semester: string,
        public year: number,
        public course: string,
        public section: string,
        public room: string,
        public dayTime: string, // or Date?

        // these two will require a workflow
        // studentAck: boolean,
        // studentAckDate: new FormControl(null, { updateOn: 'blur' }),
        public instructionalMode: BluesheetInstructionalMode,
        public studentEmail: string,
        public examsWithAccommodations: BlueesheetExamsWithAccommodations,
          
        public auxiliaryAids: BlueesheetAuxiliaryAids,
        public adaptiveTech: BlueesheetAdaptiveTech,
        public physicalAccess: BluesheetPhysicalAccess,
        public altMedia: BluesheetAltMedia,
        public general: BluesheetGeneral,
        public completedBy: string,
        public completedByDate: string,
        public dateCreated: Date,
        public lastMod: Date) {
        
        super(id, studentName, collegeId, imageUrl, dateCreated || null, lastMod || null);
    }
}

export class BluesheetGeneral {
    constructor(public envAdjustments: string, public generalNotes: string) {}
}

export class BluesheetAltMedia {

    constructor(
        public braille: boolean,
        // public ebae: boolean,
        // public ueb: boolean,
        // public nemeth: boolean,
        public tactileGraphics: boolean,
        public enlargedPrint: boolean,
        public specifyFont: boolean,
        public etext: boolean,
        public kurzweil: boolean,
        public pdf: boolean,
        public audioRecorded: boolean,
        public learningAlly: boolean,
        public bookShare: boolean,
        public closedCaption: boolean,
        public audioDesc: boolean,
        public other: string ) {}

}

export class BluesheetPhysicalAccess {
    constructor(
        public  accessibleDesk: boolean,
        public accessibleChair: boolean,
        public preferentialSeating: boolean,
        public bypassLines: boolean,
        public breaks: boolean,
        public twoMinPerHr: boolean,
        public fiveMinPerHr: boolean,
        public asNeeded: boolean,
        public changeClassLoc: boolean,
        public other: string) {}
}

export class BlueesheetAdaptiveTech {
    constructor(
        public computer: boolean,
        public calculator: boolean,
        public cctvMagnifier: boolean,
        public assistiveListeningDevice: boolean,
        public digitalRecorder: boolean,
        public liveScribeSmartPen: boolean,
        public ipadAndroidTablet: boolean,
        public other: string) { }
    
}

export class BlueesheetAuxiliaryAids {
    constructor(
        public dspsTutoring: boolean,
        public serviceAnimal: boolean,
        public signLangInterpreting: boolean,
        public realTimeCaptioning: boolean,
        public sharedNotes: boolean,
        public audioRecordLectures: boolean,
        public other: string) { }
}

export class BlueesheetExamsWithAccommodations { 

    constructor (
    // extendedTime, 1.5x, 2x etc should be hierarchical, but taking a shortcut because users are waiting
    public extendedTime: boolean,
    public oneAndHalfX: boolean,
    public twoX: boolean,
    public threeX: boolean,

    // same with breaks. should be hierarchical
    public breaks: boolean,
    public twoMinPerHr: boolean,
    public fiveMinPerHr: boolean,
    public asNeeded: boolean,

    public reader: boolean,
    public scribe: boolean,

    public spellChecker: boolean,

    public basicCalc: boolean,
    public multTable: boolean,

    public adaptedComputer: boolean,

    public reducedDistractionEnv: boolean,

    public remoteProctoring: boolean, // without recorded audio video
    public enlargedPrint: boolean,
    public specifyFont: boolean,

    public magnification: boolean,

    public braille: boolean,
    // public ebae: boolean,
    // public ueb: boolean,
    // public nemeth: boolean,

    public tactileGraphics: boolean,
    public other: string) {}
}

export class BluesheetInstructionalMode {
    constructor(
        public onlineCanvas: boolean,
        public synchronous: boolean,
        public asynchronous: boolean,
        public hybrid: boolean) {}
}
    
