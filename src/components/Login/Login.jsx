import { useState } from "react";
import Overlay from "../Overlay";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login({ font, setToggleLogin }) {
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    if (e.target.name == "email") {
      setLoginCreds((prevLoginCreds) => {
        return { ...prevLoginCreds, email: e.target.value };
      });
    } else if (e.target.name == "password") {
      setLoginCreds((prevLoginCreds) => {
        return { ...prevLoginCreds, password: e.target.value };
      });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginCreds.email,
        loginCreds.password
      );
      setToggleLogin(false);
    } catch (err) {
      console.log("Error logging in: ", err);
    }
  }
  return (
    <Overlay>
      <div className="flex justify-between p-6 md:px-10 md:py-8 items-center">
        <p
          className="text-veryDarkBlue text-xl font-bold font-kumbh"
          style={{ fontFamily: font }}
        >
          Login
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          onClick={() => {
            setToggleLogin((prev) => !prev);
          }}
          className="cursor-pointer text-darkBlue opacity-50 group-hover/container:opacity-100 transition-all duration-300"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
            opacity="1"
          />
        </svg>
      </div>
      <form
        className="flex flex-col gap-4 p-20"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          placeholder="Email"
          className="w-96 border-b pl-2 pr-10 py-2 border-[rgba(0,0,0,0.3)] outline-none text-veryDarkBlue"
          name="email"
          onChange={(e) => handleChange(e)}
          value={loginCreds.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-96 border-b pl-2 pr-10 py-2 border-[rgba(0,0,0,0.3)] outline-none text-veryDarkBlue"
          name="password"
          onChange={(e) => handleChange(e)}
          value={loginCreds.password}
        />
        <div className="flex justify-center w-full">
          <button
            className="relative py-[18px] px-12 bg-customRed rounded-full top-8 font-bold leading-tight hover:brightness-125"
            style={{ fontFamily: font }}
          >
            Login
          </button>
        </div>
      </form>
    </Overlay>
  );
}
