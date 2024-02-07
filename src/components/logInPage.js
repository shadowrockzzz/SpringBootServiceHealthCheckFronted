import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Login(props) {
  function singUpTrigger() {
    props.SignUpFunc();
  }

  const navigate = useNavigate();

  const [user, changeUser] = useState({
    email: "",
    password: "",
  });

  const formSubmit = (e) => {
    e.preventDefault();
    const response = authService.login(user.email, user.password);
    response
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error, "Hi");
        document.getElementById("errorPopUp").style.display = "block";
      });
  };

  const handleEmailChangeEvent = (e) => {
    const { value } = e.target;
    changeUser((prevState) => ({
      ...prevState,
      email: value,
    }));
  };

  const handlePasswordChangeEvent = (e) => {
    const { value } = e.target;
    changeUser((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center m-auto w-1/3 h-3/5 px-5 py-10 rounded-lg shadow-lg border border-gray-200">
      <div id="errorPopUp" className="hidden">
        Wrong Email / Password
      </div>
      <p>
        New User?{" "}
        <span
          className="text-[#464585] underline cursor-pointer"
          onClick={singUpTrigger}
        >
          Sign Up
        </span>
      </p>
      <div className="w-full flex flex-row justify-center items-center">
        <hr className="w-1/4 mr-2" />
        <p>Or</p>
        <hr className="w-1/4 ml-2" />
      </div>
      <form onSubmit={formSubmit} className="flex flex-col gap-5">
        <label>
          <p>Email</p>
          <input
            value={user.email}
            onChange={handleEmailChangeEvent}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Email"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={user.password}
            onChange={handlePasswordChangeEvent}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            placeholder="Password"
          />
        </label>
        <button
          className="bg-[#464585] px-4 py-2 rounded-lg text-white"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
