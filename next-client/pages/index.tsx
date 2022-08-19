import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { ChangeEventHandler, useState } from "react";
import { handleFiles, postFileData } from "../lib/fetcher";

interface HTMLInputEvent extends ChangeEventHandler<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

const devUrl = "http://192.168.172.86:3005";

const Home: NextPage = () => {
  const [fileName, setFileName] = useState("");

  async function login() {}

  const logout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await fetch(`${devUrl}/auth/logout`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const result = await res.json();
    console.log(result);
  };

  const checkCurrent = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await fetch(`${devUrl}/auth/currentUser`, {
      method: "GET",
      credentials: "same-origin",

      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const result = await res.json();
    console.log(result.message);
  };

  return (
    <>
      <nav>
        <ul className="flex gap-5 justify-end m-8">
          <Link href="/">
            <a>Home</a>
          </Link>
          <li> Login</li>
          <Link href="/browse">
            <a>Browse</a>
          </Link>
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </ul>
      </nav>

      <main className="">
        <header className="flex flex-col justify-center items-center">
          <h1 className="text-lg text-yellow-700">Minio File App</h1>
          <h2 className="">Some text...</h2>
        </header>

        <section className="flex flex-col items-center">
          <h1 className="font-bold text-xl m-5">Minio File App</h1>
          <form onSubmit={login}>
            <div className="user">
              <label htmlFor=""> Username </label>
              <input type="text" autoComplete="username" />
            </div>
            <div className="pass">
              <label htmlFor=""> Password </label>
              <input type="password" autoComplete="current-password" />
            </div>
            <button type="submit">Log in</button>
          </form>

          <form
            className="flex flex-col m-5"
            encType="multipart/form-data"
            onSubmit={postFileData}
          >
            <label
              className="font-bold my-3 text-md text-center"
              htmlFor="file"
            >
              Choose a file to upload:
            </label>
            <input
              type="file"
              className="border rounded"
              name="file"
              id=""
              onChange={handleFiles}
              accept="image/*, .pdf"
            />
            <button
              className="border font-bold mt-2 border-black rounded-md bg-black text-white px-2 py-1"
              type="submit"
            >
              Save
            </button>
          </form>

          <div className="flex gap-5 m-5">
            <Link href="http://rescirect.io:3005/auth/google">
              <a className="border rounded-md bg-green-600 text-white px-2 py-1">
                Log in GOOGLE
              </a>
            </Link>
            <button
              onClick={logout}
              className="border border-black rounded-md bg-black text-white px-2 py-1"
            >
              Log out
            </button>
            <button
              onClick={checkCurrent}
              className="border border-black rounded-md bg-black text-white px-2 py-1"
            >
              CHECK CURRENT USER
            </button>
          </div>
          <iframe className="view" frameBorder="0"></iframe>
        </section>
      </main>
    </>
  );
};

export default Home;
