const { Schema, model } = require('mongoose');

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const userModel = new Schema(
  {
    userId: { type: String, unique: true },
    experience: { type: Number, default: 0 },
    currency: { type: Number, default: 0 },
    robot: { type: Schema.Types.ObjectId, ref: 'Robot', default: null },
    cooldowns: [{ command: { type: String }, timestamp: { type: String } }],
    daily: {
      streak: { type: Number, default: 0 },
      timestamp: { type: String }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

userModel.pre(/^find/, function() {
  this.populate('robot');
});

module.exports = model('User', userModel);
