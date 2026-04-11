import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationCode: {type: Number, default: null},
    emailVerificationCodeExpires: {type: Date, default: null},
    passwordResetCode: {type: Number, default: null},
    passwordResetCodeExpires: {type: Date, default: null},
  },
  {
    timestamps: true,
  }
);

// pre-save hook to hash password (must use regular function, not arrow)
userSchema.pre("save", async function () {
   // --> IMPORTANT. Will help avoid rehashing the alread hashed password. By the time the user tries to log in, their stored password has already been hashed multiple times and no longer matches what they entered on registration/reset, which causes the login bug.
   if (!this.isModified("password")) return;
  try {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    console.log(error);
  }
});

// method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;