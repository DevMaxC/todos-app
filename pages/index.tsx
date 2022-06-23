import Head from "next/head";
import Image from "next/image";
import { Ref, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { XIcon } from "@heroicons/react/solid";

interface Note {
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Array<Note>>([
    { title: "Test Element", content: "Test 1234" },
    { title: "Test Element", content: "Test 1234" },
    { title: "Test Element", content: "Test 1234" },
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
    <div className="bg-red-600">
      <h1 className="p-5 text-center text-3xl text-red-200">Todos app</h1>
      <div className="min-w-screen h-full min-h-screen w-full bg-red-600 p-2">
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
                className="relative w-full border-2 border-opacity-50 p-2 md:w-1/3"
                key={i}
              >
                <h1 className="text-xl text-red-200">{n.title}</h1>
                <h2 className="text-red-300">{n.content}</h2>
                <button
                  onClick={() => deleteNote(i)}
                  className="absolute top-2 right-2 h-5 w-5  content-center rounded-full bg-white text-center"
                >
                  <XIcon className="text-red-300"></XIcon>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-10 w-full items-center justify-around bg-red-800 text-red-300">
        <h2>Made with</h2>
        <h2>TypeScript</h2>
        <h2>Tailwind</h2>
        <h2>React</h2>
        <h2>Vercel</h2>
      </div>
    </div>
  );
}
