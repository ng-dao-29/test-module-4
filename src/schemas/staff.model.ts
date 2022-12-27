import {Schema, model} from "mongoose";
interface IStaff {
    name: string;
    age: number;
    salary: string;
    branch: string;
}

const staffSchema = new Schema<IStaff>({
    name: String,
    age: Number,
    salary: String,
    branch: String,
})

const StaffModel = model<IStaff>('staff', staffSchema);

export { StaffModel };