import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
 id: {
  type: Types.ObjectId,
 },
 name: {
  type: String,
  required: true
 },
 description: {
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
 stock: {
  type: Number,
  default: 0,
  required: true,
 },
 category: {
  type: String,
  required: false,
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
 company: [{
  type: String,
  ref: 'company',
 }]
},
 {
  timestamps: true
 }
)

export const product = model('product', productSchema);