import { Route, createRoutesFromElements } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import MyData from "../pages/my-data/MyData";
import Phone from "../pages/phone/Phone";
import EditData from "../pages/edit-data/EditData";
import Address from "../pages/address/Address";
import EditAddress from "../pages/edit-address/EditAddress";
import EditPassword from "../pages/edit-password/EditPassword";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Catalogue from "../pages/catalogue/Catalogue";
import Product from "../pages/product/Product";
import ShoppingCart from "../pages/shopping-cart/ShoppingCart";
import Wishlist from "../pages/wishlist/Wishlist";
import StoreContact from "../pages/store-contact/StoreContact";
import Buy from "../pages/buy/Buy";
import Invoice from "../pages/invoice/Invoice";
import Orders from "../pages/orders/Orders";

function CustomRoutes() {
  return createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-data" element={<MyData />} />
      <Route path="/phone" element={<Phone />} />
      <Route path="/edit-data/:info" element={<EditData />} />
      <Route path="/address" element={<Address />} />
      <Route path="/edit-address/:addressId" element={<EditAddress />} />
      <Route path="/edit-password" element={<EditPassword />} />
      <Route path="/store-contact" element={<StoreContact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/catalogue/:category" element={<Catalogue />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/buy" element={<Buy />} />
    </>,
  );
}

export default CustomRoutes;
