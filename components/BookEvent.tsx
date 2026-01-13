"use client";

import { createBooking } from "@/lib/actions/booking.action";
import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
   const [email, setEmail] = useState("");
   const [submitted, setSubmitted] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim()) return alert("please enter email");

      const { sucess } = await createBooking({ eventId, slug, email });

      if (sucess) {
         setSubmitted(true);
      } else {
         setSubmitted(false);
      }
   };

   return (
      <div id="book-event">
         {submitted ? (
            <p className="text-sm">Thank you for Signing Up</p>
         ) : (
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     id="email"
                     placeholder="Enter your email"
                     required
                  />
               </div>

               <button type="submit" className="button-submit">
                  Submit
               </button>
            </form>
         )}
      </div>
   );
};

export default BookEvent;
