import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Overlay from "../Overlay";
import { getAuth, signOut } from "firebase/auth";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext, UserDataContext } from "../../App";

// TODO: Make it so that it shows the username and profile picture (by adding docs storing user info using their uid as key)
export default function ProfileMenu({ setToggleProfile }) {
  const { user, setUser } = useContext(UserContext);
  const { userData } = useContext(UserDataContext);
  async function logout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      setToggleProfile(false);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Overlay>
      <div className="flex flex-col items-center text-black justify-center [&>*]:px-28 py-10">
        <div
          className="text-black text-2xl font-light flex justify-end w-full !px-3 hover:text-purple-500 transition-all cursor-pointer"
          onClick={() => setToggleProfile(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className="aspect-square rounded-full w-14 h-14 bg-black text-white text-3xl flex justify-center items-center font-semibold !px-0">
          {userData.username[0].toUpperCase()}
        </div>
        <div className="pt-2">@{userData.username}</div>
        <div className="hover:text-purple-500 transition-all border-b border-gray-300 py-4 cursor-pointer">
          <a href="/profile">Profile</a>
        </div>
        <div className="hover:text-purple-500 transition-all border-b border-gray-300 py-4 cursor-pointer">
          <a href="/settings">Settings</a>
        </div>
        <div
          onClick={() => logout()}
          className="hover:text-purple-500 transition-all py-4 cursor-pointer"
        >
          Log out
        </div>
      </div>
    </Overlay>
  );
}
