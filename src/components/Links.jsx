import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "🕵 All" },
  { url: "/news", text: "📺 News" },
  { url: "/images", text: "📸 Images" },
  { url: "/videos", text: "🎥 videos" },
];

const Links = () => {

  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }, index) => (
          <NavLink
            key={index}
            to={url}
            className={({isActive}) => (isActive ? "m-5 mb-0 text-blue-700 text-xl border-b-2 dark:text-blue-300 border-blue-700 pb-2" : 'm-5 mb-0')}
          >
            {text}
          </NavLink>
      ))}
    </div>
  );
};

export default Links;
