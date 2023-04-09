import mongoose, {Schema} from "mongoose"
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
});

const Users = mongoose.model('User', userSchema);
export default Users


