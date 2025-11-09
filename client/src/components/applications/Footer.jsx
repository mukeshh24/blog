import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-sm text-center py-4 bg-gray-50">
        &copy; Copyright {new Date().getFullYear()} | Designed & Developed by{" "}
        <Link to={""} className="font-bold">Mukesh Suthar</Link>
      </footer>
    </>
  );
};

export default Footer;
