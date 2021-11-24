import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import API from '../API';
// Components
import Button from "./Button";
// Styles
import { Wrapper } from "./Login.styles";
// Context
import { LoginContext } from "../context";

const Login = () => {
  const usernameInputName: string = 'username';
  const passwordInputName: string = 'password';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const name: string = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    if (name === usernameInputName) setUsername(value);
    else if (name === passwordInputName) setPassword(value);
  };

  const handleSubmit = async () => {
    setError(false);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(requestToken, username, password);
      console.log(sessionId);
      setUser({ sessionId: sessionId.session_id, username });
      navigate('/');
    } catch {
      setError(true);
    }
  };

  return (
    <Wrapper>
      {error && <div className="error">An error occured!</div>}
      <label>Username:</label>
      <input type='text' value={username} name={usernameInputName} onChange={handleInput} />
      <input type='password' value={password} name={passwordInputName} onChange={handleInput} />
      <Button text='Login' callback={handleSubmit} />
    </Wrapper>
  )
}

export default Login