import Head from "next/head";
import Image from "next/image";
import { Ref, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { XIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface Note {
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Array<Note>>([
    { title: "Have Breakfast", content: "Toast" },
    { title: "Walk Dog", content: "2 mile walk" },
    { title: "Buy Lunch", content: "Restaurant in town" },
  ]);
  const addNote = (noteProps: Note) => {
    setNotes([...notes, noteProps]);
  };

  const deleteNote = (indie: number) => {
    console.log(notes);
    setNotes(
      notes.filter((element, index) => {
        return index != indie;
      })
    );
  };

  const titleInputRef: Ref<HTMLInputElement> = useRef();
  const descInputRef: Ref<HTMLTextAreaElement> = useRef();

  const [error, seterror] = useState<boolean>(false);

  return (
    <div className="min-w-screen relative h-full min-h-screen w-full bg-red-600">
      <Link href="https://portfolio-qnimqxkeh-gusud.vercel.app/">
        <a className="absolute top-4 right-4 cursor-pointer rounded-md bg-red-700 p-4 font-thin text-slate-300 transition-colors hover:bg-red-800 hover:text-slate-200">
          <h1>Made by Max Church </h1>
          <h2>Using:</h2>
          <h2>TypeScript, React, Tailwind, NextJS</h2>
        </a>
      </Link>

      <h1 className="p-5 text-center text-3xl text-red-200">Todos app</h1>
      <div className="bg-red-600 p-2">
        <div className="outline-rounded mx-auto mt-10 flex w-full flex-col gap-2 rounded-sm outline-hidden outline-offset-8 outline-red-500 md:w-1/3 md:outline">
          <input
            className="rounded-lg p-2 text-red-700 outline-2 outline-red-900 focus:outline"
            ref={titleInputRef}
            placeholder="Enter Title..."
          ></input>
          <textarea
            className="rounded-lg p-2 text-red-700 outline-2 outline-red-900 focus:outline"
            placeholder="Enter Description..."
            ref={descInputRef}
          ></textarea>
          {error && <h1 className="text-center text-red-300">Empty Inputs</h1>}
          <button
            className="text-white"
            onClick={() => {
              if (
                titleInputRef.current.value.length > 0 &&
                descInputRef.current.value.length > 0
              ) {
                seterror(false);
                addNote({
                  title: titleInputRef.current.value,
                  content: descInputRef.current.value,
                });

                titleInputRef.current.value = "";
                descInputRef.current.value = "";
              } else {
                seterror(true);
                if (titleInputRef.current.value.length == 0) {
                  titleInputRef.current.focus();
                } else {
                  descInputRef.current.focus();
                }
              }
            }}
          >
            Add
          </button>
        </div>

        <div className="pt-10">
          <h1 className="text-center font-semibold text-red-100">
            Outstanding items: {notes.length}
          </h1>
          <div className="flex flex-col items-center gap-2">
            {notes.map((n, i) => (
              <div
                className="relative w-full rounded-md bg-white p-2 md:w-1/3"
                key={i}
              >
                <h1 className="text-xl text-red-500">{n.title}</h1>
                <h2 className="text-red-600">{n.content}</h2>
                <button
                  onClick={() => deleteNote(i)}
                  className="absolute top-2 right-2 h-5 w-5  content-center rounded-full bg-red-600 text-center"
                >
                  <XIcon className="text-red-200"></XIcon>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
