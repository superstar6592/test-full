const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Add this import
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: "freelancer",
    },
    userName: {
      type: String,
      unique: true,
    },
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    provider: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    workHistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "WorkHistory",
      },
    ],
    education: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Education",
      },
    ],
    portfolios: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Portfolio",
      },
    ],
    skills: {
      type: Array,
    },
    hourlyRate: {
      type: Number,
    },
    review: {
      type: Number,
    },
    // Remove duplicate portfolios field - you already have it above
    linkedInProfile: {
      type: String,
    },
    behanceProfile: {
      type: String,
    },
    githubProfile: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
