import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TodoForm({
  onChange,
  onSubmit,
  nameRef,
  descRef,
  dateRef,
  success,
  method,
}) {
  const [methodType, setMethodType] = useState(null);

  useEffect(() => {
    if (method === "POST") setMethodType("Added");
    else if (method === "UPDATE") setMethodType("Updated");
  }, [method]);
  return (
    <>
      <h1 className="text-center mt-5">{method} Todo</h1>
      <div className="m-5">
        <form onChange={(e) => onChange(e)} onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="form-control mb-1"
              ref={nameRef}
            />
            <p className="text-danger" id="nameValidationErr"></p>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="form-control mb-1"
              rows="5"
              ref={descRef}
            />
            <p className="text-danger" id="descriptionValidationErr"></p>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="Date"
              className="form-control mb-1"
              ref={dateRef}
            />
            <p className="text-danger" id="dateValidationErr"></p>
          </div>
          <button type="submit" className="btn btn-success mr-2">
            DONE
          </button>
          <Link className="btn btn-secondary" to="/">
            Back
          </Link>
        </form>
        <br />
        {success ? (
          <h3 className="text-success">successfully {methodType}</h3>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
