import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { router } from "./routes";
import AuthState from "./context/auth-context/AuthState";
import ProductState from "./context/product-context/ProductState";

// Default font family to MUI components.
const theme = createTheme({
  typography: {
    fontFamily: ["Source Sans Pro"].join(","),
  },
});

function App() {
  return (
    <div id="app">
      <AuthState>
        <ProductState>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </ProductState>
      </AuthState>
    </div>
  );
}

export default App;
