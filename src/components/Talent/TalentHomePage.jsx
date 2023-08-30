import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./UsersHomePage.css";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";



const UsersHomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await index.search("", { hitsPerPage: 1000 });
        setData(response.hits);
        setFilteredData(response.hits);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const renderRangeProducts = (minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) {
      setFilteredData(data);
    } else {
      const filteredProducts = data.filter((product) => {
        if (minPrice && maxPrice) {
          return product.price >= minPrice && product.price <= maxPrice;
        } else if (minPrice) {
          return product.price >= minPrice;
        } else if (maxPrice) {
          return product.price <= maxPrice;
        }
      });
      setFilteredData(filteredProducts);
    }
  };

  const filterProducts = (searchQuery) => {
    index
      .search(searchQuery)
      .then((response) => {
        setFilteredData(response.hits);
      })
      .catch((error) => {
        console.error("Error fetching products from Algolia:", error);
      });
  };

  const sortProducts = (sortBy) => {
    let sortedProducts = [...filteredData];
    switch (sortBy) {
      case "price:a-b":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price:b-a":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "a-z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sortedProducts = [...data];
        break;
    }
    setFilteredData(sortedProducts);
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.id === product.objectID
    );
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.objectID) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [
        ...cartItems,
        { ...product, quantity: 1, id: product.objectID },
      ];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    alert("Product added to cart!");
  };

  const Hit = ({ hit }) => {
    return (
      <CSSTransition classNames="fade" timeout={300}>
        <div className="hit-item">
          <div className="hit-item-img">
            <img src={hit.image} alt={hit.title} />
          </div>
          <div className="hit-item-title">
            <h6>{hit.title}</h6>
            <p style={{ fontSize: "14px" }}>{hit.description}</p>
            <div className="hit-item-price-div">
              <h5>Price: ${hit.price}</h5>
              <button
                className="home-page-button-two"
                onClick={() => addToCart(hit)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  };

  return (
    <div className="container">
      <UserNavbar />
      <Row>
        <Col
          sm={4}
          className="filter-col"
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <div className="filter-bar" style={{ marginBottom: "20px" }}>
            <div className="filter-group">
              <label style={{ marginBottom: "10px", display: "block" }}>
                Filter by Price:
              </label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <br />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <br />
              <button
                className="home-page-button"
                onClick={() => renderRangeProducts(minPrice, maxPrice)}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
            <div className="filter-group">
              <label style={{ marginBottom: "10px", display: "block" }}>
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  width: "80%",
                }}
              >
                <option value="">None</option>
                <option value="price:a-b">Price: Low to High</option>
                <option value="price:b-a">Price: High to Low</option>
                <option value="a-z"> A to Z</option>
                <option value="z-a"> Z to A</option>
              </select>
              <br />
              <button
                className="home-page-button"
                onClick={() => sortProducts(sortBy)}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  borderRadius: "4px",
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </Col>
        <Col sm={8}>
          <div className="search-bar">
            <InstantSearch
              searchClient={algoliaClient}
              indexName="STAR SHOPPER"
              onSearchStateChange={({ query }) => filterProducts(query)}
            >
              <SearchBox
                className="search-input"
                translations={{ placeholder: "Search for products..." }}
              />
            </InstantSearch>
          </div>
          <div className="products">
            <TransitionGroup className="product-list">
              {filteredData.map((product) => (
                <CSSTransition
                  key={product.objectID}
                  classNames="fade"
                  timeout={300}
                >
                  <div className="product-item">
                    <img src={product.image} alt={product.title} />
                    <div className="product-details">
                      <h6>{product.title}</h6>
                      <p>{product.description}</p>
                      <div className="product-price-div">
                        <h5>Price: ${product.price}</h5>
                        <button
                          className="home-page-button-two"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UsersHomePage;
