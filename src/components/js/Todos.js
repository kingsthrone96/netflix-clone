import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "./CustomHooks";
import { herokuServer } from "./serverUrl";

export default function Todos() {
  const [stateData, setStateData] = useState();
  const [stateErr, setStateErr] = useState();
  const [data, error] = useFetch(`${herokuServer}/getTodos`);

  useEffect(() => {
    if (error) return setStateErr(error);
    setStateData(data);
    setStateErr();
  }, [data, error]);

  const deleteTodo = async (id) => {
    try {
      const res = await (
        await fetch(`${herokuServer}/deleteTodo/${id}`, { method: "delete" })
      ).json();
      if (res.deleted) {
        const newData = stateData.filter((i) => i._id !== id);
        setStateData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {stateErr ? <h1>{stateErr.error}</h1> : ""}
      {stateData
        ? stateData.map((i) => {
            return (
              <div className="m-5" key={i._id}>
                <ul className="list-group">
                  <li className="list-group-item">Name: {i.name}</li>
                  <li className="list-group-item">
                    Description: {i.description}
                  </li>
                  <li className="list-group-item">Date: {i.date}</li>
                </ul>
                <br />
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => deleteTodo(i._id)}
                >
                  Delete
                </button>
                <Link className="btn btn-info" to={`/editTodo/${i._id}`}>
                  Edit Todo
                </Link>
              </div>
            );
          })
        : ""}
    </>
  );
}
