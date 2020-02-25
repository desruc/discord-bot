const { Schema, model } = require("mongoose");

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const userExperienceModel = new Schema(
  {
    userId: { type: String, unique: true },
    experience: { type: Number }
  },
  {
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

module.exports = model("UserExperience", userExperienceModel);
