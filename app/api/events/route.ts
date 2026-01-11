import connectToDatabase from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
   try {
      await connectToDatabase();

      const formData = await req.formData();
      console.log("Received form data:", formData);

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

      // Create new event with image URL
      const createdEvent = await Event.create(event);

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
