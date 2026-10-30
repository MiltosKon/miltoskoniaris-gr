import { useRef, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";

function CodeBlock({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative rounded-lg border bg-card">
      <button
        type="button"
        aria-label="Copy code"
        onClick={() => {
          navigator.clipboard.writeText(ref.current?.innerText ?? "");
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="press absolute right-2 top-2 rounded-md border bg-secondary p-1.5 text-muted-foreground opacity-70 hover:text-foreground group-hover:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-melon" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre ref={ref}>{children}</pre>
    </div>
  );
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={{ pre: ({ children }) => <CodeBlock>{children}</CodeBlock> }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
