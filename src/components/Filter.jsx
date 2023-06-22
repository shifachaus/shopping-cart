import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import Rating from "./Rating";
import { cartState } from "../context/Context";

const Filter = () => {
  const {
    productState: { byStock, byFastDelivery, byRating, sort },
    productDispatch,
  } = cartState();

  const [rate, setRate] = useState(2);
  return (
    <div className="form">
      <div className="form__input">
        <input
          type="radio"
          id="asc"
          onChange={() => {
            productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" });
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
        <label htmlFor="asc">Ascending</label>
      </div>

      <div className="form__input">
        <input
          type="radio"
          id="desc"
          onChange={() => {
            productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" });
          }}
          checked={sort === "highToLow" ? true : false}
        />
        <label htmlFor="desc">Descending</label>
      </div>

      <div className="form__input">
        <input
          type="checkbox"
          id="stock"
          onClick={() => {
            productDispatch({ type: "FILTER_BY_STOCK" });
          }}
          checked={byStock}
        />
        <label htmlFor="stock">Include Out of Stock</label>
      </div>

      <div className="form__input">
        <input
          type="checkbox"
          name=""
          id="fast"
          onClick={() => {
            productDispatch({ type: "FILTER_BY_DELIVERY" });
          }}
          checked={byFastDelivery}
        />
        <label htmlFor="fast">Fast Delivery Only</label>
      </div>

      <div className="form__input--rating">
        <label>Rating</label>

        <Rating
          rating={byRating}
          style={{ cursor: "pointer" }}
          setRate={setRate}
        />
      </div>

      <button
        className="filter__btn"
        onClick={() => {
          productDispatch({ type: "CLEAR_FILTERS" });
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
