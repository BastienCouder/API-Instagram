import { useContext } from "react";
import { useSelector } from "react-redux";
import Thread from "../component/Thread";
import UidContext from "../Services/AppContext";
import { Link } from "react-router-dom";
import FriendsHint from "../component/profil/FriendsHint";
import MainLayout from "../Layouts";

const Home = () => {
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const uid = useContext(UidContext);

  if (!usersData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <MainLayout>
      <main className="flex flex-col sm:flex-row h-screen bg-black w-screen text-white">
        <div></div>
        <div className="sm:w-[32rem] mx-4">
          <Thread />
        </div>{" "}
        <div className="hidden lg:flex  flex-col  md:ms-3 lg:ms-12 md:w-2/4 lg:w-3/4">
          {uid ? (
            <section className="flex w-full sm:h-40 py-3">
              <div className=" md:1/3 flex justify-center items-center me-6">
                {userData?.picture && (
                  <Link to="/profil">
                    <img
                      className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                      src={`.${userData.picture}`}
                      alt=""
                    />
                  </Link>
                )}
              </div>

              <div className="md:w-2/3 flex flex-col justify-center">
                {userData?.pseudo && (
                  <h1 className="font-bold text-lg">{userData.pseudo}</h1>
                )}
              </div>
            </section>
          ) : (
            <div className="m-4 flex gap-x-4">
              <Link to="/profil ">
                <button className="w-40 cursor-pointer py-2 px-4 bg-blackHover rounded-md">
                  Se connecter
                </button>
              </Link>
            </div>
          )}
          {uid ? <FriendsHint type={"home"} /> : null}
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
