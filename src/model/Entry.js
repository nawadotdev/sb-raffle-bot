import { model, Schema } from "mongoose";

const entrySchema = new Schema({
    userId: { type: String, required: true, unique: true },
    playboyGa: { type: Boolean, default: false},
    gigaChadGa: { type: Boolean, default: false},
    chadGa: { type: Boolean, default: false},
    womanizerGa: { type: Boolean, default: false},
    studGa: { type: Boolean, default: false},
    amount: { type: Number, default: 0 },
})

export default model("Entry", entrySchema)