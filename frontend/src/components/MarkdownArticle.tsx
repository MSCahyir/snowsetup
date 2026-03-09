import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownArticleProps {
  content: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const components: Components = {
  h2: ({ children }) => {
    const text = String(children);
    return (
      <h2 id={slugify(text)} className="mt-10 scroll-mt-28 text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = String(children);
    return (
      <h3 id={slugify(text)} className="mt-8 scroll-mt-28 text-xl font-semibold text-slate-100 tracking-tight">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="mt-4 text-base leading-8 text-slate-200">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 space-y-2 list-disc pl-6 text-slate-200">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 space-y-2 list-decimal pl-6 text-slate-200">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="font-medium text-cyan-300 underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-200">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-cyan-400/70 bg-slate-800/60 px-4 py-3 italic text-slate-200">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-cyan-200">{children}</code>
  ),
  pre: ({ children }) => <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-900 p-4 border border-slate-700">{children}</pre>,
  hr: () => <hr className="my-8 border-slate-700" />,
  table: ({ children }) => <table className="mt-6 w-full border-collapse overflow-hidden rounded-xl border border-slate-700">{children}</table>,
  thead: ({ children }) => <thead className="bg-slate-800 text-slate-100">{children}</thead>,
  tbody: ({ children }) => <tbody className="bg-slate-900/60">{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-slate-700">{children}</tr>,
  th: ({ children }) => <th className="px-3 py-2 text-left text-sm font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-sm text-slate-200">{children}</td>,
};

export default function MarkdownArticle({ content }: Readonly<MarkdownArticleProps>) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{content}</ReactMarkdown>;
}
