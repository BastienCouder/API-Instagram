import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import FollowHandler from "../Components/Profil/FollowHandler";
import UidContext from "../Services/AppContext";
import MainLayout from "../Layouts";

const Search = () => {
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const uid = useContext(UidContext);

  const [searchTerm, setSearchTerm] = useState("");

  // Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row h-screen bg-black w-screen items-start text-white">
        <div className="flex flex-col w-full h-full items-start sm:w-3/5 lg:w-2/5">
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
            <ul className="h-[36rem] sm:h-[40rem] overflow-y-auto w-5/6 mx-8 my-4">
              {uid && usersData ? (
                usersData
                  .filter(
                    (user) =>
                      user &&
                      user.pseudo
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => a.pseudo.localeCompare(b.pseudo))

                  .map((user) => {
                    const profileLink =
                      userData?._id === user._id
                        ? "/profil"
                        : `/profil/${user._id}`;

                    return user && user?._id ? (
                      <li
                        key={user._id}
                        className="flex justify-between items-center my-5 "
                      >
                        <div className="flex items-center">
                          <Link to={profileLink}>
                            <img
                              src={`/${user?.picture}`}
                              alt={`Profil de ${user?.pseudo}`}
                              className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                            />
                          </Link>
                          <h4 className="ms-6 text-lg">{user?.pseudo}</h4>
                        </div>
                        {userData?._id !== user?._id && (
                          <div className="bg-blackHover px-4 py-2 rounded-md">
                            <FollowHandler
                              idToFollow={user?._id}
                              type={"search"}
                            />
                          </div>
                        )}
                      </li>
                    ) : null;
                  })
              ) : (
                <li>
                  Aucun utilisateur trouvé.
                  <br />
                  <Link to="/profil" className="cursor-pointer">
                    Connectez-vous
                  </Link>
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
