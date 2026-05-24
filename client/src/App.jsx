import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Page from "./pages/Page";
import Category from "./component/Category";
import Register from "./component/Register";
import Login from "./component/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./component/Protected";
import Dashboard from "./component/amin/Dashboard";
import Forget from "./component/Forget";
import Verify from "./component/Verify";
import Change from "./component/Change";
import Admin from "./component/amin/Admin";
import AdminPro from "./component/amin/AdminPro";
import Product from "./component/amin/Product";
import User from "./component/amin/User";
import CategoryR from "./component/amin/CategoryR";

import Profile from "./component/user/Profile";
import UserA from "./component/user/UserA";
import OrdrUser from "./component/user/OrdrUser";
import AdminData from "./component/amin/AdminData";
import AdminUpdate from "./component/amin/AdminUpdate";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

import Cancel from "./pages/Cancel";



function App() {
  return (
    <>
      {/* Toast Message */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/category" element={<Protected><Category /></Protected>} />
        <Route path="/user/profile" element={<Protected><Profile/></Protected>}/>
        <Route path="/user/order" element={<Protected><OrdrUser/></Protected>}/>
      
        <Route path="/userDashboard" element={<Protected><UserA/></Protected>}/>
        <Route path="/dashboard" element={<AdminPro><Dashboard/></AdminPro>}/>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/verify/:email" element={<Verify/>}/>
        <Route path="change-password/:email" element={<Change/>}/>
        
        <Route path="/admin/cate" element={<AdminPro><CategoryR/></AdminPro>}/>
        <Route path="/admin/createPro" element={<AdminPro><Product/></AdminPro>}/>
        <Route path="/admin/users" element={<AdminPro><User/></AdminPro>}/>
       <Route path="/adminPro" element={<AdminPro><AdminData/></AdminPro>}/>
       <Route path="/updateAdmin/:id" element={<AdminPro><AdminUpdate/></AdminPro>}/>
<Route path="/details/:id" element={<Details/>}/>
<Route path="/cart" element={<Cart/>}/>
        <Route path="/*" element={<Page />} />
        <Route
  path="/search"
  element={<Search />}
/>


<Route
  path="/cancel"
  element={<Cancel />}
/>
      </Routes>
    </>
  );
}

export default App;