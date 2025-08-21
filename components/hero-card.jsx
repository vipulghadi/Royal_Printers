import React from "react";

function HeroCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <a href="#">
        <img
          src="https://flowbite.com/docs/images/products/apple-watch.png"
          alt="Apple Watch"
          className="w-full h-[70%] object-contain p-4 bg-gray-50"

        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>

      </div>
    </div>
  );
}

export default HeroCard;
