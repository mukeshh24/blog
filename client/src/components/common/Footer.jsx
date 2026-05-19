import { CircleStar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-2 px-4 flex flex-col items-center justify-between w-full lg:flex-row">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MukeshBlogs. All rights reserved.
      </p>
      <p className="flex items-center gap-1 text-sm">
        <CircleStar className="w-5 h-5" /> Designed & Developed by{" "}
        <span className="font-bold">Mukesh N Suthar</span>
      </p>
    </footer>
  );
};

export default Footer;
