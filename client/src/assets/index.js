import HeaderCover from "./header3.jpg";
import Bolsos from "./offers/bolsos.png";
import Calzado from "./offers/calzado.png";
import Camisetas from "./offers/camisetas.png";
import Deportiva from "./offers/deportiva.png";
import bmNegrosHombre from "./products/bm-negros-hombre.jpg";
import bmVerdesHombre from "./products/bm-verdes-hombre.jpg";
import bolsoNegroMujer from "./products/bolso-negro-mujer.jpg";
import camisetaAmarillaHombre from "./products/camiseta-amarilla-hombre.jpg";
import camisetaBlancaMujer from "./products/camiseta-blanca-mujer.jpg";
import camisetaBlancaNiña from "./products/camiseta-blanca-niña.jpg";
import camisetBlancaNiño from "./products/camiseta-blanca-niño.jpg";
import camisetaDeportivaAzulMujer from "./products/camiseta-deportiva-azul-mujer.jpg";
import camisetaDeportivaBlancaHombre from "./products/camiseta-deportiva-blanca-hombre.jpg";
import camisetaDeportivaNegraHombre from "./products/camiseta-deportiva-negra-hombre.jpg";
import camisetaDeportivaVerdeMujer from "./products/camiseta-deportiva-verde-mujer.jpg";
import camisetaNegraHombre from "./products/camiseta-negra-hombre.jpg";
import camisetaNegraMujer from "./products/camiseta-negra-mujer.jpg";
import camisetaNegraNiño from "./products/camiseta-negra-niño.jpg";
import camisetaRojaMujer from "./products/camiseta-roja-mujer.jpg";
import camisetaRojaNiña from "./products/camiseta-roja-niña.jpg";
import camisetaVerdeHombre from "./products/camiseta-verde-hombre.jpg";
import guantesEntrenamientoNegrosMujer from "./products/guantes-entrenamiento-negros-mujer.jpg";
import maletaMorralAzuñNiño from "./products/maleta-morral-azul-niño.jpg";
import maletaMorralNegraHombre from "./products/maleta-morral-negra-hombre.jpg";
import pNegrasNiño from "./products/p-negras-niño.jpg";
import pRojasNiña from "./products/p-rojas-niña.jpg";
import sAzulesMujer from "./products/s-azules-mujer.jpg";
import sVerdesNiña from "./products/s-verdes-niña.jpg";
import tAzulesHombre from "./products/t-azules-hombre.jpg";
import tgAmarillosMujer from "./products/tg-amarillos-mujer.jpg";
import tgVerdesHombre from "./products/tg-verdes-hombre.jpg";
import tNegrosHombre from "./products/t-negros-hombre.jpg";
import tsNegrosNiño from "./products/ts-negros-niño.jpg";

/**
 * Obtiene la imagen del producto dependiendo de su nombre
 */
const getProductImage = (productName) => {
  switch (productName) {
    case "header-cover":
      return HeaderCover;
    case "bolsos":
      return Bolsos;
    case "calzado":
      return Calzado;
    case "camisetas":
      return Camisetas;
    case "deportiva":
      return Deportiva;
    case "bm-negros-hombre":
      return bmNegrosHombre;
    case "bm-verdes-hombre":
      return bmVerdesHombre;
    case "bolso-negro-mujer":
      return bolsoNegroMujer;
    case "camiseta-amarilla-hombre":
      return camisetaAmarillaHombre;
    case "camiseta-blanca-mujer":
      return camisetaBlancaMujer;
    case "camiseta-blanca-niña":
      return camisetaBlancaNiña;
    case "camiseta-blanca-niño":
      return camisetBlancaNiño;
    case "camiseta-deportiva-azul-mujer":
      return camisetaDeportivaAzulMujer;
    case "camiseta-deportiva-blanca-hombre":
      return camisetaDeportivaBlancaHombre;
    case "camiseta-deportiva-negra-hombre":
      return camisetaDeportivaNegraHombre;
    case "camiseta-deportiva-verde-mujer":
      return camisetaDeportivaVerdeMujer;
    case "camiseta-negra-hombre":
      return camisetaNegraHombre;
    case "camiseta-negra-mujer":
      return camisetaNegraMujer;
    case "camiseta-negra-niño":
      return camisetaNegraNiño;
    case "camiseta-roja-mujer":
      return camisetaRojaMujer;
    case "camiseta-roja-niña":
      return camisetaRojaNiña;
    case "camiseta-verde-hombre":
      return camisetaVerdeHombre;
    case "guantes-entrenamiento-negros-mujer":
      return guantesEntrenamientoNegrosMujer;
    case "maleta-morral-azul-niño":
      return maletaMorralAzuñNiño;
    case "maleta-morral-negra-hombre":
      return maletaMorralNegraHombre;
    case "p-negras-niño":
      return pNegrasNiño;
    case "p-rojas-niña":
      return pRojasNiña;
    case "s-azules-mujer":
      return sAzulesMujer;
    case "s-verdes-niña":
      return sVerdesNiña;
    case "t-azules-hombre":
      return tAzulesHombre;
    case "tg-amarillos-mujer":
      return tgAmarillosMujer;
    case "tg-verdes-hombre":
      return tgVerdesHombre;
    case "t-negros-hombre":
      return tNegrosHombre;
    case "ts-negros-niño":
      return tsNegrosNiño;
    default:
      return null;
  }
};

export { getProductImage };
