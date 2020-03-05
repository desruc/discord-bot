const { Schema, model } = require("mongoose");

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const userModel = new Schema(
  {
    userId: { type: String, unique: true },
    experience: { type: Number, default: 0 },
    memesRequested: { type: Number, default: 0 },
    currency: { type: Number, default: 0 }
  },
  {
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

module.exports = model("User", userModel);
