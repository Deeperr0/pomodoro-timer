import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js"; // Ensure you have your Firebase Firestore instance imported

export default function Profile({ userData, userId }) {
  const [editMode, setEditMode] = useState(false);

  // Initialize with existing data or defaults
  const [updatedProfile, setUpdatedProfile] = useState({
    username: userData?.username || "Unknown User",
    email: userData?.email || "example@example.com",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes and update Firestore
  const saveChanges = async () => {
    try {
      const userDocRef = doc(db, "users", userId); // Reference to the user's document in Firestore

      // Update only the username in Firestore
      await updateDoc(userDocRef, {
        username: updatedProfile.username,
      });

      console.log("Username updated successfully in Firestore!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  // Sync with new `userData` when it updates
  useEffect(() => {
    if (userData) {
      setUpdatedProfile({
        username: userData?.username || "Unknown User",
        email: userData.email || "example@example.com",
      });
    }
  }, [userData]);

  return (
    <div>
      <div className="flex w-full justify-center py-10">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="153"
            height="32"
            className="col-start-2 mx-auto items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="153"
              height="32"
              className="col-start-2 mx-auto items-center"
            >
              <path
                fill="#D7E0FF"
                d="M4.578 31.813v-9.36a7.383 7.383 0 004.984 1.86c1.47 0 2.777-.352 3.922-1.055 1.146-.703 2.047-1.667 2.704-2.89.656-1.225.984-2.618.984-4.18 0-1.563-.328-2.956-.985-4.18-.656-1.224-1.557-2.188-2.703-2.89-1.145-.704-2.453-1.056-3.921-1.056-1.01 0-1.954.175-2.829.524a6.985 6.985 0 00-2.296 1.476l-.11-1.687H.078v23.438h4.5zm3.969-11.407c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm18.844 3.907c1.604 0 3.03-.352 4.28-1.055a7.85 7.85 0 002.962-2.89c.724-1.225 1.086-2.618 1.086-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.281-1.056-1.605 0-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.969 2.89c1.255.704 2.684 1.055 4.289 1.055zm0-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203c1.145 0 2.093.4 2.843 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.843 1.203zM43.188 24v-8.297c0-1.24.286-2.172.859-2.797s1.266-.937 2.078-.937c.802 0 1.487.302 2.055.906.567.604.851 1.51.851 2.719V24h4.5v-8.297c0-1.24.287-2.172.86-2.797s1.265-.937 2.078-.937c.802 0 1.487.302 2.054.906.568.604.852 1.51.852 2.719V24h4.5v-8.406c0-2.365-.526-4.211-1.578-5.54-1.052-1.327-2.526-1.992-4.422-1.992-1.198 0-2.24.266-3.125.797-.885.532-1.589 1.292-2.11 2.282-1-2.052-2.703-3.079-5.109-3.079-1.885 0-3.38.657-4.484 1.97l-.11-1.657h-4.25V24h4.5zm31.687.313c1.604 0 3.031-.352 4.281-1.055a7.85 7.85 0 002.961-2.89c.724-1.225 1.086-2.618 1.086-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.96-2.89c-1.25-.704-2.678-1.056-4.282-1.056s-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.969 2.89c1.255.704 2.685 1.055 4.289 1.055zm0-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm17.813 3.907c1.02 0 1.966-.175 2.835-.524a7.005 7.005 0 002.29-1.477L97.921 24h4.25V.562h-4.5v9.36a7.383 7.383 0 00-4.984-1.86c-1.459 0-2.764.352-3.915 1.055a7.433 7.433 0 00-2.71 2.89c-.657 1.225-.985 2.618-.985 4.18 0 1.563.328 2.956.984 4.18a7.433 7.433 0 002.711 2.89c1.151.704 2.456 1.055 3.915 1.055zm1.015-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm19.781 3.907c1.605 0 3.032-.352 4.282-1.055a7.85 7.85 0 002.96-2.89c.725-1.225 1.087-2.618 1.087-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.282-1.056-1.604 0-3.033.352-4.289 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.968 2.89c1.256.704 2.685 1.055 4.29 1.055zm0-3.907c-1.145 0-2.093-.4-2.843-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.843-1.203c1.146 0 2.094.4 2.844 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zM129.281 24v-6.89c0-1.646.37-2.915 1.11-3.805.74-.89 1.713-1.336 2.922-1.336a5.7 5.7 0 011.78.297l.626-3.891a7.505 7.505 0 00-2.094-.313c-1.99 0-3.552.85-4.688 2.547l-.218-2.234h-3.938V24h4.5zm15.406.313c1.605 0 3.032-.352 4.282-1.055a7.85 7.85 0 002.96-2.89c.725-1.225 1.087-2.618 1.087-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.281-1.056-1.605 0-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.968 2.89c1.256.704 2.685 1.055 4.29 1.055zm0-3.907c-1.145 0-2.093-.4-2.843-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203c1.145 0 2.093.4 2.843 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203z"
              />
            </svg>
          </svg>
        </a>
      </div>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
        <div className="flex items-center gap-6">
          {userData ? (
            <div className="aspect-square rounded-full w-14 h-14 bg-black text-white text-3xl flex justify-center items-center font-semibold !px-0">
              {userData?.username[0].toUpperCase()}
            </div>
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={updatedProfile.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border rounded-md"
                />
              ) : (
                updatedProfile.username
              )}
            </h1>
            <p className="text-gray-600">{updatedProfile.email}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          {editMode ? (
            <>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
