import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  userId: string;
  guilds: {
    guildId: string;
    experience: number;
  }[];
}

// Remove the mongo ID and version key when returning JSON
const removeIdAndVersion = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

const userModel: Schema = new Schema(
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

export default model<IUser>('User', userModel);
