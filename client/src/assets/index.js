import Bolsos from "./offers/bolsos.png";
import Calzado from "./offers/calzado.png";
import Camisetas from "./offers/camisetas.png";
import Deportiva from "./offers/deportiva.png";
import Blusa from "./products/blusa.png";
import Camisa from "./products/camisa.png";
import Corbata from "./products/corbata.png";
import Pantalon from "./products/pantalon.png";
import Pantaloneta from "./products/pantaloneta.png";
import Zapatos from "./products/zapatos.png";
import HeaderBackground from "./header.png";

/**
 * Obtiene la imagen del producto dependiendo de su nombre
 */
const getProductImage = (productName) => {
  switch (productName) {
    case "bolsos":
      return Bolsos;
    case "calzado":
      return Calzado;
    case "camisetas":
      return Camisetas;
    case "deportiva":
      return Deportiva;
    case "blusa":
      return Blusa;
    case "camisa":
      return Camisa;
    case "corbata":
      return Corbata;
    case "pantalon":
      return Pantalon;
    case "pantaloneta":
      return Pantaloneta;
    case "zapatos":
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
