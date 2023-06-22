import Rating from "./Rating";
import { cartState } from "../context/Context";

const SignleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  return (
    <div className="card__data">
      <img className="image" src={prod.image} alt={prod.image} />
      <div className="card">
        <p className="name">{prod.name}</p>
        <span>Rs.{prod.price.split(".")[0]}</span>
        {prod.fastDelivery ? <p>Fast Delivery</p> : <p>4 days delivery</p>}

        <Rating rating={prod.ratings} />

        <div className="btn__container">
          {cart.some((p) => p.id === prod.id) ? (
            <button
              className="remove__btn"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: prod });
              }}
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="add__btn"
              disabled={!prod.inStock}
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: prod });
              }}
            >
              {!prod.inStock ? "Out of Stock" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignleProduct;
