/* eslint-disable quote-props */
import { catalogueActions } from "./catalogueActions";

export const catalogueInitialState = {
  // Genders
  hombre: false,
  mujer: false,
  unisex: false,
  niño: false,
  niña: false,
  bebe: false,

  // Colors
  negro: false,
  blanco: false,
  gris: false,
  rojo: false,
  azul: false,
  amarillo: false,
  verde: false,

  // Prices
  40000: false,
  50000: false,
  70000: false,
  80000: false,
};

export function CatalogueReducer(state, action) {
  switch (action.type) {
    case catalogueActions.CHECK_OPTION:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}
