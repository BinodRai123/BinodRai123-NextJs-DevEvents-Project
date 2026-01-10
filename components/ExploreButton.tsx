"use client";

import Image from "next/image";
import React from "react";

const ExploreButton = () => {
   return (
      <button type="button" id="explore-btn" className="mx-auto mt-7">
         <a href="#events">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="Arrow right" width={20} height={20} />
         </a>
      </button>
   );
};

export default ExploreButton;
