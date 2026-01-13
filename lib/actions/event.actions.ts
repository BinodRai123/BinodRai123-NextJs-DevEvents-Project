"use server";

import { Event } from "@/database";
import connectToDatabase from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
   try {
      await connectToDatabase();

      // 1. Fetch the source event
      const event = await Event.findOne({ slug });

      if (!event || !event.tags) {
         return [];
      }

      // 2. Query for similar events
      const similarEvents = await Event.find({
         _id: { $ne: event._id }, // Don't show the current event
         tags: { $in: event.tags }, // Match any events that share at least one tag
      })
         .limit(3) // Professional tip: Always limit recommendations to keep the UI clean
         .lean(); // Performance boost: Returns plain JS objects instead of heavy Mongoose docs

      return JSON.parse(JSON.stringify(similarEvents)); // Ensure serialization for Next.js Client Components
   } catch (error) {
      console.error("Error fetching similar events:", error);
      return [];
   }
};
