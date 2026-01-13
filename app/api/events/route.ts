import connectToDatabase from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
   try {
      await connectToDatabase();

      const formData = await req.formData();

      let event;

      try {
         event = Object.fromEntries(formData.entries());
      } catch (error) {
         return NextResponse.json({ message: "Invalid form data" }, { status: 400 });
      }

      const file = formData.get("image") as File | null;

      if (!file) return NextResponse.json({ message: "Image file is required" }, { status: 400 });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload image to Cloudinary
      const UploadImageToCloudinary = await new Promise((resolve, reject) => {
         cloudinary.uploader
            .upload_stream({ resource_type: "image", folder: "devEvent" }, (error, result) => {
               if (error) return reject(error);
               resolve(result);
            })
            .end(buffer);
      });

      // Assign the secure URL of the uploaded image to the event object
      event.image = (UploadImageToCloudinary as { secure_url: string }).secure_url;

      //converting the String formdata of tags and agenda
      //from "[tagsdata]" to [tagsData]
      const tags = JSON.parse(formData.get("tags") as string);

      const agenda = JSON.parse(formData.get("agenda") as string);

      // Create new event with image URL
      const createdEvent = await Event.create({ ...event, tags: tags, agenda: agenda });

      return NextResponse.json(
         { message: "Event created successfully", event: createdEvent },
         { status: 201 }
      );
   } catch (e) {
      console.error("Error handling POST request:", e);
      return NextResponse.json(
         {
            message: "Event creation failed",
            error: e instanceof Error ? e.message : "unknow error",
         },
         { status: 500 }
      );
   }
}

export async function GET() {
   try {
      await connectToDatabase();

      const events = await Event.find().sort({ createdAt: -1 });

      if (!events) return NextResponse.json({ message: "No events found" }, { status: 404 });

      return NextResponse.json({ events }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
   }
}
