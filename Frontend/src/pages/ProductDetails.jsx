import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl2 } from "../../Axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getDetails();
  }, [id]);

  const handleAddCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        })
      );

      toast.success("Product added to cart");
    }
  };

  const getDetails = async () => {
    try {
      const { data } = await baseUrl2.get(`/getOne/${id}`);

      if (data?.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          <h4 className="text-success">₹{product.price}</h4>

          <p>{product.description}</p>

          <button className="btn btn-primary" onClick={handleAddCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
