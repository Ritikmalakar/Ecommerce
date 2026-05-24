import React,
{
  useEffect,
  useState
}
from "react";

import Layout
from "../Layout";

import {
  baseUrl,
  baseUrl2
}
from "../../AxiosR";

export default function AdminOrders() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders =
    async () => {

      try {

        const res =
          await baseUrl.get(
            "/all-orders"
          );

        if (
          res.data.success
        ) {

          setOrders(
            res.data.orders
          );
        }

      } catch (error) {

        console.log(
          error
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  const handleDelete =
    async (id) => {

      try {

        const ans =
          window.confirm(
            "Delete Order?"
          );

        if (!ans)
          return;

        const res =
          await baseUrl.delete(
            `/delete-order/${id}`
          );

        if (
          res.data.success
        ) {

          alert(
            "Order Deleted"
          );

          getAllOrders();
        }

      } catch (error) {

        console.log(
          error
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
                All User Orders
              </h2>

              {
                orders.map(
                  (order) => (

                    <div
                      key={order._id}
                      className="card shadow p-4 mb-4"
                    >

                      <div className="d-flex justify-content-between">

                        <div>

                          <h4 className="text-primary">
                            Order ID :
                            {order._id}
                          </h4>

                          <h5 className="text-success">
                            Payment :
                            {
                              order.paymentStatus
                            }
                          </h5>

                          <h5>
                            Amount :
                            ₹
                            {order.amount}
                          </h5>

                          <h6>
                            Status :
                            {
                              order.status ||
                              "Processing"
                            }
                          </h6>

                          <p>
                            Date :
                            {
                              new Date(
                                order.createdAt
                              )
                              .toLocaleString()
                            }
                          </p>

                        </div>

                        <button
                          className="btn btn-danger h-25"
                          onClick={() =>
                            handleDelete(
                              order._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                      <hr />

                      <h4>
                        User Details
                      </h4>

                      <p>
                        Name :
                        {
                          order.buyer?.name
                        }
                      </p>

                      <p>
                        Email :
                        {
                          order.buyer?.email
                        }
                      </p>

                      <p>
                        Phone :
                        {
                          order.buyer?.phone
                        }
                      </p>

                      <p>
                        Address :
                        {
                          order.buyer?.address
                        }
                      </p>

                      <hr />

                      <h4>
                        Products
                      </h4>

                      {
                        order.products?.map(
                          (p) => (

                            <div
                              key={p._id}
                              className="card p-3 mt-3 d-flex flex-row gap-3 align-items-center"
                            >

                              <img
                                src={`${baseUrl2.defaults.baseURL}/product-photo/${p._id}`}
                                alt={p.name}
                                style={{
                                  width:
                                    "120px",
                                  height:
                                    "120px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "10px"
                                }}
                              />

                              <div>

                                <h5>
                                  {p.name}
                                </h5>

                                <p>
                                  ₹
                                  {p.price}
                                </p>

                                <p>
                                  {
                                    p.description
                                  }
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