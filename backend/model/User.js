import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
    },
    lastName: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true,
        lowercase: true, 
        unique: true, 
        trim: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: { 
        type: String, 
        required: true, 
    },
    role: { 
        type: String, 
        enum: ['student', 'teacher', 'admin'], 
        default: 'student',
        required: true 
    },
    profilePicture: { 
        type: String, 
    },
    dateOfBirth: { 
        type: String, 
        validate: {
            validator: function(value) {
                // Validate date format YYYY-MM-DD
                return /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            message: 'Date must be in the format YYYY-MM-DD.',
        },
        
    },
}, { timestamps: true });

// Password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;