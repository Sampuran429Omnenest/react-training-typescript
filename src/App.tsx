import { useEffect, useState } from "react";
import type { Product } from "./types/product";
import ProductCard from "./component/ProductCard"; 

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Responsive logic from your reference project
  
  
  

  // 1. Fetch Categories once on mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["all", ...data]))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  // 2. Fetch Products (FIXED URL)
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // FIXED: Added missing '/products/category/' path
    const url = selectedCategory === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Server error: " + response.status);
        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [selectedCategory]);

  if (error) return <div style={{ padding: "40px", color: "red", textAlign: 'center' }}><h2>Error: {error}</h2></div>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: 'center' }}>Product Store</h1>
      <p style={{ color: "#64748B", marginBottom: "20px", textAlign: 'center' }}>
        Showing <strong>{products.length}</strong> {selectedCategory} products
      </p>

      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={buttonStyle(selectedCategory === cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Grid using getGridColumns() */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        width:'100%',
        maxWidth:'1200px',
        margin:'0 auto',
        padding:'0 20px'
      }}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ height: "350px", backgroundColor: "#f1f5f9", borderRadius: "8px" }} />
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

// Button styling helper from your reference
const buttonStyle = (isActive: boolean) => ({
    padding: '10px 20px',
    background: isActive ? '#0066cc' : 'white',
    color: isActive ? 'white' : '#0066cc',
    border: '2px solid #0066cc',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    textTransform: 'capitalize' as const,
    transition: '0.3s'
});

export default App;
