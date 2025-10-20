"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername) setUsername(savedUsername);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      alert("Username minimal 3 karakter");
      return;
    }

    if (password.length < 5) {
      alert("Password 5 character");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.dispatchEvent(new Event("usernameChange"));

    alert("Login success!");
  };

  const handleReset = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setUsername("");
    setPassword("");

    window.dispatchEvent(new Event("usernameChange"));

    alert("Data berhasil direset. Header kembali ke default.");
  };

  return (
    <section className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Login <span className="text-[#00a67e]">Form</span>
      </h1>

      <div className="w-full max-w-2xl bg-[#0d1117] p-10 rounded-2xl shadow-lg space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm cursor-pointer text-[#00a67e]/90 hover:text-[#00a67e]"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Input Username"
              className="w-full p-3 rounded-lg bg-transparent border border-[#00a67e]/40 
                         text-white placeholder:text-gray-500
                         focus:outline-none focus:border-[#00a67e] 
                         focus:shadow-[0_0_10px_rgba(0,166,126,0.4)] 
                         transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm cursor-pointer text-[#00a67e]/90 hover:text-[#00a67e]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input Your Password"
              className="w-full p-3 rounded-lg bg-transparent border border-[#00a67e]/40 
                         text-white placeholder:text-gray-500
                         focus:outline-none focus:border-[#00a67e] 
                         focus:shadow-[0_0_10px_rgba(0,166,126,0.4)] 
                         transition-all"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#00a67e] text-black font-semibold 
                         rounded-lg hover:bg-[#00a67e]/90 transition-all duration-300"
            >
              Login
            </button>

            {(username || password) && (
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 text-m border border-red-500/30 
                           text-white-500 rounded-lg hover:bg-red-500/10 
                           transition-all"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
