import { useEffect, useState } from 'react';
import './App.css';
import { fetchProducts, fetchCategories } from './app/features/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import CategoryDropdown from './app/components/CategoryDropDown';

// 

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const categories = useSelector((state) => state.products.categories);
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1); 
  const [limit] = useState(10);        

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchProducts({ category: selectedCategory, search, page, limit }));
  };

  const handleSelect = (category) => {
    const lowerCaseCategory = category.toLowerCase();
    setSelectedCategory(lowerCaseCategory);
    dispatch(fetchProducts({ category: lowerCaseCategory, search, page, limit }));
  };

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search, page, limit }));
    dispatch(fetchCategories());
  }, [dispatch, selectedCategory, search, page, limit]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="App">
      <div className='App-header'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search products...'
            className='search-input'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CategoryDropdown categories={categories} onSelect={handleSelect} />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='App-body'>
        {status === 'loading' && <p className="loading-products">Loading products</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && products.length === 0 && <p className="no-products">No products found.</p>}
        {status === 'succeeded' && products.length > 0 && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.images} alt={product.title} className="product-image" />
                <h1 className="product-name">{product.title}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
              </div>
            ))}
          </div>
        )}

          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage} disabled={products.length < limit}>
              Next
            </button>
          </div>

      </div>
      </div>

  );
};

export default App;
