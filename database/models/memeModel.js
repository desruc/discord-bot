const { Schema, model } = require("mongoose");

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const memeModel = new Schema(
  {
    url: { type: String, unique: true }
  },
  {
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

module.exports = model("Meme", memeModel);
