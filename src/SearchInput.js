import { useRef, useEffect } from "react";
import axios from "axios";

const API_KEY = "20524329-a56f712174c95d9a33f77f075";

const SearchInput = (props) => {
  const timeout = useRef(0);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const initialstate = "flower";
    const res = await axios.get("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: encodeURIComponent(initialstate),
        image_type: "photo",
        per_page: 44,
        orientation: "horizontal",
      },
    });
    props.setImageData(res.data.hits.map((it) => it.webformatURL));
  };

  const changeHandler = (e) => {
    clearTimeout(timeout.current);

    console.log(e.target);

    // Query images after timeout
    timeout.current = setTimeout(async () => {
      const el = e.target;

      if (el.value.length > 0) {
        const res = await axios.get("https://pixabay.com/api/", {
          params: {
            key: API_KEY,
            q: encodeURIComponent(el.value),
            image_type: "photo",
            per_page: 44,
            orientation: "horizontal",
          },
        });
        props.setImageData(res.data.hits.map((it) => it.webformatURL));
      }
    }, 600);
  };

  return (
    <input
      className="rounded-lg block my-2 py-1 bg-black w-64 text-lg text-center text-white"
      type="text"
      onChange={changeHandler}
    />
  );
};

export default SearchInput;
