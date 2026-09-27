"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

type NewsSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function NewsSearch({
  value = "",
  onChange,
  placeholder = "Search news...",
}: NewsSearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (nextValue: string) => {
    setSearch(nextValue);
    onChange?.(nextValue);
  };

  const handleClear = () => {
    setSearch("");
    onChange?.("");
  };

  return (
    <div className="w-full">
      <label htmlFor="news-search" className="sr-only">
        Search news
      </label>

      <div className="relative">
        {/* Search icon */}
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        />

        <input
          id="news-search"
          type="search"
          value={search}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="
            h-12 w-full rounded-xl
            border border-card
            bg-surface
            pl-12 pr-12
            text-sm text-body
            outline-none
            placeholder:text-muted
            transition
            focus:border-brand
            focus:ring-2
            focus:ring-primary/10
          "
        />

        {/* Clear button */}
        {search.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear news search"
            className="
              absolute right-3 top-1/2
              flex h-8 w-8
              -translate-y-1/2
              items-center justify-center
              rounded-lg
              text-muted
              transition
              hover:bg-badge
              hover:text-heading
              focus:outline-none
              focus:ring-2
              focus:ring-primary/20
            "
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}