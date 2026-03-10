import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import './CollectionPage.css';

function CollectionPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      const data = await getProducts(category);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = () => {
    if (category === 'all') return 'All Products';
    if (category === 'immediate-dispatch') return 'Immediate Dispatch';
    if (category === 'exclusive-drops') return 'Exclusive Drops';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="collection-page container">
      <h1 className="collection-title">{getCategoryTitle()}</h1>
      
      {products.length === 0 ? (
        <p className="no-products">No products found in this collection.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
