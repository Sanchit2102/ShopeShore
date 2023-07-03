import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import CreateCategory from "./pages/admin/CreateCategory";
import CategoryProducts from "./pages/CategoryProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import Product from "./pages/admin/Products";
import ProductDetails from "./pages/ProductDetail";
import Search from "./pages/Search";
import UpdateProduct from "./pages/admin/UpdateProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/user/Dashboard";
import About from "./pages/Footer Pages/About";
import Contact from "./pages/Footer Pages/Contact";
import Policy from "./pages/Footer Pages/Policy";
import PageNoteFound from "./pages/PageNoteFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        {/* Product Routes */}
        <Route
          path="/category/:category/:categoryId"
          element={<CategoryProducts />}
        />
        <Route path="/:category/product/:slug" element={<ProductDetails />} />

        {/* cart page */}
        <Route path="/cart" element={<CartPage />} />

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Private Routes   */}

        {/* user route */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* admin route */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        {/* Footer Route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
    </>
  );
}

export default App;
