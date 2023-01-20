import Button from "@mui/material/Button";

/**
 * Checks if there are products in the shopping cart to enable
 * the Buy button.
 * @returns {JSX.Element} - Button component.
 */
function BuyButton({ checkCart, buyCart }) {
  if (checkCart.length > 0) {
    return (
      <Button variant="contained" color="primary" onClick={buyCart} fullWidth>
        Comprar
      </Button>
    );
  }
  return <h6>Carrito vacío</h6>;
}

export default BuyButton;
