import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttpClient } from "./useHttpClient";

const LoginANDAddBlog = (props) => {
  const backendLink = "https://elshabshiridb.herokuapp.com/";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loggedIn, setIsloggedIn] = useState(false);
  const [message, setMessage] = useState(null);

  const [userValues, setUserValues] = useState({
    username: "",
    password: "",
  });

  const [blogValues, setblogValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = (evt, type, name) => {
    let value;
    value = evt.target.value;
    name = evt.target.name;
    if (type === "user") {
      setUserValues({
        ...userValues,
        [name]: value,
      });
    } else {
      setblogValues({
        ...blogValues,
        [name]: value,
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        backendLink + "api/user/login",
        "POST",
        JSON.stringify({
          username: userValues.username,
          password: userValues.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setIsloggedIn(true);
    } catch (err) {}
  };

  const handleSubmitBlog = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        backendLink + `api/blog/create/${userValues.username}`,
        "POST",
        JSON.stringify({
          title: blogValues.title,
          description: blogValues.description,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setMessage("Blog Posted")
    } catch (err) {}
  };


  return loggedIn ? (
    <Form className="form">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control name="title" onChange={(e) => handleChange(e, "blog")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Blog Description</Form.Label>
        <Form.Control
          name="description"
          onChange={(e) => handleChange(e, "blog")}
          as="textarea"
          rows={3}
        />
        <Form.Text>{error ? error : message}</Form.Text>
      </Form.Group>
      <Button onClick={handleSubmitBlog} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  ) : (
    <Form className="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="username"
          onChange={(e) => handleChange(e, "user")}
          placeholder="Username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          name="password"
          onChange={(e) => handleChange(e, "user")}
          type="password"
          placeholder="Password"
        />
        <Form.Text>{error}</Form.Text>
      </Form.Group>

      <Button onClick={handleLogin} variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginANDAddBlog;