import * as React from "react";
import bgImg from "../../assets/img/bgImg.jpg";
import { login } from "../../api/auth/loginApi"; 

export default function LoginPage() {
  const bcrypt = require("bcryptjs");

  const refInput = React.useRef({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    refInput.current[name] = value;
  };

  const handleLogin = async () => {
    const infoPromise = login.GetUsernameAndPassword(
      refInput.current["username"]
    );

    infoPromise
      .then((info) => {
        const doesPasswordMatch = bcrypt.compareSync(
          refInput.current["password"],
          info[0].password
        ); //it wii give you a boolean, so the value of doesPasswordMatch will be a boolean

        //if the passwords do not match
        if (doesPasswordMatch) return alert("it ok");
        if (!doesPasswordMatch) return alert("Password not match!");
 
      })
      .catch((error) => {
        alert("Error fetching data:", error);
      });
  };

  return (
    <div className="flex items-center w-screen h-screen">
      <div
        className="basis-[70%] w-full h-full"
        //   style={{ backgroundImage: `url(${bgImg})` }}
      >
        <img
          src={bgImg}
          alt="img"
          style={{ width: "100%", height: "100%" }}
        ></img>
      </div>
      <div className=" basis-[30%] flex flex-col justify-center w-full p-10 box-border">
        <p className="font-nunito  text-4xl font-bold text-center mb-5">
          Admin Panel
        </p>

        <p>Username</p>
        <input
          type="text"
          name="username"
          className="input input-bordered w-full  mt-3 mb-10"
          onChange={handleChange}
        />

        <p>Password</p>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full mt-3 mb-10 "
          onChange={handleChange}
        />
        <button
          className="btn bg-app-primary-color text-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
