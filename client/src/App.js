import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthState from "./context/auth-context/AuthState";
import ProductState from "./context/product-context/ProductState";

function App() {
  return (
    <div id="app">
      <AuthState>
        <ProductState>
          <RouterProvider router={router} />
        </ProductState>
      </AuthState>
    </div>
  );
}

export default App;
