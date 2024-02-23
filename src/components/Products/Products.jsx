import "./Products.css"

const Products = ({ product,index }) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <span>{++index}</span>
        <h2 className="product-name">{product.product}</h2>
        <p className="product-price">Цена: {product.price}$</p>
        <p className="product-brand">Бренд: {product.brand}</p>
      </div>
    </div>
  )
}

export default Products
