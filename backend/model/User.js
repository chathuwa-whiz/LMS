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
        enum: ['Student', 'Teacher', 'Admin'], 
        default: 'Student',
        required: true 
    },
    profilePicture: { 
        type: String, 
    },
    dateOfBirth: { 
        type: Date, 
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

export const User = mongoose.model('User', userSchema);
