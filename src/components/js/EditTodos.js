import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./CustomHooks";
import { herokuServer } from "./serverUrl";
import TodoForm from "./TodoForm";

export default function EditTodos() {
  const nameRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  const [state, setState] = useState();
  const [body, setBody] = useState();
  const [success, setSuccess] = useState(false);

  const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [data, error] = useFetch(`${herokuServer}/getTodo/${id}`);

  useEffect(() => {
    setState(data);
    if (state) {
      nameRef.current.value = state.name;
      descRef.current.value = state.description;
      dateRef.current.value = state.date;
    }
    setBody({
      name: nameRef.current.value,
      description: descRef.current.value,
      date: dateRef.current.value,
    });
  }, [state, id, data]);

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
      const res = await fetch(`${herokuServer}/editTodo/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (resData.error) {
        displayValidationErr(resData.errors);
        throw new Error(resData.error);
      } else {
        setBody();
        [nameRef, descRef, dateRef].forEach((i) => (i.current.value = ""));
        displayValidationErr(null);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayValidationErr = (errors) => {
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

  return (
    <TodoForm
      onSubmit={onSubmit}
      onChange={onChange}
      nameRef={nameRef}
      descRef={descRef}
      dateRef={dateRef}
      success={success}
      method={"UPDATE"}
    />
  );
}
