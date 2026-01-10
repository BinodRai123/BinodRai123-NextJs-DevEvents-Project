import { Schema, model, models, Document, Model } from "mongoose";

export interface IEvent extends Document {
   title: string;
   slug: string;
   description: string;
   overview: string;
   image: string;
   venue: string;
   location: string;
   date: string;
   time: string;
   mode: string;
   audience: string;
   agenda: string[];
   organizer: string;
   tags: string[];
   createdAt: Date;
   updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
   {
      title: { type: String, required: [true, "Title is required"], trim: true },
      slug: { type: String, unique: true, index: true },
      description: { type: String, required: true },
      overview: { type: String, required: true },
      image: { type: String, required: true },
      venue: { type: String, required: true },
      location: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
      mode: { type: String, required: true },
      audience: { type: String, required: true },
      agenda: { type: [String], required: true },
      organizer: { type: String, required: true },
      tags: { type: [String], required: true },
   },
   { timestamps: true }
);

/**
 * Pre-save hook using Promise-based approach to avoid 'next' type conflicts.
 */
EventSchema.pre<IEvent>("save", async function () {
   // 1. Slug Generation
   if (this.isModified("title")) {
      this.slug = this.title
         .toLowerCase()
         .trim()
         .replace(/[^\w ]+/g, "")
         .replace(/\s+/g, "-");
   }

   // 2. Date Normalization
   if (this.isModified("date")) {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) {
         throw new Error("Invalid date format provided.");
      }
      this.date = parsedDate.toISOString().split("T")[0];
   }

   // 3. Time Normalization
   if (this.isModified("time")) {
      this.time = this.time.trim();
   }
});

const Event = (models.Event as Model<IEvent>) || model<IEvent>("Event", EventSchema);
export default Event;
