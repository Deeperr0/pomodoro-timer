import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
// import Profile from "./components/Profile";

export const UserContext = React.createContext();
export const UserDataContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // async function fetchDoc(id) {
  //   try {
  //     if (id) {
  //       console.log(id);
  //       // Fetch the newly created document
  //       const docRef = doc(db, "users", id);
  //       const docSnapshot = await getDoc(docRef);

  //       if (docSnapshot.exists()) {
  //         console.log("Document data:", docSnapshot.data());
  //         setUserData(docSnapshot.data()); // Return the document data
  //       } else {
  //         console.log("No such document!");
  //         return null;
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("User is signed in:", user.uid);
  //       setUser(user);
  //       fetchDoc(user.uid);
  //     } else {
  //       console.log("User is signed out");
  //     }
  //   });

  //   // Cleanup the listener on component unmount
  //   return () => unsubscribe();
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <Router>
          <div className="bg-mobileBackground bg-no-repeat bg-cover md:bg-tabletBackground lg:bg-desktopBackground">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              {/* <Route
                path="/profile"
                element={<Profile userId={user?.uid} userData={userData} />}
              /> */}
            </Routes>
          </div>
        </Router>
      </UserDataContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
