import { useEffect, useState } from "react";
import { cartState } from "../context/Context";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0));
  }, [cart]);

  return (
    <main className="cart__section ">
      <section className="add__to__cart--section">
        {cart.length > 0 ? (
          <div className="cart__card ">
            {cart.map((item) => {
              return (
                <div className="cart__menu--items" key={item.id}>
                  <img
                    className="cart__menu__item--img"
                    src={item.image}
                    alt={item.image}
                  />
                  <div className="">
                    <p>{item.name}</p>
                    <p>Rs.{item.price.split(".")[0]}</p>
                  </div>

                  <div className="select__qty">
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: item.id,
                            qty: e.target.value,
                          },
                        });
                      }}
                    >
                      {[...Array(item.inStock).keys()].map((x) => {
                        return <option value={x + 1}>{x + 1}</option>;
                      })}
                    </select>
                  </div>
                  <span
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}
                  >
                    <AiOutlineDelete style={{ fill: "#393d45" }} />
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <span
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "#393d45",
            }}
          >
            Cart is empty
          </span>
        )}
      </section>
      <section className="summery">
        <h2>Subtottal {cart.length} items</h2>
        <p>Total Rs.{total}</p>
        <button
          disabled={cart.length === 0}
          className="proceed__btn"
          type="button"
        >
          {" "}
          Proceed to Checkout
        </button>
      </section>
    </main>
  );
};

export default Cart;
