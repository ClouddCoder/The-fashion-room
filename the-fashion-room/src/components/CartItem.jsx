import React from "react";

function CartItem({ product, removeFromCart }) {
  return (
    <div>
      <div>CartItem {product.quantityInCart}</div>
      <button onClick={() => removeFromCart(product.product_id)}>Eliminar uno</button>
      <br />
      <button onClick={() => removeFromCart(product.product_id, true)}>Eliminar todos</button>
    </div>
  );
}

export default CartItem;
