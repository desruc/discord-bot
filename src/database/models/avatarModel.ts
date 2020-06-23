import mongoose, { Schema } from 'mongoose';
import { IAvatar } from '../../typings';

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const avatarSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    exp: { type: Number, default: 0 },
    hitPoints: { type: Number, default: 100 },
    maxHitPoints: { type: Number, default: 100 },
    armour: { type: Number, default: 1 },
    attack: { type: Number, default: 1 },
    coins: { type: Number, default: 0 },
    cooldowns: [{ command: { type: String }, timestamp: { type: Number } }],
    inventory: {
      healthPotion: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

export default mongoose.model<IAvatar>('Avatar', avatarSchema);
