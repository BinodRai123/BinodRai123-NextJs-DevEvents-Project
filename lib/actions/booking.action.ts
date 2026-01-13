"use server";

import connectToDatabase from "../mongodb";
import Booking from "@/database/booking.model";

interface bookingProps {
   eventId: string;
   slug: string;
   email: string;
}

export const createBooking = async ({ eventId, slug, email }: bookingProps) => {
   try {
      await connectToDatabase();

      const booking = await Booking.create({ eventId, email });

      return { sucess: true };
   } catch (error) {
      console.error("create booking failed", error);
      return { sucess: false, error: error };
   }
};
