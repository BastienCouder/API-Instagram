import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Profil from "../Pages/Profil";
import EditProfile from "../Pages/EditProfile";
import FollowerProfile from "../Pages/FollowerProfile";
import FollowingProfile from "../Pages/FollowingProfile";
import Search from "../Pages/Search";
import CreatePost from "../Pages/CreatePost";
import MessageUser from "../Pages/MessageUser";
import ProfilePage from "../Pages/ProfilePage";
import PostPage from "../Pages/PostPage";
import ForgotPassword from "../Components/Log/ForgotPassword";
import ResetPassword from "../Components/Log/ResetPassword";

const RouteIndex = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/new-post" element={<CreatePost />} />

        {/*Auth*/}
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Navlink Profil */}
        <Route path="/profil/edit" element={<EditProfile />} />

        {/*Navlink users Profil */}
        <Route path="/profil/:userId" element={<ProfilePage />} />
        <Route path="/message/:userId" element={<MessageUser />} />
        <Route path="/profil/followers/:userId" element={<FollowerProfile />} />
        <Route
          path="/profil/following/:userId"
          element={<FollowingProfile />}
        />
        <Route path="/post/:userId/:postId" element={<PostPage />} />

        {/*404*/}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteIndex;
