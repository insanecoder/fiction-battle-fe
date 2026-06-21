import { useEffect, useRef, useState } from "react";
import type { PostsFilter } from "./PostComponent";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type TagOption = {
  _id: string;
  type: "person" | "place" | "artifact" | "event";
  label: string;
  universe: "HP" | "GOT";
};

type TabType = "person" | "place" | "artifact" | "event";

const TAB_LABELS: Record<TabType, string> = {
  person:   "Person",
  place:    "Place",
  artifact: "Artifact",
  event:    "Event",
};

const UNIVERSES = ["HP", "GOT"] as const;

type Props = {
  onFilterChange: (filter: PostsFilter) => void;
};

export default function FilterSelectionComponent({ onFilterChange }: Props) {
  const [activeTab, setActiveTab]       = useState<TabType>("person");
  const [searchText, setSearchText]     = useState("");
  const [tagResults, setTagResults]     = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [universe, setUniverse]         = useState<("HP" | "GOT")[]>([]);
  const [postSearch, setPostSearch]     = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }
  const controller = new AbortController();
  debounceRef.current = setTimeout(async () => {
    try {
      // only restrict by universe when exactly one is selected; "All" and both = no filter
      const universeParam = universe.length === 1 ? `&universe=${universe[0]}` : "";
      const url = `${BASE_URL}v1/posts/tags/search?q=${encodeURIComponent(searchText)}&type=${activeTab}${universeParam}`;

      const res = await fetch(url, {
        signal: controller.signal,
      });

      const json = await res.json();
      setTagResults(json.data ?? []);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setTagResults([]);
    }
  }, 300);

  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    controller.abort();
  };
}, [searchText, activeTab, universe]);

  // Emit filter up whenever selected tags, universe, or post search changes
  useEffect(() => {
    const filter: PostsFilter = {};
    if (postSearch.trim()) filter.text = postSearch.trim();
    if (universe.length)   filter.universe = universe;

    const ids = (type: TabType) => selectedTags.filter((t) => t.type === type).map((t) => t._id);
    const person    = ids("person");    if (person.length)    filter.person    = person;
    const place     = ids("place");     if (place.length)     filter.place     = place;
    const artifacts = ids("artifact");  if (artifacts.length) filter.artifacts = artifacts;
    const events    = ids("event");     if (events.length)    filter.events    = events;

    onFilterChange(filter);
  }, [selectedTags, universe, postSearch, onFilterChange]);

  const toggleTag = (tag: TagOption) => {
    const isRemoving = selectedTags.some((t) => t._id === tag._id);
    setSelectedTags((prev) =>
      isRemoving ? prev.filter((t) => t._id !== tag._id) : [...prev, tag]
    );
    if (!isRemoving) {
      setUniverse((prev) => prev.includes(tag.universe) ? prev : [tag.universe]);
    }
  };

  const toggleUniverse = (u: "HP" | "GOT") => {
    setUniverse((prev) =>
      prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
    );
  };

  const isSelected = (tag: TagOption) => selectedTags.some((t) => t._id === tag._id);

  return (
    <div className="card flex flex-col gap-3">
      <input
        className="card m-0 pl-7 p-3 w-full"
        type="text"
        placeholder="Search posts..."
        value={postSearch}
        onChange={(e) => setPostSearch(e.target.value)}
      />

      <hr className="my-3 border w-[95%] self-center border-primary-tint/50 dark:border-dark-border/20" />

      {/* Universe filter */}
      <div className="space-x-1">
        <button
          data-type="filter"
          data-active={universe.length === 0 ? "true" : undefined}
          className="pills py-3 px-5"
          onClick={() => setUniverse([])}
        >
          All
        </button>
        {UNIVERSES.map((u) => (
          <button
            key={u}
            data-type="filter"
            data-active={universe.includes(u) ? "true" : undefined}
            className="pills py-2 px-5"
            onClick={() => toggleUniverse(u)}
          >
            {u === "HP" ? "Harry Potter" : "Game Of Thrones"}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div className="card m-0 rounded-md">
        <div className="space-x-2">
          {(Object.keys(TAB_LABELS) as TabType[]).map((tab) => (
            <div
              key={tab}
              className={`filter-tabs ${activeTab === tab ? "border-b-2 transform scale-110 border-b-primary-shade dark:border-b-dark-border" : ""}`}
              onClick={() => { setActiveTab(tab); setSearchText(""); setTagResults([]); }}
            >
              {TAB_LABELS[tab]}
            </div>
          ))}
        </div>

        <input
          className="card p-1 py-2 pl-7 m-0 mt-3 w-[40%]"
          type="text"
          placeholder={`Search ${TAB_LABELS[activeTab].toLowerCase()}s...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Search results */}
        {tagResults.length > 0 && (
          <div className="space-x-2 mt-3 max-h-32 overflow-scroll">
            {tagResults.map((t) => (
              <div
                key={t._id}
                data-type="filter"
                data-active={isSelected(t) ? "true" : undefined}
                className="pills py-2 px-4 cursor-pointer"
                onClick={() => toggleTag(t)}
              >
                {t.label}
              </div>
            ))}
          </div>
        )}

        {/* Selected tags */}
        {selectedTags.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-slate-400 dark:text-dark-muted mb-1">Active filters:</p>
            <div className="space-x-2 flex flex-wrap gap-y-2">
              {selectedTags.map((t) => (
                <div
                  key={t._id}
                  data-type="filter"
                  data-active="true"
                  className="pills py-1 px-3 cursor-pointer text-sm"
                  onClick={() => toggleTag(t)}
                >
                  {t.label} ×
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
