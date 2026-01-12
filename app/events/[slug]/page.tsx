import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
   return (
      <>
         <div className="flex-row-gap-2 items-center">
            <Image src={icon} alt={alt} width={17} height={17} />
            <p>{label}</p>
         </div>
      </>
   );
};

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const { slug } = await params;

   const {
      event: {
         description,
         title,
         overview,
         date,
         time,
         venue,
         location,
         mode,
         audience,
         agenda,
         organizer,
         tags,
         image,
      },
   } = await fetch(`${BASE_URL}/api/events/${slug}`).then((res) => res.json());

   return (
      <>
         <section id="event">
            <div className="header">
               <h1>Event Description</h1>
               <p>{description}</p>
            </div>

            <div className="details">
               {/* left side - Event Conttent */}
               <div className="content">
                  <Image src={image} alt="event banner" width={800} height={800} className="banner" />

                  <section className="flex-col-gap-2">
                     <h2>overview</h2>
                     <p>{overview}</p>
                  </section>

                  <section className="flex-col-gap-2">
                     <h2>Event Details</h2>

                     <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                  </section>
               </div>

               {/* right side - Booking Form */}
               <div className="booking">
                  <p className="text-lg font-semibold">Book Event</p>
               </div>
            </div>
         </section>
      </>
   );
};

export default EventDetailsPage;
