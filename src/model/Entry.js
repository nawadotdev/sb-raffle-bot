import { model, Schema } from "mongoose";

const entrySchema = new Schema({
    userId: { type: String, required: true, unique: true },
    playboyGa: { type: String, default: false},
    gigaChadGa: { type: String, default: false},
    chadGa: { type: String, default: false},
    womanizerGa: { type: String, default: false},
    studGa: { type: String, default: false},
})

export default model("Entry", entrySchema)