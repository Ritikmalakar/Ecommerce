import React, {
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import Layout from "../Layout";

import {
  baseUrl2,
  baseUrl3
} from "../../AxiosR";

export default function OrdrUser() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [params] =
    useSearchParams();

  useEffect(() => {

    let session_id =
      params.get(
        "session_id"
      );

    // Payment ke baad
    if (
      session_id
    ) {

      localStorage.setItem(
        "stripe_session",
        session_id
      );

      getPaymentStatus(
        session_id
      );

    } else {

      // Login ke baad
      getMyOrders();
    }

  }, [params]);

  // ===================
  // Payment Order
  // ===================
  const getPaymentStatus =
    async (
      session_id
    ) => {

      try {

        const res =
          await baseUrl3.get(

            `/payment-status?session_id=${session_id}`
          );

        console.log(
          "PAYMENT ORDER:",
          res.data
        );

        if (
          res.data.success
        ) {

          setOrders([
            res.data.order
          ]);

          // Cart Empty
          localStorage.removeItem(
            "cart"
          );
        }

      } catch (err) {

        console.log(
          err
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  // ===================
  // User Orders
  // ===================
  const getMyOrders =
    async () => {

      try {

        const auth =
          JSON.parse(
            localStorage.getItem(
              "auth"
            )
          );

        const res =
          await baseUrl3.get(
            "/my-orders",
            {
              headers: {
                Authorization:
                  auth?.token
              }
            }
          );

        console.log(
          "MY ORDERS:",
          res.data
        );

        if (
          res.data.success
        ) {

          setOrders(
            res.data.orders
          );
        }

      } catch (err) {

        console.log(
          err
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  return (

    <Layout>

      {
        loading ?

        <h2 className="text-center mt-5">
          Loading...
        </h2>

        :

        orders.length === 0 ?

        <h2 className="text-center mt-5 text-danger">
          No Orders Found
        </h2>

        :

        <div className="container mt-4">

          <h2 className="mb-4">
            My Orders
          </h2>

          {
            orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="card shadow p-4 mb-4"
                >

                  <h4 className="text-success">
                    Payment Status :
                    {" "}
                    {
                      order.paymentStatus
                    }
                  </h4>

                  <h5>
                    Total :
                    {" "}
                    ₹
                    {
                      order.amount
                    }
                  </h5>

                  <p>
                    Order Date :
                    {" "}
                    {
                      new Date(
                        order.createdAt
                      )
                      .toLocaleString()
                    }
                  </p>

                  <hr />

                  <h5>
                    Ordered Products
                  </h5>

                  {
                    order.products?.map(
                      (p) => (

                        <div
                          key={p._id}
                          className="card p-3 mt-3 d-flex flex-row gap-3 align-items-center"
                        >

                          {/* Image */}
                          <img
                            src={`${baseUrl2.defaults.baseURL}/product-photo/${p._id}`}
                            alt={p.name}
                            style={{
                              width:
                                "100px",
                              height:
                                "100px",
                              objectFit:
                                "cover",
                              borderRadius:
                                "10px",
                              border:
                                "1px solid #ddd"
                            }}
                            onError={(e)=>{

                              e.target.src =
                                "https://via.placeholder.com/100";
                            }}
                          />

                          {/* Details */}
                          <div>

                            <h5>
                              {p.name}
                            </h5>

                            <p className="mb-1">
                              Price :
                              {" "}
                              ₹
                              {p.price}
                            </p>

                            <p className="mb-0">
                              Product ID :
                              {" "}
                              {p._id}
                            </p>

                          </div>

                        </div>
                      )
                    )
                  }

                </div>
              )
            )
          }

        </div>
      }

    </Layout>
  );
}