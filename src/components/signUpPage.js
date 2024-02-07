import { useState } from "react";
import authService from "../services/authService";

export function SignUp(props) {
  function singUpTrigger() {
    props.SignUpFunc();
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const response = authService.register(
      user.firstName + " " + user.lastName,
      user.email,
      user.password
    );
    response
      .then(() => {
        singUpTrigger();
      })
      .catch(() => {
        document.getElementById("errorPopup").style.display = "block";
      });
  };

  const handleFirstNameChangeEvent = (e) => {
    const { value } = e.target;
    changeUser((prevState) => ({
      ...prevState,
      firstName: value,
    }));
  };

  const handleLastNameChangeEvent = (e) => {
    const { value } = e.target;
    changeUser((prevState) => ({
      ...prevState,
      lastName: value,
    }));
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

  const [user, changeUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col gap-8 justify-center items-center m-auto w-1/3 h-3/5 px-5 py-10 rounded-lg shadow-lg border border-gray-200">
      <div className="hidden" id="errorPopup">
        Unable to connect to Database
      </div>
      <form onSubmit={formSubmit} className="flex flex-col gap-5">
        <label>
          <p>First Name</p>
          <input
            value={user.firstName}
            onChange={handleFirstNameChangeEvent}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="First Name"
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            value={user.lastName}
            onChange={handleLastNameChangeEvent}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Last Name"
          />
        </label>
        <label>
          <p>Email</p>
          <input
            value={user.email}
            onChange={handleEmailChangeEvent}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
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
          Sign Up
        </button>
      </form>

      <div className="w-full flex flex-row justify-center items-center">
        <p>
          Already have account?{" "}
          <span
            className="text-[#464585] underline cursor-pointer"
            onClick={singUpTrigger}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
