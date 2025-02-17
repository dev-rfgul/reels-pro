import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface Iuser {
    email: string,
    password: string,
    name: string,
    _id?: mongoose.Types.ObjectId // ? means this field is optional
    createdAt?: Date,
    updatedAt: Date,
}
// in angular brackets we define the type 
const UserSchema = new Schema<Iuser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
}, { timestamps: true })


//this is a middleware which will execute before saving the data to the database and whenever the password field is modified 
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})
// this will check wether the modal has a user or not if not then it will create a new model
const User = models?.User || model("User", UserSchema)
export default  User;