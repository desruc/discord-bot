const { Schema, model } = require("mongoose");

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const shopItemModel = new Schema(
  {
    name: { type: String, required: true },
    minCost: { type: Number, required: true },
    maxCost: { type: Number, required: true },
    minValue: { type: Number, required: true },
    maxValue: { type: Number, required: true },
    type: { type: String, required: true }
  },
  {
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

module.exports = model("ShopItem", shopItemModel);
