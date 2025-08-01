import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

  
    const { data, error } = await signUp(email, password);
console.log("Signup successful:", data);


    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Account created! Please check your email to confirm.");
      setTimeout(() => navigate("/login"), 3000); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>

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
              placeholder="At least 6 characters"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {errorMsg && <p className="text-red-500 mt-4 text-sm text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mt-4 text-sm text-center">{successMsg}</p>}

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
