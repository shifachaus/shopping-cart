import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { cartState } from "../context/Context";

const Rating = ({ rating, style, setRate }) => {
  const { productDispatch } = cartState();

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <span
            style={style}
            onClick={() => {
              productDispatch({ type: "FILTER_BY_RATING", payload: index + 1 });
            }}
            key={index}
          >
            {rating > index ? (
              <AiFillStar style={{ fill: "yellow" }} />
            ) : (
              <AiOutlineStar />
            )}
          </span>
        );
      })}
    </>
  );
};

export default Rating;
