import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../typings';

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const userSchema: Schema = new Schema(
  {
    userId: { type: String, unique: true },
    guilds: [
      {
        guildId: { type: String, required: true },
        experience: { type: Number, default: 0 }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      transform: removeIdAndVersion
    }
  }
);

export default mongoose.model<IUser>('User', userSchema);
