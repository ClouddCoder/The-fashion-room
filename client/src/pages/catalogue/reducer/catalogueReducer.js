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
  sinGenero: false,
  niños: false,
  niñas: false,
  bebes: false,
  calzado: false,
  camisetas: false,
  ropaDeportiva: false,
  bolsosYMaletas: false,
};

export function CatalogueReducer(state, action) {
  switch (action.type) {
    case catalogueActions.CHECK_OPTION:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}
