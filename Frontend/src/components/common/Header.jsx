// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import { User, Menu, X, ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useUserStore } from "../../context/useUserStore";

// const Navbar = ({ userData }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   // const itemCount=useUserStore().cart.products.length >0 ?  ;
//   // console.log("user stored cart : ",itemCount);
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <SignedIn>
//         {userData?.role === "admin" ? (
//           // ADMIN NAVBAR
//           <>
//             <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//               <Link to="/" className="flex items-center">
//                 <img src="/Sanco.png" alt="Logo" className="h-16 w-auto" />
//               </Link>
//               <div className="hidden md:flex items-center space-x-7 text-[17px]">
//                 <Link to="/">Dashboard</Link>
//                 <Link to="/admin/all-products">Products</Link>
//                 <Link to="/admin/upload-product">Create Product</Link>
//                 <Link to="/admin/all-orders">All Orders</Link>
//                 <Link to="/users">All Users</Link>
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//               <div className="md:hidden">
//                 <button onClick={toggleMobileMenu}>
//                   {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                 </button>
//               </div>
//             </div>
//             {isMobileMenuOpen && (
//               <div className="md:hidden px-4 pb-4 space-y-3 text-[16px]">
//                 <Link to="/">Dashboard</Link>
//                 <Link to="/admin/all-product">Products</Link>
//                 <Link to="/admin/upload-products">Create Product</Link>
//                 <Link to="/admin/all-orders">All Orders</Link>
//                 <Link to="/users">All Users</Link>
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//             )}
//           </>
//         ) : (
//           // LOGGED-IN USER NAVBAR
//           <>
//             <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//               <Link to="/" className="flex items-center">
//                 <img src="/Sanco.png" alt="Logo" className="h-16 w-auto" />
//               </Link>
//               <div className="hidden md:flex items-center space-x-7 text-[17px]">
//                 <Link to="/">Home</Link>
//                 <Link to="/shop">Shop</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/orders">My Orders</Link>
//                 <Link to="/cart" className="relative">
//                   <ShoppingCart className="w-5 h-5" />
//                   {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">{itemCount}</span> */}
//                 </Link>
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//               <div className="md:hidden">
//                 <button onClick={toggleMobileMenu}>
//                   {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                 </button>
//               </div>
//             </div>
//             {isMobileMenuOpen && (
//               <div className="md:hidden px-4 pb-4 space-y-3 text-[16px]">
//                 <Link to="/">Home</Link>
//                 <Link to="/shop">Shop</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/orders">My Orders</Link>
//                 <Link to="/cart" className="flex items-center space-x-2">
//                   <ShoppingCart className="w-5 h-5" />
//                   <span>Cart</span>
//                 </Link>
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//             )}
//           </>
//         )}
//       </SignedIn>

//       <SignedOut>
//         {/* BASIC NAVBAR FOR NOT LOGGED IN USERS */}
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//           <Link to="/" className="flex items-center">
//             <img src="/Sanco.png" alt="Logo" className="h-16 w-auto" />
//           </Link>
//           <div className="hidden md:flex items-center space-x-7 text-[17px]">
//             <Link to="/">Home</Link>
//             <Link to="/shop">Shop</Link>
//             <Link to="/about">About</Link>
//             <SignInButton mode="modal">
//               <button className="hover:text-blue-600 transition">
//                 <User className="w-5 h-5" />
//               </button>
//             </SignInButton>
//           </div>
//           <div className="md:hidden">
//             <button onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//         {isMobileMenuOpen && (
//           <div className="md:hidden px-4 pb-4 space-y-3 text-[16px]">
//             <Link to="/">Home</Link>
//             <Link to="/shop">Shop</Link>
//             <Link to="/about">About</Link>
//             <SignInButton mode="modal">
//               <button className="flex items-center space-x-2 px-2 py-1">
//                 <User className="w-5 h-5" />
//                 <span>Login</span>
//               </button>
//             </SignInButton>
//           </div>
//         )}
//       </SignedOut>
//     </nav>
//   );
// };

// export default Navbar;
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { User, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const linkClass = "hover:text-red-500 transition hover:font-bold";
  const mobileLinkClass = "block w-full text-left hover:font-bold transition";

  return (
    <nav className="bg-gray-100 text-black shadow-md sticky top-0 z-50">
      <SignedIn>
        {userData?.role === "admin" ? (
          <>
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img src="/sanco_logo.png" alt="Logo" className="h-16 w-auto" />
              </Link>
              <div className="hidden md:flex items-center space-x-7 text-[17px]">
                <Link to="/" className={linkClass}>Dashboard</Link>
                <Link to="/admin/all-products" className={linkClass}>Products</Link>
                <Link to="/admin/upload-product" className={linkClass}>Create Product</Link>
                <Link to="/admin/all-orders" className={linkClass}>All Orders</Link>
                {/* <Link to="/users" className={linkClass}>All Users</Link> */}
                <UserButton afterSignOutUrl="/" />
              </div>
              <div className="md:hidden">
                <button onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden px-4 pb-4 space-y-3 text-[16px]">
                <Link to="/" className={mobileLinkClass}>Dashboard</Link>
                <Link to="/admin/all-products" className={mobileLinkClass}>Products</Link>
                <Link to="/admin/upload-product" className={mobileLinkClass}>Create Product</Link>
                <Link to="/admin/all-orders" className={mobileLinkClass}>All Orders</Link>
                {/* <Link to="/users" className={mobileLinkClass}>All Users</Link> */}
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img src="/sanco_logo.png" alt="Logo" className="h-16 w-auto" />
              </Link>
              <div className="hidden md:flex items-center space-x-7 text-[17px] ">
                <Link to="/" className={linkClass} style={{color:"red"}}>Home</Link>
                <Link to="/shop" className={linkClass} style={{color:"green"}}>Shop</Link>
                <Link to="/about" className={linkClass} style={{color:"blue"}}>About</Link>
                <Link to="/orders" className={linkClass} style={{color:"orange"}}>My Orders</Link>
                <Link to="/cart" className={`relative ${linkClass}`}>
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
              <div className="md:hidden">
                <button onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden px-4 pb-4 space-y-3 text-[16px] hover:font-bold">
                <Link to="/" className={mobileLinkClass} style={{color:"red"}}>Home</Link>
                <Link to="/shop" className={mobileLinkClass} style={{color:"green"}}>Shop</Link>
                <Link to="/about" className={mobileLinkClass} style={{color:"blue"}}>About</Link>
                <Link to="/orders" className={mobileLinkClass} style={{color:"orange"}}>My Orders</Link>
                <Link to="/cart" className={`${mobileLinkClass} flex items-center gap-2`}>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </>
        )}
      </SignedIn>

      <SignedOut>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/sanco_logo.png" alt="Logo" className="h-16 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-7 text-[17px]">
            <Link to="/" className={linkClass} style={{color:"red"}}>Home</Link>
            <Link to="/shop" className={linkClass} style={{color:"green"}}>Shop</Link>
            <Link to="/about" className={linkClass} style={{color:"blue"}}>About</Link>
            <SignInButton mode="modal">
              <button className={linkClass}>
                <User className="w-5 h-5" />
              </button>
            </SignInButton>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 text-[16px]">
            <Link to="/" className={mobileLinkClass} style={{color:"red"}}>Home</Link>
            <Link to="/shop" className={mobileLinkClass} style={{color:"green"}}>Shop</Link>
            <Link to="/about" className={mobileLinkClass} style={{color:"blue"}}>About</Link>
            <SignInButton mode="modal">
              <button className={`${mobileLinkClass} flex items-center gap-2`}>
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            </SignInButton>
          </div>
        )}
      </SignedOut>
    </nav>
  );
};

export default Navbar;

