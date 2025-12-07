/* eslint-disable */
import React, { useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useLogoutUserMutation,
} from "../features/authApi";

export default function ApiTest() {
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const [triggerSession, { data: sessionData, error: sessionError }] =
    useLazyGetSessionQuery();
  const [logoutUser] = useLogoutUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await loginUser({ username, password }).unwrap();
      console.log("LOGIN OK:", res);
    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  }

  async function handleRegister() {
    try {
      const res = await registerUser({ username, password }).unwrap();
      console.log("REGISTER OK:", res);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
    }
  }

  async function handleGetSession() {
    try {
      const res = await triggerSession().unwrap();
      console.log("SESSION OK:", res);
    } catch (err) {
      console.error("SESSION ERROR:", err);
    }
  }

  async function handleLogout() {
    try {
      const res = await logoutUser().unwrap();
      console.log("LOGOUT OK:", res);
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    }
  }

  return (
    <div className="p-6">
      <h1>RTK Query Tester</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 block my-2"
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block my-2"
      />

      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
        Test Login
      </button>

      <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded ml-2">
        Test Register
      </button>

      <button onClick={handleGetSession} className="bg-yellow-500 text-black p-2 rounded ml-2">
        Test Session
      </button>

      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-2">
        Test Logout
      </button>

      {/* Exibir dados da sessão */}
      <div className="mt-4">
        <h2>Session Response:</h2>
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        <pre>{JSON.stringify(sessionError, null, 2)}</pre>
      </div>
    </div>
  );
}
