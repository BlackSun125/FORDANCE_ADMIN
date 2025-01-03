import * as React from "react";
import { useParams } from "react-router-dom";
import { instructor } from "../../api/instructor/instructorApi";

export default function InstructorDetailPage() {
  const { id } = useParams();

  const refInput = React.useRef({});
  const [data, setData] = React.useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    refInput.current[name] = value;
  };

  const handleCreate = () => {};
  const handleGoBack = () => {};

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await instructor.GetOneInsById(id);
        setData(data);
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="font-nunito  text-4xl font-bold text-center">
        Detail An Instructor
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
          value={data.name}
        />

        <p className="col-start-5">Email</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="email"
          value={data.email}
        />

        <p className="col-start-1">Phone</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="phone"
          value={data.phone}
        />
        <p className="col-start-5">Discount Percentage</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="discount"
          value={data.trade_discount}
        />

        <p className="col-start-1">Username</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs ml-5 col-span-3"
          onChange={handleChange}
          name="username"
          value={data.username}
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
