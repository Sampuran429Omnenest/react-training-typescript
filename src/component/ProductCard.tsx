import { useState } from "react";
import type { Product } from "../types/product";

interface ProductCardProps{
    product:Product;
}
function ProductCard({product}:ProductCardProps){
  //description display of the particular product
    const [showDescription,setShowDescription]=useState<boolean>(false);
    const cardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "var(--card-bg)",
    height:"100%"
  };
   const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "160px",
    objectFit: "contain",   
   };
     const titleStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    margin: 0,
    
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
 
  const priceStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#15803D",  // green colour for price
    fontWeight: "bold",
    margin: 0,
  };
 
  const categoryStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#64748B",  // grey colour for category label
    textTransform: "capitalize",
    margin: 0,
  };
 
  const ratingStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#B45309",  // amber colour for rating
    margin: 0,
  };
  return(
    <div style={cardStyle}>
        <img src={product.image} alt={product.title} style={imgStyle} />
        <p style={categoryStyle}>{product.category}</p>
        <p style={titleStyle}>{product.title}</p>
        <p style={priceStyle}>${product.price.toFixed(2)}</p>
        <p style={ratingStyle}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <button 
        onClick={()=>setShowDescription(!showDescription)}
        style={{
        marginTop: "auto",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        backgroundColor: "#f1f5f9",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 500,
        transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e2e8f0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f1f5f9")
        }
        >
            {showDescription? "Hide Details" : "Show Details"}
        </button>
        {showDescription && (
            <p style={{ fontSize: "12px", color: "#475569", marginTop: '8px' }}>
                {product.description}
            </p>
        )}
    </div>
  );
}
export default ProductCard;