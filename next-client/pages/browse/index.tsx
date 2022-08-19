import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getClassrooms } from "../../lib/fetcher";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface Subject {
  id: number;
  subjectName: string;
  subjectViews: number;
  abbreviation: string;
}

const homeUrl = "http://192.168.172.86:3005";

const fetchSubjects = async () => {
  const res = await fetch(`${homeUrl}/subject`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};

const postClassroom = async (e: any) => {
  e.preventDefault();
  const formData = {
    className: (document.querySelector("#className") as HTMLInputElement).value,
    teacherName: (document.querySelector("#teacherName") as HTMLInputElement)
      .value,
    subjectName: (document.querySelector("#subjectName") as HTMLInputElement)
      .value,
    creatorEmail: "testuser@gmail.com",
  };

  const res = await fetch(`${homeUrl}/class`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  alert(data.message);
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const subjects = await fetchSubjects();
  const classrooms = await getClassrooms();
  console.log(classrooms);
  return {
    props: {
      subjects,
      classrooms,
    },
  };
};

const Browse: NextPage<{ subjects: Subject[]; classrooms: any }> = ({
  subjects,
  classrooms,
}) => {
  console.log(classrooms);
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
          <h1 className="text-lg text-yellow-700">Browse</h1>
        </header>

        <section className="flex flex-col items-center mt-10">
          <h2 className="font-bold text-xl underline"> Subjects</h2>
          {<div className=""> No subjects found </div> &&
            subjects.map((subject: Subject) => {
              return (
                <Link key={subject.id} href={`${subject.id}`}>
                  <a>{subject.subjectName}</a>
                </Link>
              );
            })}
        </section>
        <section className="flex flex-col items-center mt-10">
          <h2 className="font-bold text-xl underline"> Clasrooms</h2>
          {<div className=""> No classrooms found </div> &&
            classrooms.map((classroom: any) => {
              return (
                <Link key={classroom.id} href={`/class/${classroom.className}`}>
                  <a>{classroom.className}</a>
                </Link>
              );
            })}
        </section>

        <form className="flex flex-col items-center justify-center mt-10">
          <h3 className="font-bold ">Create Classroom Form</h3>

          <label htmlFor="">Classroom Name</label>
          <input
            id="className"
            type="text"
            className="border border-black mx-5"
          />
          <label htmlFor="">Teacher Name</label>
          <input
            id="teacherName"
            type="text"
            className="border border-black mx-5"
          />
          <label htmlFor="">Subject</label>
          <input
            id="subjectName"
            list="subjects"
            className="border border-black mx-5"
          />
          <datalist id="subjects">
            {subjects.map((subject: Subject) => {
              return (
                <option key={subject.id} value={subject.subjectName}></option>
              );
            })}
          </datalist>
          <button
            onClick={postClassroom}
            className="text-white bg-black py-2 px-3 m-3 rounded-md hover:bg-green-600 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Browse;
