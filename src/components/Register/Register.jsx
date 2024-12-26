// import { useContext, useState } from "react";
// import Overlay from "../Overlay";
// import { auth, db } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { UserDataContext } from "../../App";
// export default function Register({ user, font, setToggleRegister }) {
//   const { userData, setUserData } = useContext(UserDataContext);
//   const [registrationDetails, setRegistrationDetails] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   async function createDocument(userCredential) {
//     try {
//       const userDocRef = doc(db, "users", userCredential.user.uid);
//       const docRef = await setDoc(userDocRef, {
//         username: registrationDetails.username,
//         email: registrationDetails.email,
//         createdAt: new Date(),
//       });

//       console.log("Document written with ID: ", userDocRef.id);
//     } catch (e) {
//       console.error("Error adding or fetching document: ", e);
//     }
//   }
//   function handleChange(e) {
//     setRegistrationDetails((prevRegistrationDetails) => {
//       return { ...prevRegistrationDetails, [e.target.name]: e.target.value };
//     });
//   }
//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         registrationDetails.email,
//         registrationDetails.password
//       );
//       createDocument(userCredential);
//       setToggleRegister(false);
//     } catch (err) {
//       console.error("Error registering:", err);
//     }
//   }
//   return (
//     <Overlay>
//       <div className="flex justify-between p-6 md:px-10 md:py-8 items-center">
//         <p
//           className="text-veryDarkBlue text-xl font-bold font-kumbh"
//           style={{ fontFamily: font }}
//         >
//           Create Account
//         </p>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="14"
//           height="14"
//           onClick={() => {
//             setToggleRegister((prev) => !prev);
//           }}
//           className="cursor-pointer text-darkBlue opacity-50 group-hover/container:opacity-100 transition-all duration-300"
//         >
//           <path
//             fill="currentColor"
//             fillRule="evenodd"
//             d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
//             opacity="1"
//           />
//         </svg>
//       </div>
//       <form
//         className="flex flex-col gap-4 p-20"
//         onSubmit={(e) => handleSubmit(e)}
//       >
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-96 border-b pl-2 pr-10 py-2 border-[rgba(0,0,0,0.3)] outline-none text-veryDarkBlue"
//           name="username"
//           onChange={(e) => handleChange(e)}
//           value={registrationDetails.username}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-96 border-b pl-2 pr-10 py-2 border-[rgba(0,0,0,0.3)] outline-none text-veryDarkBlue"
//           name="email"
//           onChange={(e) => handleChange(e)}
//           value={registrationDetails.email}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-96 border-b pl-2 pr-10 py-2 border-[rgba(0,0,0,0.3)] outline-none text-veryDarkBlue"
//           name="password"
//           onChange={(e) => handleChange(e)}
//           value={registrationDetails.password}
//         />
//         <div className="flex justify-center w-full">
//           <button
//             className="relative py-[18px] px-12 bg-customRed rounded-full top-8 font-bold leading-tight hover:brightness-125"
//             style={{ fontFamily: font }}
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </Overlay>
//   );
// }
