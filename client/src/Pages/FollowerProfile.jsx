import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdReturnLeft } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import FollowHandler from "../Components/Profil/FollowHandler";
import MainLayout from "../Layouts";

const FollowingProfile = () => {
  const { userId } = useParams();
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const currentUser = usersData?.find((user) => user._id === userId);

  if (!currentUser) {
    return <div>Utilisateur non trouvé.</div>;
  }

  // Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProfileLinkClick = () => {
    if (userData._id === currentUser._id) {
      navigate("/profil");
    } else {
      navigate(`/profil/${userId}`);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex bg-black h-full w-screen items-start text-white">
        <div className="flex flex-col w-full h-full items-start sm:w-3/5 lg:w-2/5">
          <div className="w-full">
            <p className="w-full relative flex justify-center p-4 text-lg after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:bottom-0 after:right-0  sm:after:absolute sm:after:w-full after:h-px after:bg-grey after:bottom-0 after:right-0">
              Followers
            </p>
            <IoMdReturnLeft
              onClick={handleProfileLinkClick}
              className="cursor-pointer sm:text-lg absolute right-5 top-6"
            />
          </div>

          <div className="relative w-5/6 mt-4 mb-2 ms-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch />
            </div>
            <input
              type="text"
              id="default-search"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
              className="w-full p-2 pl-10 text-sm text-gray-900 border-none outline-none rounded-md bg-blackHover focus:blackHover focus:border-blackHover "
              placeholder="Rechercher..."
              required
            />
          </div>

          <section className="w-full">
            <ul className="h-[32rem] sm:h-[36rem] overflow-y-auto w-5/6 mx-8 my-4">
              {usersData && userData ? (
                usersData
                  .filter((user) =>
                    user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user) => {
                    if (user && user._id) {
                      const isFollowers = currentUser.followers.includes(
                        user._id
                      );
                      if (isFollowers) {
                        const profileLink =
                          userData._id === user._id
                            ? "/profil"
                            : `/profil/${user._id}`;
                        return (
                          <li
                            key={user._id}
                            className="flex justify-between items-center my-5 "
                          >
                            <div className="flex items-center">
                              <Link to={profileLink}>
                                <img
                                  src={`../.${user.picture}`}
                                  alt={`Profil de ${user.pseudo}`}
                                  className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                                />
                              </Link>
                              <h4 className="ms-6 text-lg">{user.pseudo}</h4>
                            </div>
                            <>
                              {userData._id !== user._id && (
                                <div className="bg-blackHover px-4 py-2 rounded-md">
                                  <FollowHandler
                                    idToFollow={user._id}
                                    type={"following"}
                                  />
                                </div>
                              )}
                            </>
                          </li>
                        );
                      }
                    }
                    return null;
                  })
              ) : (
                <li>Aucun utilisateur trouvé.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default FollowingProfile;
