import type { NextPage } from "next";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism-tomorrow.css";
import FileSaver from "file-saver";
import Link from "next/link";

const Home: NextPage = () => {
  let initText =
    "---\ntitle: Frontmatter works with remark-frontmatter\n---\n\nStart editing *this* text right **now** [^1]\n\n[^1]: Footnotes work with GFM (Github Flavored Markdown)!";

  const [text, setText] = useState("");
  const [gfm, setGfm] = useState(true);
  const [front, setFront] = useState(true);

  useEffect(() => {
    const template = localStorage.getItem("mavieProgress");
    if (template !== null) setText(template);
    else setText(initText);
  }, []);

  function SaveFile() {
    var blob = new Blob([text], {
      type: "text/markdown;charset=utf-8",
    });
    FileSaver.saveAs(blob, "savedFile.md");
  }

  function autoSave(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    localStorage.setItem("mavieProgress", e.target.value);
  }

  return (
    <div className="m-10 prose">
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-0">Mavié</h1>
        <p className="text-sm mt-0">
          Write your blog posts with live preview and auto save. Export to a
          markdown file when you're done!
        </p>
        <p>
          Created by{" "}
          <a href="https://achintyajha.com" target="_blank" rel="noreferrer">
            Achintya
          </a>
          . View{" "}
          <a
            href="https://github.com/achntj/mavie"
            target="_blank"
            rel="noreferrer"
          >
            Source.
          </a>
        </p>
      </div>
      <div className="sm:flex justify-between items-center mb-2">
        <button className="rounded p-1 bg-emerald-200" onClick={SaveFile}>
          Export File
        </button>
        <div className="space-x-2">
          <label>GFM</label>
          <input
            type="checkbox"
            onClick={() => setGfm(!gfm)}
            checked={gfm}
          ></input>
          <label>Frontmatter</label>
          <input
            type="checkbox"
            onClick={() => setFront(!front)}
            checked={front}
          ></input>
        </div>
      </div>
      <div className="sandbox flex border border-neutral-200">
        <div className="w-1/2 break-words overflow-y-scroll p-2">
          <h2 className="text-neutral-400 mt-0">Write</h2>
          <hr className="!mb-5" />
          <textarea
            className="resize-none outline-none box-border w-full h-full p-2"
            placeholder="Start writing!"
            value={text}
            onChange={autoSave}
          ></textarea>
        </div>
        <hr className="h-full border border-neutral-200 w-0" />
        <div className="w-1/2 break-words overflow-y-scroll p-2">
          <h2 className="text-neutral-400 mt-0">Preview</h2>
          <hr className="!mb-5" />
          <ReactMarkdown
            children={text || "Start typing for instant preview! — ʕ•ᴥ•ʔ"}
            remarkPlugins={[
              ...(gfm ? [remarkGfm] : []),
              ...(front ? [remarkFrontmatter] : []),
            ]}
            rehypePlugins={[rehypePrism]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
