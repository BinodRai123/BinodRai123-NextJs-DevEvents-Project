import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreButton";
import { events } from "@/lib/constants";

const page = () => {
   return (
      <section>
         <h1 className="text-center">
            The Hub for Every Developer <br />
            Even you can't miss it!
         </h1>
         <p className="mt-5 text-center">Hackathons, Meetups, and Confreneces, All in one place</p>

         <ExploreButton />

         <div className="mt-20 space-y-7">
            <h3>Featured Events</h3>

            <ul className="events list-none">
               {events.map((event) => {
                  return (
                     <li key={event.title}>
                        <EventCard {...event} />
                     </li>
                  );
               })}
            </ul>
         </div>
      </section>
   );
};

export default page;
