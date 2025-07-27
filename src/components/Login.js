import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateDate } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Bg_URL, photoURL } from "../utils/constants";
import Footer from "./Footer";
const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errMessage, seterrMessage] = useState(null);
  const toggleSignForm = () => {
    setSignIn(!signIn);
  };
  const handleSubmit = () => {
    const message = validateDate(email.current.value, password.current.value);
    seterrMessage(message);
    if (message) {
      return;
    }
    // Handle the sign-in or sign-up logic
    if (!signIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          // const User = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: photoURL 
              
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          seterrMessage(errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          seterrMessage(errorMessage);
        });
    }
  };
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-screen md:h-full object-cover"
          src={Bg_URL}
          alt="background"
        />
      </div>
      <div className="flex-grow flex items-center justify-center px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[95%] md:w-3/12 p-12 bg-black my-[45%] md:my-28 mx-auto right-0 left-0 text-white rounded-md opacity-85"
      >
        <h1 className="text-2xl md:text-3xl font-bold py-4">
          {signIn ? "Sign In" : "Sign up"}
        </h1>
        {!signIn && (
          <div>
          <label>Name:</label>
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-2 w-full bg-gray-700 rounded-md"
          />
          </div>
        )}
        <label>Email:</label>
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-2 w-full bg-gray-700 rounded-md"
        />
        <label>Password:</label>
        <input
          ref={password}
          type="Password"
          placeholder="password"
          className="p-3 my-2 w-full bg-gray-700 rounded-md"
        />
        <p className="text-red-600">{errMessage}</p>
        <button className="p-3 my-4 bg-red-700 w-full" onClick={handleSubmit}>
          {signIn ? "Sign In" : "Sign up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignForm}>
          {signIn ? "new to MovieGPT? sign up now" : "Already User? Sign In"}
        </p>
      </form>
      </div>
      
        <Footer/>
      
    </div>
    
  );
};

export default Login;
