import { useState } from "react";
import { Login } from "./logInPage";
import { SignUp } from "./signUpPage";
import authService from "../services/authService";

export function Home() {
  function triggerSignUp() {
    changeSignUp(!isSignUp);
  }

  let isLoggedIn = false;
  // let isSignUp = false
  const [isSignUp, changeSignUp] = useState(false);
  return (
    <>
      {!isLoggedIn && !isSignUp && (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <Login SignUpFunc={triggerSignUp}></Login>
        </div>
      )}
      {!isLoggedIn && isSignUp && (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <SignUp SignUpFunc={triggerSignUp}></SignUp>
        </div>
      )}
    </>
  );
}
