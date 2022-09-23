import Bolsos from "./offers/Bolsos.png";
import Calzado from "./offers/Calzado.png";
import Camisetas from "./offers/Camisetas.png";
import Deportiva from "./offers/Deportiva.png";
import Blusa from "./products/Blusa.png";
import Camisa from "./products/Camisa.png";
import Corbata from "./products/Corbata.png";
import Pantalon from "./products/Pantalon.png";
import Pantaloneta from "./products/Pantaloneta.png";
import Zapatos from "./products/Zapatos.png";
import HeaderBackground from "./header.png";

/**
 * Obtiene la imagen del producto dependiendo de su nombre
 */
const getProductImage = (productName) => {
  switch (productName) {
    case "Blusa":
      return Blusa;
    case "Camisa":
      return Camisa;
    case "Corbata":
      return Corbata;
    case "Pantalon":
      return Pantalon;
    case "Pantaloneta":
      return Pantaloneta;
    case "Zapatos":
      return Zapatos;
    default:
      return null;
  }
};

export {
  Bolsos,
  Calzado,
  Camisetas,
  Deportiva,
  Blusa,
  Camisa,
  Corbata,
  Pantalon,
  Pantaloneta,
  Zapatos,
  HeaderBackground,
  getProductImage,
};
