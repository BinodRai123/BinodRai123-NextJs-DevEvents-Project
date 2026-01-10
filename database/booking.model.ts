import { Schema, model, models, Document, Model, Types } from "mongoose";
import Event from "./event.model";

export interface IBooking extends Document {
   eventId: Types.ObjectId;
   email: string;
   createdAt: Date;
   updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
   {
      eventId: {
         type: Schema.Types.ObjectId,
         ref: "Event",
         required: [true, "Event ID is required"],
         index: true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
         trim: true,
         lowercase: true,
      },
   },
   { timestamps: true }
);

/**
 * Pre-save hook: Verify Event existence.
 * Returning a Promise (via async) is the recommended TS way to skip 'next()'.
 */
BookingSchema.pre<IBooking>("save", async function () {
   const eventExists = await Event.findById(this.eventId);

   if (!eventExists) {
      throw new Error(`Referenced event ${this.eventId} does not exist.`);
   }
});

const Booking = (models.Booking as Model<IBooking>) || model<IBooking>("Booking", BookingSchema);
export default Booking;
