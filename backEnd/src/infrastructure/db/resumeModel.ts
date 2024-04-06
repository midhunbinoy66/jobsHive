import mongoose, { Model} from "mongoose";
import { IResume } from "../../entities/resume";
import { userEducationSchema } from "./subschema/educationSchema";
import { userWorkExperienceSchema } from "./subschema/workExperienceSchema";
import { emailSchema } from "./base/emailSchema";
import { mobileSchema } from "./base/mobileSchema";



const resumeShema = new mongoose.Schema<IResume & Document>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    name:{
        type:String
    },
    education:userEducationSchema,
    workExperience:userWorkExperienceSchema,
    skills:{
        type:[String]
    },
    languages:{
        type:[String]
    }
})

resumeShema.add(emailSchema);
resumeShema.add(mobileSchema);


const resumeModel:Model<IResume &Document> = mongoose.model<IResume & Document>('Resumes',resumeShema);

export default resumeModel