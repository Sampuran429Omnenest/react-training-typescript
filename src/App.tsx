import { useEffect, useState } from "react";
import type { Product } from "./types/product";
import ProductCard from "./component/ProductCard";

function App(){
  const [selectedCategory,setSelectedCategory]=useState<string>("all");
  const [allProducts,setAllProducts]=useState<Product[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(true);
  const [error,setError]=useState<string|null>(null);
  //fetching all the products from api
  useEffect(()=>{
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
    .then((res)=>{
      if(!res.ok){
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data:Product[])=>{
      setAllProducts(data);
      setIsLoading(false);
    })
    .catch((err:Error)=>{
      setError(err.message);
      setIsLoading(false);
    });
  },[]);
  const categories=[
      "all",
      ...new Set(allProducts.map((p)=>p.category)),
  ]
  //filtering the products if required by the category
  const filteredProducts=selectedCategory==="all" 
  ? allProducts
  : allProducts.filter((p)=>p.category===selectedCategory);
   if (error)
    return (
      <div style={{ padding: "40px", color: "red", textAlign: "center" }}>
        <h2>Error: {error}</h2>
      </div>
    );
    return(
      <div
      style={{
      fontFamily: "Arial, sans-serif",
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center"
      }}
      >
      <h1
      style={{
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px"
      }}
      >
        Product Store
      </h1>
      {/** fetching the count of the filtered products out of the total ones */}
      <p
       style={{
          color: "#64748B",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Showing <strong>{filteredProducts.length}</strong> of {" "}
        <strong>{allProducts.length}</strong> products
      </p>
      {/**Dropdown Category */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <select
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}
        style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            textTransform: "capitalize",
          }}
        >
          {categories.map((cat)=>(
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/** loading skeleton*/}
      <div
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px"
      }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "350px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "8px",
                }}
              />
            ))
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
    );
}
export default App;