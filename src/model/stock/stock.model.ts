import { ref } from "joi";
import { model, Schema, Types } from "mongoose";

const stockSchema = new Schema({
 id: {
  type: Types.ObjectId,
 },
 nf: {
  type: String,
  required: true
 },
 company: {
  type: String,
  required: true
 },
 price: {
  type: Number,
  required: true,
 },
 product: {
  type: String,
  required: true
 },
 quantity: {
  type: Number,
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
 user: {
  type: String,
  ref: 'user',
 }
},
 {
  timestamps: true
 }
)

export const stock = model('stock', stockSchema);