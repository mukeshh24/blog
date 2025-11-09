import React from "react";
import { Input } from "../ui/input";

const SearchBox = () => {
  return (
    <>
      <form>
        <Input placeholder="Search..." className="rounded-full h-9 bg-gray-50" />
      </form>
    </>
  );
};

export default SearchBox;
