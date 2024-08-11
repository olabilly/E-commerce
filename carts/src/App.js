import React, { useState, useEffect, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faRemove, faCartPlus, faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination/Pagination';
import PayStack from './PayStack';
import './App.css';
import Slider from "react-slick";


function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return savedCart;
  });
  const [cartCount, setCartCount] = useState(() => {
    const savedCartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;
    return savedCartCount;
  });
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const [searchIcon, setSearchIcon] = useState({display:'block'});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [onClick, setClick] = useState(true);




  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fadeIn: true,
    fadeOut: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 7000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 7000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 7000,
        }
      }
    ]
  }

  useEffect(() => {
    document.title = "Yaracart Home | Select the product you want to buy";
 }, []);

  // Update localStorage when cart or cartCount changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cart, cartCount]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const products = [
    { id: 1, name: 'Nike', price: 190, category: 'Clothing', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg' },
    { id: 2, name: 'Samsung Galaxy S20', price: 320, category: 'Electronics', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg' },
    { id: 3, name: 'Adidas', price: 220, category: 'Shoes', image: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg' },
    { id: 4, name: 'Apoti', price: 40, category: 'Furnitures', image: 'https://images.pexels.com/photos/396684/pexels-photo-396684.jpeg' },
    { id: 5, name: 'Michael Kors', price: 180, category: 'Bags', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { id: 6, name: 'Diamond Cuba Bracelet', price: 420, category: 'Jewellery', image: 'https://images.pexels.com/photos/533217/pexels-photo-533217.jpeg' },
    { id: 7, name: 'Rolex Submariner', price: 620, category: 'Watches', image: 'https://images.pexels.com/photos/277668/pexels-photo-277668.jpeg' },
    { id: 8, name: 'Samsung TV 55 inch', price: 620, category: 'Electronics', image: 'https://images.pexels.com/photos/1445963/pexels-photo-1445963.jpeg' },
    { id: 9, name: 'Hp Compaq', price: 10, category: 'Electronics', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
    { id: 10, name: 'Printer', price: 80, category: 'Electronics', image: 'https://images.pexels.com/photos/374093/pexels-photo-374093.jpeg' },
    { id: 11, name: 'White & black TV', price: 139, category: 'Electronics', image: 'https://images.pexels.com/photos/57256/pexels-photo-57256.jpeg' },
    { id: 12, name: 'Rolex', price: 150, category: 'Watches', image: 'https://images.pexels.com/photos/15533/pexels-photo.jpg' },
    { id: 13, name: 'Diamond Cuba', price: 310, category: 'Jewellery', image: 'https://images.pexels.com/photos/958174/pexels-photo-958174.jpeg' },
    { id: 14, name: 'Iphon 15 Pro', price: 10, category: 'Electronics', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg' },
    { id: 15, name: 'LV Bag', price: 140, category: 'Bags', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { id: 16, name: 'Adidas', price: 190, category: 'Clothing', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg' },
    { id: 17, name: 'Chairs', price: 102, category: 'furnitures', image: 'https://images.pexels.com/photos/396684/pexels-photo-396684.jpeg' },
    { id: 18, name: 'Asus Phone', price: 40, category: 'Electronics', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg' },
    { id: 19, name: 'Samsung', price: 20, category: 'Electronics', image: 'https://images.pexels.com/photos/1445963/pexels-photo-1445963.jpeg' },
    { id: 20, name: 'Hp Compaq', price: 730.30, category: 'Electronics', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
    { id: 21, name: 'Mizz Kis T-Shirt', price: 34.30, category: 'Clothing', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg' },
    { id: 22, name: 'Kizz Amani', price: 60.30, category: 'Bags', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { id: 23, name: 'Apoti', price: 20.30, category: 'furnitures', image: 'https://images.pexels.com/photos/396684/pexels-photo-396684.jpeg' },
    { id: 24, name: 'Gold', price: 80.30, category: 'Jewellery', image: 'https://images.pexels.com/photos/533217/pexels-photo-533217.jpeg' },
    { id: 25, name: 'Shoes', price: 50.30, category: 'Shoes', image: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg' },
    { id: 26, name: 'Apply Watch', price: 80.30, category: 'Watches', image: 'https://images.pexels.com/photos/277668/pexels-photo-277668.jpeg' },
    { id: 27, name: 'Hp Sharp', price: 90.30, category: 'Electronics', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
    { id: 28, name: 'TM Shirt', price: 56.30, category: 'Clothing', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg' },
    { id: 29, name: 'Jordan', price: 10.80, category: 'shoes', image: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg' },
    { id: 30, name: 'Apoti Aga', price: 149.97, category: 'Furtniture', image: 'https://images.pexels.com/photos/396684/pexels-photo-396684.jpeg' },
    { id: 31, name: 'Igba nu', price: 140.30, category: 'Bags', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { id: 32, name: 'Iyeri Oge', price: 170.30, category: 'Jewellry', image: 'https://images.pexels.com/photos/533217/pexels-photo-533217.jpeg' },
    { id: 33, name: 'Oga olowo', price: 125.56, category: 'Watches', image: 'https://images.pexels.com/photos/277668/pexels-photo-277668.jpeg' },
    { id: 34, name: 'Mac Book Pro', price: 18.30, category: 'Electronics', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
    { id: 35, name: 'Native wears', price: 15.30, category: 'Clothing', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg' },
    { id: 36, name: 'Simple Wear', price: 16.90, category: 'Shoes', image: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg' },
    { id: 37, name: 'Security cheir', price: 10.43, category: 'Furnitures', image: 'https://images.pexels.com/photos/396684/pexels-photo-396684.jpeg' },
    { id: 38, name: 'Apo shaka', price: 6.30, category: 'Bags', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { id: 39, name: 'Gold & Diamond', price: 2.30, category: 'Jewellry', image: 'https://images.pexels.com/photos/533217/pexels-photo-533217.jpeg' },
    { id: 40, name: 'Gold SH', price: 1.30, category: 'Watches', image: 'https://images.pexels.com/photos/277668/pexels-photo-277668.jpeg' },
];


  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

  const itemsPerPage = 20;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
        setSearchProducts([]); // Set searchProducts to an empty array if the search term is empty
    } else {
        const filtered = filteredProducts.filter(product => product.name.toLowerCase().startsWith(term.toLowerCase()));
        setSearchProducts(filtered);
    }
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  }

  const handleInputBlur = () => {
    setIsInputActive(false);
  }

  const handleSearchIcon = () => {
    setSearchIcon(currentStyle => {
      return currentStyle.display === 'block' ? { display: 'none' } : { display: 'block' };
    });
  };
  
  const handleIncrementQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity: item.quantity + 1} : item))
  }

  const handleDecrementQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item => item.id === productId && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item))
  }

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some(item => item.id === product.id);
    if (!isProductInCart) {
      setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
      setCartCount(prevCount => prevCount + 1);
    }else{
      setCart(prevCart => prevCart.map(item => item.id ? {...item, quantity: item.quantity + 1} : item));
    }

  };

  

  const handleViewProduct = () => {
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    const totalAmount = cart.reduce((total, product) => total + (product.quantity * product.price), 0);
    const formattedTotalAmount = typeof totalAmount === 'string' ? parseFloat(totalAmount) : totalAmount;

    const formattedTotal = formattedTotalAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    return (
      <div className='CartContent'>
        <h2>Your Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})</h2>
        <table className='cart-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            
            {cart.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className='img-container'>
                    <img src={product.image} alt={product.name} />
                  </div>
                </td>
                <td style={{fontSize:'0.9rem'}}>{product.name}</td>
                <td style={{fontSize:'0.9rem'}}>${product.price * product.quantity}</td>
                <td>
                  <div className='quantity'>
                    <button className='btn-Increment' onClick={() => handleIncrementQuantity(product.id)}>+</button>
                    <p>{product.quantity}</p>
                    <button className='btn-Decrement' onClick={() => handleDecrementQuantity(product.id)}>-</button>
                  </div>
                </td>
                <td>
                  <button className='btn-remove' onClick={() => {
                     setCart(prevCart => prevCart.filter(item => item.id!== product.id));  
                     setCartCount(prevCount => prevCount - 1)}}>
                     <FontAwesomeIcon className='icons-remove' icon={faRemove} />
                  </button>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
        <div className='total-css'>
          <div className='width-check'>
              <div className='checkout-list'><p>Total Item:</p><p> {totalItems}</p></div>
              <div className='checkout-list'><p>Subtotal:</p><p>{formattedTotal}</p></div>
              <div className='checkout-list'><p>{totalAmount > 10 ? 'Free shipping' : 'Shipping Fees: $10'}
                {totalAmount > 10 && (<input type='radio' checked={totalAmount > 10} readOnly />)}
              </p></div>
              <div className='checkout-list'><p style={{ color:'#fff', fontSize: '18px', fontWeight: 'bold' }}>Total </p><p>{ totalAmount > 10 ? formattedTotal : formattedTotal + 10 } </p></div> 
          </div>
        </div>
         <div className='btn-button'>
            <button onClick={() => { setCart([]); setCartCount(0); setShowCart(false); }} className='btn-clear' >Clear Cart</button>
            <button className='btn-check' onClick={() => { setShowPaymentForm(true); setShowCart(false); } }>Check Out</button>
         </div>
      </div>
    );
  };

  const randomProduct = () => {
    // Check if the cart is not empty
    if (filteredProducts.length > 0) {
      // Generate a random index within the range of the cart array length
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      // Get the product at the random index
      const product = filteredProducts[randomIndex];
      // Return the product details
      return (
        <>
        <div className='slide-img'><img src={product.image} alt={product.name} className='img-slide' /></div>
          <p className='paragraph'>{product.name}</p> 
         <div className='prc-slide'> 
         <p>${product.price}</p> 
         
         {cart.some(item => item.id === product.id) ? (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'18px'}} />
                          </button>
                        </>
                        ) : (
                          <>
                          <button className='btn-prc' onClick={() => handleAddToCart(product)}><FontAwesomeIcon icon={faCartPlus} style={{fontSize:'18px'}} /></button>
                          </>
              )}
         </div>
        </>
      );
    } else {
      // Return a message if the cart is empty
      return <p>No products available</p>;
    }
  };

  const randomCart = () => {
    // Check if the cart is not empty
    if (products.length > 0) {
      // Generate a random index within the range of the cart array length
      const randomIndex = Math.floor(Math.random() * products.length);
      // Get the product at the random index
      const product = products[randomIndex];
      // Return the product details
      return (
        <>
          <div className='slide-img'><img src={product.image} alt={product.name} className='img-slide' /></div>
          <p className='paragraph'>{product.name}</p> 
         <div className='prc-slide'> 
         <p>${product.price}</p> 
         {cart.some(item => item.id === product.id) ? (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                        </>
                        ) : (
                          <>
                          <button className='btn-prc' onClick={() => handleAddToCart(product)}><FontAwesomeIcon icon={faCartPlus} style={{fontSize:'18px'}} /></button>
                          </>
              )}
         </div>
        </>
      );
    } else {
      // Return a message if the cart is empty
      return <p>No products available</p>;
    }
  };
  

  return (
    <>
      <div className='container'>
        <header className='header-Field'>
          <h1>Yaracart</h1>
          <div className='input-Field' style={searchIcon}>
            <input type='text' placeholder='Search...' htmlFor='search' value={searchTerm} onChange={handleSearch}  onFocus={handleInputFocus} onBlur={handleInputBlur} className='form-control' /> 
            {isInputActive && (
              <div className='search-result'>
                  {searchProducts.length === 0 && searchTerm.length > 0 && (
                    <div className='search-pnf'><p>Products not found</p></div>
                  )}
                  {searchProducts.length > 0 && (
                    <a href='#'>
                      <ul className='search-results'>
                        {searchProducts.map(product => (
                          <div key={product.id} className='search-list'>
                            <li> <img src={product.image} alt='img' /> </li>
                            <li>{product.name}</li>
                            <li>${product.price}</li>
                        </div>
                        ))}
                    </ul>
                    </a>
                  )}
              </div>
            )}
          </div><label id='search' className='label'><FontAwesomeIcon icon={faSearch} className='search-header-icon' onClick={handleSearchIcon} /></label>
          <div className='Cart-Field'>
            <FontAwesomeIcon style={{marginRight:'12px'}} icon={faShoppingCart} onClick={() => setShowCart(!showCart)} />
            <span style={{ color: cartCount !== null && cartCount !== -1 ? 'red' : 'black', position: 'absolute', top: '0',  right: '0', }}>{cartCount ? cartCount : null}</span>
            {showCart && cart.length > 0 && handleViewProduct()}
          </div>
        </header><hr />
        <div className='banner'>
            <h1>Coming Soon</h1>
        </div>
        {showPaymentForm ? ( <PayStack cart={cart} /> ) : null } 
        < hr />
        <Slider {...settings} className='slider-banner'>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomProduct()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomProduct()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomProduct()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomProduct()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomCart()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomCart()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomCart()}</h3>
            </div>
            <div className='slide-border'>
              <h3 style={{ width:'100%', margin:'0'}}>{randomCart()}</h3>
            </div>
          </Slider>
< hr />
        <main className='main-Field'>
          <aside className='aside-field'>
            <h2>Categories</h2>
            <div className='box-field'>
              <div className='box'><input type='radio' id='All' checked={selectedCategory === 'All'} onChange={() => handleCategoryChange('All')} /><label htmlFor='All'>All</label></div>
              <div className='box'><input type='radio' id='Electronics' checked={selectedCategory === 'Electronics'} onChange={() => handleCategoryChange('Electronics')} /> <label htmlFor='Electronics'>Electronics</label></div>
              <div className='box'><input type='radio' id='Clothing' checked={selectedCategory === 'Clothing'} onChange={() => handleCategoryChange('Clothing')} /><label htmlFor='Clothing'>Clothing</label></div>
              <div className='box'><input type='radio' id='Shoes' checked={selectedCategory === 'Shoes'} onChange={() => handleCategoryChange('Shoes')} /><label htmlFor='Shoes'>Shoes</label></div>
              <div className='box'><input type='radio' id='Furnitures' checked={selectedCategory === 'Furnitures'} onChange={() => handleCategoryChange('Furnitures')} /><label htmlFor='Furnitures'>Furnitures</label></div>
              <div className='box'><input type='radio' id='Bags' checked={selectedCategory === 'Bags'} onChange={() => handleCategoryChange('Bags')} /><label htmlFor='Bags'>Bags</label></div>
              <div className='box'><input type='radio' id='Jewellery' checked={selectedCategory === 'Jewellery'} onChange={() => handleCategoryChange('Jewellery')} /><label htmlFor='Jewellery'>Jewellery</label></div>
              <div className='box'><input type='radio' id='Watches' checked={selectedCategory === 'Watches'} onChange={() => handleCategoryChange('Watches')} /><label htmlFor='Watches'>Watches</label></div>
            </div>
          </aside>
          <div className='content-field'>
            {currentProducts.map(product => (
              <div className='box-head' key={product.id}>
                <div className='box-img'>
                  <img src={product.image} alt='img' />
                  <div className='box-content'>
                    <p className='paragraph' title={product.name}>{product.name}</p>
                    <div className='icons-content'><span><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></span></div>
                    <div className='box-price'>
                      <span>${product.price}</span>
                      {cart.some(item => item.id === product.id) ? (
                        <>
                          <button className='btn-checked'>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                        </>
                        ) : (
                          <>
                          <button onClick={() => handleAddToCart(product)} >
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                          </>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Pagination 
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      </div>
      <footer>
        <div className='footer-field'>
            <div className='footer-box'>
              <h5>Find Us</h5>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, quidem.</p>
              <p>secureparcel@yaracart.com</p>
              <p>555-655-6452</p>
            </div>
            <div className='footer-box'>
              <h5>Quick Link</h5>
              <ul>
                <li><a href='#'>About Us</a></li>
                <li><a href='#'>Contact Us</a></li>
                <li><a href='#'>Privacy Policy</a></li>
                <li><a href='#'>Terms & Conditions</a></li>
              </ul>
            </div>
            <div className='footer-box'>
              <h5>Follow Us</h5>
              <ul>
                <li><a href='#'>About Us</a></li>
                <li><a href='#'>Contact Us</a></li>
                <li><a href='#'>Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
        </div>
        <p>Yaracart &copy; Copyright 2024 | Designed by <a href='#'>CWB</a> </p>
      </footer>
    </>
  );
}

export default App;
