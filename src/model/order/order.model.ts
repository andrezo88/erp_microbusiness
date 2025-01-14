import { model, Schema, Types } from "mongoose";


const orderSchema = new Schema({
 id: {
  type: Types.ObjectId,
 },
 company: {
  type: Types.ObjectId,
  ref: 'company',
  required: true,
 },
 user: {
  type: Types.ObjectId,
  ref: 'user',
  required: true,
 },
 products: [{
  product: {
   type: Types.ObjectId,
   ref: 'product',
   required: true,
  },
  quantity: {
   type: Number,
   required: true,
  },
 }],
 total: {
  type: Number,
  required: true,
 },
 status: {
  type: String,
  required: true,
 },
 createdAt: {
  type: Date,
  default: Date.now,
 },
 updatedAt: {
  type: Date,
  default: Date.now,
 },
},
 {
  timestamps: true
 }
)

export const order = model('order', orderSchema);