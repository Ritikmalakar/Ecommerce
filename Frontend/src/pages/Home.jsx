import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { toast } from "react-toastify";
import { baseUrl2 } from "../../Axios";

export default function Home() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await baseUrl2.get("/getAll");

      console.log(data);

      if (data?.success) {
        setProductData(data?.products || []);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {productData.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
