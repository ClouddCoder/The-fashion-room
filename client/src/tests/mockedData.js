// AuthContext props for testing components.
export const authContextProps = {
  auth: true,
  setAuth: jest.fn(),
  userId: 1,
  setUserId: jest.fn(),
  user: "user",
  setUser: jest.fn(),
  userName: "user",
  setUserName: jest.fn(),
  userLastname: "user",
  setUserLastname: jest.fn(),
  userEmail: "user@user.com",
  setUserEmail: jest.fn(),
  userPassword: "1234",
  setUserPassword: jest.fn(),
  token: "1234",
  setToken: jest.fn(),
};

// products for testing catalogue component.
export const mockProducts = [
  {
    product_id: "656589",
    product_name: "Blusa",
    gender_value: "mujer",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "656804",
    product_name: "Camisa",
    gender_value: "hombre",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657019",
    product_name: "Corbata",
    gender_value: "hombre",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657234",
    product_name: "Pantalon",
    gender_value: "mujer",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657449",
    product_name: "Pantaloneta",
    gender_value: "niño",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657664",
    product_name: "tenis-colegial",
    gender_value: "niña",
    product_price: "45000",
    product_stock: "100",
  },
];

// product' variants for testing product component.
export const mockProductVariants = [
  {
    variant_id: 1,
    product_id: 656589,
    variant_name: "blusa-negra-mujer",
    variant_price: 50000,
    variant_quantity: 10,
    gender_value: "mujer",
    color_id: 1,
    color_value: "negro",
  },
  {
    variant_id: 2,
    product_id: 656589,
    variant_name: "blusa-blanca-mujer",
    variant_price: 60000,
    variant_quantity: 10,
    gender_value: "mujer",
    color_id: 2,
    color_value: "blanco",
  },
  {
    variant_id: 3,
    product_id: 656589,
    variant_name: "blusa-roja-mujer",
    variant_price: 55000,
    variant_quantity: 50,
    gender_value: "mujer",
    color_id: 4,
    color_value: "rojo",
  },
];

// ProductContext props for testing components.
export const productContextProps = {
  addProductToCart: jest.fn(),
  loadProducts: jest.fn(),
  getProductVariants: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProducts,
  variants: mockProductVariants,
  wishlist: [],
  getWishlist: jest.fn(),
  handleWish: jest.fn(),
  resetProductState: jest.fn(),
};

export const productProps = {
  cart: mockProducts,
  totalPrice: 45000,
  clearCart: jest.fn(),
  invoiceId: 1,
};

// ProductContext props for testing Product component.
export const productProductContextProps = {
  addProductToCart: jest.fn(),
  loadProducts: jest.fn(),
  getProductVariants: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProducts,
  variants: mockProductVariants,
  wishlist: [],
  getWishlist: jest.fn(),
  resetProductState: jest.fn(),
};

export const mockStores = [
  { store_nit: 1, store_name: "Tienda 1", store_address: "Calle 1" },
  { store_nit: 2, store_name: "Tienda 2", store_address: "Calle 2" },
  { store_nit: 3, store_name: "Tienda 3", store_address: "Calle 3" },
];

export const mockStorePhone = [
  { store_nit: 1, phone_number: "123456789" },
  { store_nit: 2, phone_number: "987654321" },
  { store_nit: 3, phone_number: "547897884" },
];

export const mockCustomers = [
  {
    customer_id: 1,
    customer_name: "carlos",
    customer_lastname: "vargas",
    customer_email: "carlos",
    customer_password: "1234",
  },
  {
    customer_id: 2,
    customer_name: "luna",
    customer_lastname: "cortes",
    customer_email: "luna",
    customer_password: "12345",
  },
];

export const mockUserPhone = [
  {
    phone_id: 1,
    phone_number: "123456789",
  },
  {
    phone_id: 2,
    phone_number: "987654321",
  },
];
