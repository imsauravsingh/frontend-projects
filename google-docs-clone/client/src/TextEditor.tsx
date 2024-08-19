import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";

interface WrapperInterface {
  node: HTMLDivElement;
  innerHtml: string;
  append: (val: HTMLDivElement) => {};
}

export default function TextEditor() {
  const quillRef = useRef<Quill | null>(null);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [quill, setQuill] = useState<Quill | undefined>(undefined);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      console.log("receive changes----", delta);

      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket?.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((instance: HTMLDivElement | null): void => {
    if (instance == null || quillRef.current != null) return;

    // Creating a WrapperInterface from the instance
    const wrapper: WrapperInterface = {
      node: instance,
      innerHtml: instance.innerHTML,
      append: (val: HTMLDivElement) => instance.appendChild(val),
    };

    // Clear innerHTML and set up the editor
    wrapper.innerHtml = "";
    const editor = document.createElement("div");

    wrapper.append(editor);
    // Initialize Quill editor only once
    const q = (quillRef.current = new Quill(editor, {
      theme: "snow",
    }));
    setQuill(q);
  }, []);

  return <div className="editor-container" ref={wrapperRef}></div>;
}
