import { useEffect, useState } from "react"
import "./Filter.css"
import FilterDone from "../FilterDone/FilterDone"

const Filter = ({ products, setFilteredProducts,filteredProducts }) => {
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [showFilterDone, setShowFilterDone] = useState(false);
  const [filterRange, setFilterRange] = useState("");


  useEffect(() => {
    setTimeout(() => {
      setShowFilterDone(false)
    }, 1900);

    return () => clearTimeout()
  },[showFilterDone])
  

  const handleFilter = () => {
    const filteredProducts = products.filter((product) =>
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice)
    )
    setFilteredProducts(filteredProducts)
    setShowFilterDone(true);
    setMaxPrice("")
    setMinPrice("")
    if (minPrice && maxPrice) {
      setFilterRange(`От ${minPrice} до ${maxPrice}`);
    }
  }

  const handleClearFilter = () => {
    setFilteredProducts(products);
    setFilterRange(""); 
  };

  return (
    <div className="filter">
      <div className="filter_left">
        <h1>Список Продуктов</h1>
        {filterRange && (
          <div className="result">
            <span>{filterRange}</span>
            <p onClick={handleClearFilter}>x</p>
          </div>
        )}
      </div>
      <div className="filter_right">
        <input
          type="text"
          placeholder="Минимальная цена"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Максимальная цена"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleFilter}>Фильтровать</button>
      </div>
      {showFilterDone && <FilterDone filteredProducts={filteredProducts} />}
      
    </div>
  )
}

export default Filter
