import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import itemsData from "../Data/items.json";
import Item from "./item";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from "react-bootstrap";

function Home() {
  // Sorting options for dropdown
  const options = [
    "price from lowest to highest",
    "price from highest to lowest",
  ];
  const defaultOption = options[0];

  // State for items and filtering/sorting options
  const [items, setItems] = useState(itemsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOption, setSortOption] = useState(defaultOption);
  const [sortedItems, setSortedItems] = useState(itemsData);

  // Reference for range input
  const range = useRef();
  let rangedItems;

  // Use useEffect to handle side effects after state updates
  useEffect(() => {
    filterAndSortAndRangeItems(searchQuery, sortOption, priceRange);
  }, [searchQuery, sortOption, priceRange]);

  // Handle input change for search bar
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting option change
  const handleSort = (e) => {
    setSortOption(e.value);
  };

  // Handle range input change
  const handleRange = () => {
    setPriceRange(range.current.value);
  };

  // Function to filter, sort, and range items
  const filterAndSortAndRangeItems = (searchTerm, sortOption, priceRange) => {
    let filteredResults = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceRange > 0) {
      rangedItems = filteredResults.filter((i) => i.price <= priceRange);
    } else {
      rangedItems = filteredResults;
    }

    switch (sortOption) {
      case "price from lowest to highest":
        rangedItems.sort((a, b) => a.price - b.price);
        break;
      case "price from highest to lowest":
        rangedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedItems(rangedItems);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {/* Search bar */}
          <label className="form-label">Search items:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search items..."
          />

          {/* Range input */}
          <label className="form-label">Price Range:</label>
          <input
            type="range"
            ref={range}
            onChange={handleRange}
            step={1}
            max={1000}
            className="form-range mb-3"
          />
          <div className="d-flex justify-content-between">
            <span>Min: 0</span>
            <span>Max: 1000</span>
            <span>Current: {priceRange}</span>
          </div>

          {/* Sorting dropdown */}
          <label className="form-label">Sorting Options:</label>
          <Dropdown
            options={options}
            onChange={handleSort}
            value={sortOption}
            placeholder="Select an option"
          />
        </div>
      </div>

      {/* Display items */}
      <Row className=" mt-4">
        
          {sortedItems.map((prod) => (
            <Item key={prod.id} item={prod} />
          ))}
        
      </Row>
    </div>
  );
}


export default Home;
