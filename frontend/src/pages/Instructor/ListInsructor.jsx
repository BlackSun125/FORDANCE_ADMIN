import React, { useState, useEffect } from "react";
import { instructor } from "../../api/instructor/instructorApi";
import BtnAction from "./Components/ButtonAction";

export default function ListInstructorPage() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoPromise = await instructor.GetListInstructors();
        console.log("info: " + JSON.stringify(infoPromise));
        setInstructors(infoPromise);
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <p className="font-nunito  text-4xl font-bold text-center">
          List Instructor Page
        </p>
        <div className="overflow-auto">
          <button className="btn bg-app-primary-color text-white float-right mr-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 13.6957H16.3043V0H13.6957V13.6957H0V16.3043H13.6957V30H16.3043V16.3043H30V13.6957Z"
                fill="white"
              />
            </svg>
            Create
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Classes</th>
                <th>Sessions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor, index) => (
                <tr key={instructor.id}>
                  <td>{index + 1}</td>
                  <td>{instructor.name}</td>
                  <td>{instructor.email}</td>
                  <td>{instructor.phone}</td>
                  <td>
                    {instructor.classes.map((item) => (
                      <span key={item.id}>
                        {item.class_name}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>
                    {instructor.sessions.map((item) => (
                      <span key={item.id}>
                        {item.session_name}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>
                    <BtnAction></BtnAction>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
