import { createHashRouter } from "react-router-dom";
import CustomRoutes from "./CustomRoutes";

/**
 * Componente que establece las rutas de la aplicacion
 */
export const router = createHashRouter(CustomRoutes(), {
  basename: "/",
});
