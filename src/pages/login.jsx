import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMsg(error.message);
    } else {
      
      navigate("/explore"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Log In to BookVerse</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        {errorMsg && <p className="text-red-500 mt-4 text-sm text-center">{errorMsg}</p>}

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
