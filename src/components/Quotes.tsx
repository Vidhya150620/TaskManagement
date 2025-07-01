import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../App/store";
import { useEffect } from "react";
import { fetchQuote } from "../utils/slice";

export const Quotes = () =>{
      const dispatch = useDispatch<AppDispatch>();
  const { quote, author, status } = useSelector((state: RootState) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Could not load quote.</p>;
    return(
        <>
         <div className="p-4   w-[90%] mx-auto">
      <p className="text-lg italic mb-2">"{quote}"</p>
      <p className="text-right text-sm text-gray-500">— {author}</p>
    </div>
        </>
    )
}