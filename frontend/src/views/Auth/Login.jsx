import React, { useState } from "react";
import bgImg from "../../assets/img/bgImg.jpg";
import { login } from "../../api/auth/loginApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function LoginPage() {
  const navigate = useNavigate(); // Hook điều hướng
  const refInput = React.useRef({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    refInput.current[name] = value;
  };

  const handleLogin = async () => {
    const loginData = {
      username: refInput.current["username"],
      password: refInput.current["password"],
    };

    setLoading(true); // Bắt đầu loading

    try {
      // Giả sử bạn thực hiện đăng nhập ở đây
      const user = await login.loginWithEmailAndPassword(loginData.username, loginData.password);

      console.log("Login successful, user data:", user);


      // Lưu token vào localStorage
      localStorage.setItem("authToken", user.access_token);

      // Sau khi đăng nhập thành công, điều hướng với delay
      setTimeout(() => {
        setLoading(false); // Tắt loading
        navigate("/sessions"); // Điều hướng tới trang Sessions
      }, 1000); // Đặt thời gian delay cho hiệu ứng loading

    } catch (error) {
      console.error("Login error:", error.message);
      setLoading(false); // Tắt loading
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen">
      {loading && <Loading />} {/* Hiển thị Loading nếu đang trong trạng thái loading */}
      <div className="basis-[70%] w-full h-full">
        <img
          src={bgImg}
          alt="img"
          style={{ width: "100%", height: "100%" }}
        ></img>
      </div>
      <div className="basis-[30%] flex flex-col justify-center w-full p-10 box-border bg-white shadow-lg rounded-lg">
        <p className="font-nunito text-4xl font-bold text-center mb-5 text-gray-800">
          Admin Panel
        </p>

        <p className="text-gray-600">Username</p>
        <input
          type="text"
          name="username"
          className="input input-bordered w-full mt-3 mb-5"
          onChange={handleChange}
          placeholder="Enter your username"
        />

        <p className="text-gray-600">Password</p>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full mt-3 mb-10"
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button
          className="btn bg-app-primary-color text-white w-full py-2 mt-5 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
