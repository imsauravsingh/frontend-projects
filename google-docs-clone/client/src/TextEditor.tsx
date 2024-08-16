import { useCallback, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface WrapperInterface {
  node: HTMLDivElement;
  innerHtml: string;
  append: (val: HTMLDivElement) => {};
}

export default function TextEditor() {
  const quillRef = useRef<Quill | null>(null);

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
    quillRef.current = new Quill(editor, {
      theme: "snow",
    });
  }, []);

  return <div className="editor-container" ref={wrapperRef}></div>;
}
