import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Event, IEvent } from "@/database";

/**
 * Interface for the dynamic route parameters
 */
interface RouteParams {
   params: {
      slug: string;
   };
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
   try {
      // 1. Establish Database Connection
      await connectToDatabase();

      // 2. Extract Params
      const { slug } = await params;

      // check if slug is valid
      if (!slug || typeof slug !== "string") {
         return NextResponse.json({ message: "A valid event slug is required." }, { status: 400 });
      }

      // Sanitize slug input
      const santizedSlug = slug.trim().toLowerCase();

      // 3. Query the Database
      // Using .lean() for better performance as we are only reading data
      const event: IEvent | null = await Event.findOne({ slug: santizedSlug }).lean();

      // 4. Handle Not Found
      if (!event) {
         return NextResponse.json({ message: `Event with slug '${slug}' not found.` }, { status: 404 });
      }

      // 5. Success Response
      return NextResponse.json(
         {
            message: "Event fetched successfully",
            event: event,
         },
         { status: 200 }
      );
   } catch (error: unknown) {
      // 6. Robust Error Handling
      console.error("Error fetching event by slug:", error);

      // Differentiate between Mongoose/Database errors and generic ones
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

      return NextResponse.json(
         {
            message: "Internal Server Error",
            error: errorMessage ? errorMessage : "An unexpected error occurred",
         },
         { status: 500 }
      );
   }
}
