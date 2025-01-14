import mongoose, { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
 id: {
  type: mongoose.Schema.Types.ObjectId,
 },
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true,
  unique: true,
 },
 password: {
  type: String,
  required: true,
 },
 role: {
  type: Number,
  default: 1050,
 },
 isActive: {
  type: Boolean,
  default: false,
 },
 createdAt: {
  type: Date,
  default: Date.now,
 },
 updatedAt: {
  type: Date,
  default: Date.now,
 }
},
 {
  timestamps: true
 }
)

export const user = model('user', userSchema);