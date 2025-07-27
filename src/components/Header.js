import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSerchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSerchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute flex w-screen sm:px-8 py-2 bg-gradient-to-b from-black z-10 justify-between flex-col md:flex-row">
      <img className="w-60 h-20 mx-auto md:mx-0" src="/LogoMovieGPT.png" alt="logo" />
      

      {user && (
        <div className="flex justify-around">
          {showGptSearch && <select
            className="px-3 m-2 md:m-5 bg-gray-900 text-white rounded-md"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="px-2 m-2 md:m-5  bg-purple-800 text-white rounded-md"
            onClick={handleGptSearchClick}
          >
           {showGptSearch ? "Homepage" : "Gpt Search"}
          </button>
          <img
            alt="usericon"
            className="w-10 h-10 m-2 md:m-5 rounded-sm hidden md:block"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="text-white bg-red-600 m-2 md:m-5 px-3 py-1 rounded-md">
            sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
