import { useEffect, useState } from "react"
import { getIds, getItems, generateAuthString } from "./api/sendRequest"

import "./App.css"
import Products from "./components/Products/Products"
import Loading from "./pages/Loading/Loading"
import Pagination from "./components/Pagination/Pagination"
import Filter from "./components/Filter/Filter"

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPage] = useState(50)

  const indexOfLastItem = currentPage * itemsPage
  const indexOfFirstItem = indexOfLastItem - itemsPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageName) => setCurrentPage(pageName)

  useEffect(() => {
    async function fetchData() {
      try {
        const password = "Valantis"
        const authString = generateAuthString(password)

        const idsResponse = await getIds(0, 301, authString)
        const productsResponse = await getItems(idsResponse.result, authString)

        const uniqueProducts = productsResponse.result.filter(
          (product, index, self) =>
            index === self.findIndex((t) => t.id === product.id)
        )

        setProducts(uniqueProducts)
        setFilteredProducts(uniqueProducts)
      } catch (error) {
        console.error("Ошибка:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      {isLoading ? (
        <div className="loadingPage">
          <Loading />
        </div>
      ) : (
        <>
          <Filter
            setCurrentPage={setCurrentPage}
            products={products}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts.length}
          />
          <div className="productsPage">
            {currentItems.map((product, index) => (
              <Products
                product={product}
                index={index + indexOfFirstItem}
                key={product.id}
              />
            ))}
          </div>
          <Pagination
            itemsPage={itemsPage}
            totalItems={filteredProducts.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  )
}

export default App
