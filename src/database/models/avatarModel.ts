import mongoose, { Schema } from 'mongoose';
import { IAvatar } from '../../typings';

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const avatarSchema: Schema = new Schema(
  {
    userId: { type: String },
    guildId: { type: String },
    exp: { type: Number },
    hitPoints: { type: Number },
    armour: { type: Number },
    attack: { type: Number },
    coins: { type: Number }
  },
  {
    timestamps: true,
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

export default mongoose.model<IAvatar>('User', avatarSchema);
