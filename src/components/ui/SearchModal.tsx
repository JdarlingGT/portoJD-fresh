import { useEffect, useRef, useState } from "react";
import type MiniSearch from "minisearch";
import { buildSearchIndex, SearchDoc } from "../../lib/search-index";

type SearchModalProps = {
  readonly open: boolean;
  readonly onClose: () => void;
};

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchDoc[]>([]);
  const [mini, setMini] = useState<MiniSearch<SearchDoc> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const { mini: searchIndex } = await buildSearchIndex();
      setMini(searchIndex);
      setTimeout(() => inputRef.current?.focus(), 0);
    })();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!mini) return;
    if (!q) {
      setRes([]);
      return;
    }

  const hits = mini.search(q, { prefix: true, fuzzy: 0.2 }) as unknown as Array<SearchDoc & { score?: number }>;
    const normalizedResults = hits.map(({ id, type, title, summary, url, tags }) => ({
      id,
      type,
      title,
      summary,
      url,
      tags
    }));
    setRes(normalizedResults);
  }, [q, mini]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden">
        <div className="p-3 border-b border-white/10">
          <input
            ref={inputRef}
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search case studies, projects…"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500" />
        </div>
        <div className="max-h-[60vh] overflow-auto divide-y divide-white/10">
          {res.length === 0 && <div className="p-4 text-gray-400 text-sm">Type to search.</div>}
          {res.map((result) => (
            <a key={result.id} href={result.url} onClick={onClose}
               className="flex items-start gap-3 p-4 hover:bg-white/5">
              <span className="text-[10px] uppercase px-2 py-1 bg-white/10 rounded-full">{result.type}</span>
              <div>
                <div className="font-medium">{result.title}</div>
                {result.summary && <div className="text-sm text-gray-400">{result.summary}</div>}
              </div>
            </a>
          ))}
        </div>
        <div className="p-2 text-right text-xs text-gray-500">Esc to close</div>
      </div>
    </div>
  );
}
