import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SignInButton, useAuth } from "@clerk/clerk-react";

import {
  SignedIn,
  SignedOut,
  SignIn, SignUp,
  RedirectToSignIn
} from "@clerk/clerk-react";

import { SyncUser } from "./components/Sync-User";
import { AdminRoute } from "./routes/AdminRoute";

import Navbar from "./components/common/Header";
import Footer from "./components/common/Footer";

// Public routes
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TnC from "./pages/TnC";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CustomerCare from "./pages/CustCare.jsx";
import Certification from "./pages/Certification.jsx";

// private routes
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import MyOrder from "./pages/MyOrder"
import Feedback from "./pages/Feedback"
import Dashboard from "./Admin/Dashboard";
import ProductUploadForm from "./Admin/ProductUpload.jsx";
import Products from "./Admin/Products.jsx";
import UpdateProductForm from "./Admin/UpdateProduct.jsx";
import AllOrders from "./Admin/AllOrders.jsx";

import { useUserStore } from "./context/useUserStore.js";
import OrderSummaryPage from "./pages/OrderSummaryPage.jsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const userData = useUserStore((state) => state.userData);
  const { getToken } = useAuth();
  const token = getToken();
  // console.log("token :",token);
  return (
    <>
      <Navbar userData={userData} />
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms&conditions" element={<TnC />} />
        <Route path="/privacy-policies" element={<PrivacyPolicy />} />
        <Route path="/feedback-form" element={<Feedback />} />
        <Route path="/customer-care" element={<CustomerCare/>} />
        <Route path="/certification" element={<Certification />} />

        {/* Clerk Auth Routes */}
        <Route
          path="/sign-in"
          element={
            <div className="flex justify-center items-center min-h-screen">
              <SignIn routing="path" path="/sign-in" />
            </div>
          }
        />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/cart"
          element={
            <>
              <SignedIn>
                <Cart />
              </SignedIn>
              <SignedOut mode="modal">
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/order-summary"
          element={
            <>
              <SignedIn>
                <OrderSummaryPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <SignedIn>
                <MyOrder />
              </SignedIn>
              <SignedOut mode="modal">
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>

            </>
          }
        />

        {/* Admin Protected Route */}

        <Route path="/admin/dashboard" element={
          <>
            <SignedIn>
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />

        <Route path="/admin/upload-product" element={
          <>
            <SignedIn>
              <AdminRoute>
                <ProductUploadForm />
              </AdminRoute>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />

        <Route path="/admin/all-products" element={
          <>
            <SignedIn>
              <AdminRoute>
                <Products />
              </AdminRoute>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/admin/all-orders" element={
          <>
            <SignedIn>
              <AdminRoute>
                <AllOrders />
              </AdminRoute>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />

        <Route path="/admin/update-product/:id" element={
          <>
            <SignedIn>
              <AdminRoute>
                <UpdateProductForm />
              </AdminRoute>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />


        {/* Optional: 404 Page */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </>
  );
}



export default App;
