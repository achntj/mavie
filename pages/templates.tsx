import { useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism-tomorrow.css";
import Link from "next/link";

export default function Templates() {
  const initText =
    "---\ntitle: Post 1\ndate: 12/12/22\n---\n\nCreate a template by editing this.";
  const [text, setText] = useState(initText);
  return (
    <div className="m-10 prose">
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-0">Templates</h1>
        <p className="text-sm mt-0">
          Save a template as per you blog post schema.
        </p>
        <Link href="/">Home</Link>
      </div>
      <button
        className="rounded p-1 bg-emerald-200 mb-2"
        onClick={() => {
          localStorage.setItem("mavieTemplate", text);
          Router.push("/");
        }}
      >
        Create!
      </button>
      <div className="sandbox flex border border-neutral-200">
        <div className="w-1/2">
          <textarea
            className="resize-none outline-none box-border w-full h-full p-2"
            placeholder="Start writing!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <hr className="h-full border border-neutral-200 w-0" />
        <div className="w-1/2 break-words overflow-y-scroll p-2">
          <h2 className="text-neutral-400 mt-0">Preview</h2>
          <hr className="!mb-5" />
          <ReactMarkdown
            children={text || "Start typing for instant preview! — ʕ•ᴥ•ʔ"}
            remarkPlugins={[remarkGfm, remarkFrontmatter]}
            rehypePlugins={[rehypePrism]}
          />
        </div>
      </div>
    </div>
  );
}
