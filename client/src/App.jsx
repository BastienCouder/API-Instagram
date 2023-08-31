import { useEffect, useState } from "react";
import Routes from "./Routes/RouteIndex";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./Store/actions/user.actions";
import { apiUrl } from "./Utils/Utils";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${apiUrl}jwtid`, {
          withCredentials: true,
        });
        setUid(res.data);
      } catch (error) {
        console.log("No token");
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid)).catch((error) => {
        console.log("Error fetching user:", error);
      });
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <div className="flex bg-black h-screen w-screen overflow-hidden">
        <Routes />
      </div>
    </UidContext.Provider>
  );
};

export default App;
