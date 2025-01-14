import { Schema, Types, model } from 'mongoose';

const companySchema: Schema = new Schema({
 id: {
  type: Types.ObjectId,
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
 document: {
  type: String,
  required: true,
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
 },
 user: {
  type: Types.ObjectId,
  ref: 'user',
 }
},
 {
  timestamps: true
 }
)

export const company = model('company', companySchema);