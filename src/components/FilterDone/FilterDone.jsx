import "./FilterDone.css"

const FilterDone = ({ filteredProducts }) => {
  return (
    <div className="filterDonePage">
      <div className="filterDone">
        <h1>найдено {filteredProducts} товар</h1>
      </div>
    </div>
  )
}

export default FilterDone
