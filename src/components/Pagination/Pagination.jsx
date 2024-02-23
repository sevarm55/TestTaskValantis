import "./Pagination.css"

const Pagination = ({ itemsPage, totalItems, paginate }) => {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalItems / itemsPage) },
    (_, index) => index + 1
  )

  return (
    <div className="pagination">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className="page-item">
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
