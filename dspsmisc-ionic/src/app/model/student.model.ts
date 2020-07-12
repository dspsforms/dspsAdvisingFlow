export class Student {

    // _id: stu._id,
    //     email: stu.email,
    //     name: stu.name,
    //     collegeId: stu.collegeId,
    //     cellPhone: stu.cellPhone,
    //     status: stu.status,
    //     lastMod: stu.lastMod || null

    public _id: string;
    public email: string;
    public name: string;
    public collegeId: string;
    public cellPhone: string;
    public status: string;
    public lastMod: Date;

    constuctor(options: {
        _id: string,
        email: string,
        name: string,
        collegeId: string,
        cellPhone: string,
        status: string,
        lastMod: Date
    })
    { 
        this._id = options._id;
        this.email = options.email;
        this.name = options.name;
        this.collegeId = options.collegeId;
        this.cellPhone = options.cellPhone;
        this.status = options.status;
        this.lastMod = options.lastMod;
    }
}