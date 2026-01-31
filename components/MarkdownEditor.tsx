"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Bold, Italic, Underline, List, ListOrdered, Link, Code, Quote } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Enter markdown content...",
  height = "400px"
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = before + selectedText + after;
    
    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newValue = value.substring(0, start) + text + value.substring(start);
    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const toolbarActions = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertText("**", "**"),
      shortcut: "Ctrl+B"
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertText("*", "*"),
      shortcut: "Ctrl+I"
    },
    {
      icon: Underline,
      label: "Underline",
      action: () => insertText("<u>", "</u>"),
      shortcut: "Ctrl+U"
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertAtCursor("\n• "),
      shortcut: "Ctrl+Shift+8"
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertAtCursor("\n1. "),
      shortcut: "Ctrl+Shift+7"
    },
    {
      icon: Quote,
      label: "Quote",
      action: () => insertText("> ", ""),
      shortcut: "Ctrl+Shift+9"
    },
    {
      icon: Code,
      label: "Code",
      action: () => insertText("`", "`"),
      shortcut: "Ctrl+`"
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertText("[", "](url)"),
      shortcut: "Ctrl+K"
    }
  ];

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-neutral-900/40">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-neutral-900/60">
        <div className="flex items-center gap-1">
          {!isPreview && (
            <>
              {toolbarActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors group relative`}
                  title={`${action.label} (${action.shortcut})`}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-zinc-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {action.label}
                  </span>
                </button>
              ))}
              <div className="w-px h-6 bg-white/10 mx-1" />
            </>
          )}
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              !isPreview 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              isPreview 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Preview
          </button>
        </div>
        <div className="text-xs text-zinc-500">
          Markdown
        </div>
      </div>

      {/* Editor/Preview Content */}
      <div style={{ height }}>
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 bg-transparent text-white resize-none outline-none font-mono text-sm leading-relaxed"
            style={{ minHeight: height }}
            onKeyDown={(e) => {
              // Handle keyboard shortcuts
              if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                  case 'b':
                    e.preventDefault();
                    insertText("**", "**");
                    break;
                  case 'i':
                    e.preventDefault();
                    insertText("*", "*");
                    break;
                  case 'u':
                    e.preventDefault();
                    insertText("<u>", "</u>");
                    break;
                  case 'k':
                    e.preventDefault();
                    insertText("[", "](url)");
                    break;
                  case '`':
                    e.preventDefault();
                    insertText("`", "`");
                    break;
                  case 'Shift+7':
                    e.preventDefault();
                    insertAtCursor("\n1. ");
                    break;
                  case 'Shift+8':
                    e.preventDefault();
                    insertAtCursor("\n• ");
                    break;
                  case 'Shift+9':
                    e.preventDefault();
                    insertText("> ", "");
                    break;
                }
              }
            }}
          />
        ) : (
          <div className="p-4 h-full overflow-auto prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl font-semibold text-white mb-3 mt-5">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg font-medium text-white mb-2 mt-4">{children}</h3>,
                p: ({children}) => <p className="text-zinc-300 mb-4 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-1">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-1">{children}</ol>,
                li: ({children}) => <li className="text-zinc-300">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-emerald-500/30 pl-4 py-2 my-4 bg-emerald-500/5 text-zinc-300 italic">
                    {children}
                  </blockquote>
                ),
                code: ({node, className, children, ...props}) => {
                  const isInline = !className || !className.includes('language-');
                  return isInline ? (
                    <code className="bg-zinc-800 px-2 py-1 rounded text-emerald-400 text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-zinc-800 p-4 rounded-lg text-sm font-mono overflow-x-auto text-zinc-300" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({children}) => (
                  <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                a: ({href, children}) => (
                  <a 
                    href={href} 
                    className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                em: ({children}) => <em className="text-zinc-200">{children}</em>,
                hr: () => <hr className="border-white/10 my-6" />,
                table: ({children}) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                th: ({children}) => (
                  <th className="border border-white/20 px-4 py-2 text-left font-semibold text-white bg-zinc-800/50">
                    {children}
                  </th>
                ),
                td: ({children}) => (
                  <td className="border border-white/20 px-4 py-2 text-zinc-300">
                    {children}
                  </td>
                ),
              }}
            >
              {value || "Nothing to preview"}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
