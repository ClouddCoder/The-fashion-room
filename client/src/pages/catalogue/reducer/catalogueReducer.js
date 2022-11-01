import { catalogueActions } from "./catalogueActions";

export const catalogueInitialState = {
  blusa: false,
  camisa: false,
  corbata: false,
  pantalon: false,
  pantaloneta: false,
  zapatos: false,
  hombre: false,
  mujer: false,
  unisex: false,
  niño: false,
  niña: false,
  bebe: false,
  calzado: false,
  camisas: false,
  camisetas: false,
  blusas: false,
  deportiva: false,
  bolsos: false,
};

export function CatalogueReducer(state, action) {
  switch (action.type) {
    case catalogueActions.CHECK_OPTION:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}
