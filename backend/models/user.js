import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type: String,
        required:true,
        minLength: [6, 'atleast 6 characters']
    },
    gender:{
        type: String,
        required: true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        required: true
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;
