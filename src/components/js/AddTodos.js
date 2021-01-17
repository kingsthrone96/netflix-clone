import React, { useState, useEffect, useRef } from "react";

import { herokuServer } from "./serverUrl";
import TodoForm from "./TodoForm";

export default function AddTodos() {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const dateRef = useRef(null);

  const [body, setBody] = useState();
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBody((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${herokuServer}/addTodo`, {
        method: "post",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (resData.error) {
        validationErr(resData.errors);
        throw new Error(resData.error);
      } else {
        setBody();
        [nameRef, descRef, dateRef].forEach((i) => (i.current.value = ""));
        validationErr(null);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationErr = (errors) => {
    const errValContainers = [
      "nameValidationErr",
      "descriptionValidationErr",
      "dateValidationErr",
    ];
    let errsToDisplay = [];
    if (errors) {
      errors.forEach((err) => {
        errValContainers.forEach((id) => {
          if (err.keyVal === id)
            errsToDisplay.push({ id, errMessage: err.errMessage });
          document.getElementById(id).innerHTML = "";
        });
      });

      errsToDisplay.forEach((err) => {
        document.getElementById(err.id).innerHTML = err.errMessage;
      });
    } else {
      errValContainers.forEach(
        (id) => (document.getElementById(id).innerHTML = "")
      );
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <TodoForm
      onSubmit={onSubmit}
      onChange={onChange}
      nameRef={nameRef}
      descRef={descRef}
      dateRef={dateRef}
      success={success}
      method={"POST"}
    />
  );
}
