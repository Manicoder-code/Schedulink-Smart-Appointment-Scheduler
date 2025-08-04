import React, { useState } from "react";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      setMessage(`User created: ${data.name}`);
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default RegisterUser;

