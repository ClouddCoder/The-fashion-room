// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CustomRoutes from "../routes/CustomRoutes";

import {
  authContextProps,
  productContextProps,
  productProductContextProps,
  productProps,
} from "./mockedData";

import AuthContext from "../context/auth-context/AuthContext";
import ProductContext from "../context/product-context/ProductContext";

// This component is used to wrap the routes and test wheter the components are rendered
export function GlobalContext({ children }) {
  return (
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>{children}</ProductContext.Provider>
    </AuthContext.Provider>
  );
}

const routes = [
  "/login",
  "/catalogue/calzado",
  "/store-contact",
  "/store-info",
  "/home",
  "/invoice",
  "/product/656589",
  "/phone",
  "/my-data",
  "/edit-data/name",
  "/address",
  "/edit-data/new",
  "/edit-password",
];

// Renders login component
export function LoginTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 0,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Catalogue component with category of calzado
export function CatalogueTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 1,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Store component
export function StoreContactTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 2,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Store info component
export function StoreInfoTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 3,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Home component.
export function HomeTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 0,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Invoice component.
export function InvoiceTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 5,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Navbar component.
export function NavbarTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 0,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Footer component.
export function FooterTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 0,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <RouterProvider router={router} />
    </AuthContext.Provider>,
  );
}

// Renders Product component.
export function ProductTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 6,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Phone component.
export function PhoneTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 7,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders MyData component.
export function MyDataTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 8,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders EditData component.
export function EditDataTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 9,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Address component
export function AddressTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 10,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders EditAddress component.
export function EditAddressTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 11,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders EditPassword component.
export function EditPasswordTest() {
  const router = createMemoryRouter(CustomRoutes(), {
    initialEntries: routes,
    initialIndex: 12,
  });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}
