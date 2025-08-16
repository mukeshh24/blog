import React from "react";

const MainFooter = () => {
  return (
    <>
      <p className="text-center py-2 text-sm bg-gray-50">
        © {new Date().getFullYear()} Designed & Developed By:{" "}
        <span className="text-violet-600 font-semibold">Mukesh Suthar.</span>
      </p>
    </>
  );
};

export default MainFooter;
