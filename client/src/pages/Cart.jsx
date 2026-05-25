import React, {
  useEffect,
  useState
} from "react";

import Layout from "../component/Layout";

import {
  baseUrl2,
  baseUrl3
} from "../AxiosR";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function Cart() {

  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);

  // Load Cart
  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(data);

  }, []);

  // Payment Success Check
  useEffect(() => {

    const params =
      new URLSearchParams(
        location.search
      );

    const success =
      params.get("success");

    const sessionId =
      params.get("session_id");

    if (
      success === "true" &&
      sessionId
    ) {
      updatePayment(
        sessionId
      );
    }

  }, [location.search]);

  // Update Payment
  const updatePayment =
    async (
      sessionId
    ) => {

      try {

        const { data } =
          await baseUrl3.get(
            `/payment-status?session_id=${sessionId}`
          );

        if (
          data.success &&
          data.payment_status === "paid"
        ) {

          alert(
            "✅ Payment Successful"
          );

          // Clear Cart
          localStorage.removeItem(
            "cart"
          );

          setCart([]);

          navigate(
            "/user/order",
            {
              replace: true
            }
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  // Remove Item
  const removeItem =
    (id) => {

      const updatedCart =
        cart.filter(
          (p) =>
            p._id !== id
        );

      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCart
        )
      );

      setCart(
        updatedCart
      );
    };

  // Total Price
  const totalPrice =
    () => {

      let total = 0;

      cart.forEach(
        (item) => {
          total =
            total +
            item.price;
        }
      );

      return total;
    };

  // Stripe Payment
  const handlePayment =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          navigate(
            "/login"
          );

          return;
        }

        const { data } =
          await baseUrl3.post(

            "/stripe-payment",

            {
              products: cart
            },

            {
              headers: {
                Authorization:
                  token
              }
            }
          );

        if (
          data?.url
        ) {

          window.location.href =
            data.url;
        }

      } catch (error) {

        console.log(
          error.response?.data
          || error
        );

        alert(
          error.response?.data?.message
          || "Payment Failed"
        );
      }
    };

  return (

    <Layout>

      <div className="container mt-4">

        <h2 className="text-center mb-4">
          🛒 Cart Items
        </h2>

        <div className="row">

          {/* Cart Items */}
          <div className="col-md-8">

            {
              cart.length > 0
              ? (

                cart.map(
                  (p) => (

                    <div
                      className="card mb-3 shadow"
                      key={p._id}
                    >

                      <div className="row g-0">

                        {/* Product Image */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center p-2">

                          <img
                            src={`${baseUrl2.defaults.baseURL}/product-photo/${p._id}`}
                            alt={p.name}
                            className="img-fluid rounded"
                            style={{
                              height: "220px",
                              width: "100%",
                              objectFit: "contain",
                              background: "#fff",
                              padding: "10px"
                            }}
                          />

                        </div>

                        {/* Product Details */}
                        <div className="col-md-8">

                          <div className="card-body">

                            <h5 className="card-title">
                              {p.name}
                            </h5>

                            <p className="card-text text-muted">
                              {
                                p.description?.substring(
                                  0,
                                  80
                                )
                              }...
                            </p>

                            <h6 className="text-success">
                              ₹ {p.price}
                            </h6>

                            <button
                              className="btn btn-danger mt-2"
                              onClick={() =>
                                removeItem(
                                  p._id
                                )
                              }
                            >
                              Remove
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  )
                )

              )
              : (

                <h4 className="text-center text-muted">
                  Cart Empty
                </h4>

              )
            }

          </div>

          {/* Cart Summary */}
          <div className="col-md-4">

            <div className="card shadow p-3">

              <h4>
                Cart Summary
              </h4>

              <hr />

              <h5>
                Total Items :
                {" "}
                {cart.length}
              </h5>

              <h4 className="text-success mt-3">
                Total :
                ₹ {totalPrice()}
              </h4>

              {
                cart.length > 0 && (

                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={
                      handlePayment
                    }
                  >
                    Pay Now
                  </button>

                )
              }

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}