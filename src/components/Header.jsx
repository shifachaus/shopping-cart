import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { cartState } from "../context/Context";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  const { productDispatch } = cartState();

  const [show, setShow] = useState(false);

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            Shopping Cart
          </Link>

          <div className="search__box">
            <input
              type="text"
              placeholder="search a product"
              className="search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </div>

          <div className="cart">
            <div className="cart-icon">
              <FiShoppingCart style={{ fontSize: "1.2rem", color: "#FFF" }} />{" "}
              <span
                style={{
                  fontSize: ".9rem",
                  color: "#FFF",
                  marginLeft: ".2em",
                }}
              >
                {cart.length}
              </span>
            </div>
            <IoMdArrowDropdown
              onClick={() => setShow(!show)}
              style={{
                fontSize: "1.3rem",
                color: "#FFF",
                cursor: "pointer",
              }}
            />
          </div>

          {show && (
            <div className="cart__info">
              {cart.length > 0 ? (
                <div className="cart__card">
                  {cart.map((item) => {
                    return (
                      <div className="cart__menu" key={item.id}>
                        <img
                          className="cart__menu--img"
                          src={item.image}
                          alt={item.image}
                        />
                        <div className="">
                          <p>{item.name}</p>
                          <p>Rs.{item.price.split(".")[0]}</p>
                        </div>

                        <span
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            });
                          }}
                          className="remove__btn--cart"
                        >
                          <AiOutlineDelete style={{ fill: "#393d45" }} />
                        </span>
                      </div>
                    );
                  })}

                  <Link
                    to="/cart"
                    onClick={() => setShow(false)}
                    className="cart__btn"
                  >
                    Go to cart
                  </Link>
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
