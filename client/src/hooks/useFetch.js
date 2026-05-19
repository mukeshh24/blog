import errorHandler from "@/lib/errorHandler";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result?.success) {
          setData(result);
        }
      } catch (error) {
        if (error?.name === "AbortError") {
          console.log("Request aborted!");
          return;
        }
        const message =
          error?.response?.data?.message || "Something went wrong!";
        toast.error(message);
        setError(message);
        console.log(errorHandler(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
