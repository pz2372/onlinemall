const mongoose = require("mongoose");

const validateEmail = async function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) throw new Error("Please enter a valid email address.");
  const user = await this.constructor.findOne({ email });
  if (user)
    throw new Error("A user is already registered with this email address.");
};

const validateRole = async function (role) {
  const admin = await this.constructor.findOne({ role });
  if (admin.role === "SUPERADMIN")
    throw new Error("An admin is already registered with this role.");
};

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minLength: [3, "Must be at least 3 characters."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    validate: validateEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "Must be at least 8 characters."],
  },
  role: {
    type: String,
    enum: {
      values: ["SUPERADMIN", "BRANDOWNER"],
      message: "{VALUE} role is not supported.",
    },
    default: "BRANDOWNER",
    validate: validateRole,
  },
  brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
