import React from "react";
import { Spinner } from "../ui/spinner";

const Loading = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-30 bg-white">
      <div className="flex items-center gap-2">
        <Spinner className="w-10 h-10" />
        <span>Loading...</span>
      </div>
    </section>
  );
};

export default Loading;
