import { useContext } from "react";
import Log from "../component/Log/LogIndex";
import { UidContext } from "../Services/AppContext";
import ProfilePage from "./ProfilePage";
import MainLayout from "../Layouts";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <ProfilePage />
      ) : (
        <MainLayout>
          <div className="flex flex-col w-screen h-screen">
            <Log signin={true} signup={false} />
          </div>{" "}
        </MainLayout>
      )}
    </>
  );
};

export default Profil;
