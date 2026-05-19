import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
  FaLink,
  FaImage,
  FaCode,
} from "react-icons/fa";

const lowlight = createLowlight();

lowlight.register("javascript", javascript);
lowlight.register("html", xml);
lowlight.register("css", css);

const MenuButton = ({ onClick, active, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-md border text-sm transition-all cursor-pointer
      ${active ? "bg-black text-white" : "bg-white hover:bg-muted text-black"}`}
    >
      {children}
    </button>
  );
};

const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      Image,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight,

      TextStyle,

      Color,

      CodeBlockLowlight.configure({
        lowlight,
      }),

      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class: "min-h-[300px] outline-none px-4 py-3 prose max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // IMPORTANT FIX FOR EDIT DATA
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter Image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="border-b p-3 flex flex-wrap gap-2 bg-muted/40">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <FaBold />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <FaItalic />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <FaUnderline />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <FaStrikethrough />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <FaListUl />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <FaListOl />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <FaQuoteLeft />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <FaCode />
        </MenuButton>

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        >
          H1
        </MenuButton>

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </MenuButton>

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
        >
          H3
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </MenuButton>

        <MenuButton onClick={addLink}>
          <FaLink />
        </MenuButton>

        <MenuButton onClick={addImage}>
          <FaImage />
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </MenuButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
