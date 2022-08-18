import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const Home: NextPage = () => {
  const [fileName, setFileName] = useState("");

  async function login() {}

  async function handleFiles(e: HTMLInputEvent) {
    let files = e.target.files;

    if (!files) {
      console.log("No files available in the list");
    }
    const firstFile = files[0];
    const fileStream = await firstFile.arrayBuffer();
    console.log(fileStream);

    const viewer = document.querySelector(".view");
    const obj_url = URL.createObjectURL(firstFile);
    viewer.setAttribute("src", obj_url);
    URL.revokeObjectURL(obj_url);
  }

  async function postFileData(formData: any) {
    // const data = {
    //   bucketName: "testdevbucket",
    //   fileName,
    // };
    const res = await fetch("http://192.168.172.75:3005/files", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    });
    return res.json();
  }

  const logout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3005/auth/logout", {
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
    const res = await fetch("http://localhost:3005/auth/currentUser", {
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
          <li> Home</li>
          <li> Login</li>
          <li> Sign up</li>
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
