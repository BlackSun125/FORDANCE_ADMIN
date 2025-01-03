import * as React from "react";
import { supabase } from "../../global-variables/supabase";
import { password } from "../../global-variables/commonVariable";
import { useNavigate } from "react-router-dom";

export default function InstructorCreate() {
  const refInput = React.useRef({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    refInput.current[name] = value;
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // -1 nghĩa là quay lại trang trước
  };

  const handleCreate = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: refInput.current["email"],
      password: password,
      options: {
        data: {
          role: "instructor",
          phone: refInput.current["phone"],
          username: refInput.current["username"],
          discount: refInput.current["discount"],
          name: refInput.current["name"],
        },
      },
    });
  };

  return (
    <div>
      <p className="font-nunito  text-4xl font-bold text-center">
        Create New Instructor
      </p>
      <div className="grid grid-cols-8 gap-x-3 gap-y-10 p-8 items-center">
        <p>Avatar</p>
        <div className="col-span-3 box-border rounded-full bg-gray-400 w-64 h-64 ml-5">
          <input type="file" className="file-input w-full max-w-xs hidden" />
        </div>

        <p className="col-start-1">Name</p>
        <input
          name="name"
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
        />

        <p className="col-start-5">Email</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="email"
        />

        <p className="col-start-1">Phone</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="phone"
        />
        <p className="col-start-5">Discount Percentage</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="discount"
        />

        <p className="col-start-1">Username</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="username"
        />
      </div>

      <div className="flex justify-center gap-28">
        <button
          className="btn bg-white text-gray-400 btn-outline mr-5"
          onClick={handleGoBack}
        >
          Cancel
        </button>
        <button
          className="btn bg-app-primary-color text-white mr-5"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
