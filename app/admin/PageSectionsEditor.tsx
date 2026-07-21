"use client";
import React from "react";
import { getSectionDefs, type SectionDef } from "./pageSectionDefs";
import { FileText, AlertCircle } from "lucide-react";

interface Props {
  pagePath: string;
  /** The raw value coming from DB — could be a JSON array string or plain text */
  rawValue: unknown;
  onChange: (sections: string[]) => void;
}

/**
 * User-friendly CMS page section editor.
 * Replaces the raw JSON editor in the Pages Manager.
 *
 * Parses pageSections as a string[] from DB, then renders one labelled
 * textarea per section. Non-developers never see JSON.
 */
export function PageSectionsEditor({ pagePath, rawValue, onChange }: Props) {
  const defs = getSectionDefs(pagePath);

  // Parse rawValue into string[]
  const sections: string[] = React.useMemo(() => {
    if (!rawValue) return [];
    if (Array.isArray(rawValue)) return rawValue.map(String);
    if (typeof rawValue === "string") {
      try {
        const parsed = JSON.parse(rawValue);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {}
      return rawValue ? [rawValue] : [];
    }
    return [];
  }, [rawValue]);

  const handleChange = (index: number, value: string) => {
    const next = [...sections];
    // Expand array if needed
    while (next.length <= index) next.push("");
    next[index] = value;
    onChange(next);
  };

  const handleAddSection = () => {
    onChange([...sections, ""]);
  };

  const handleRemoveSection = (index: number) => {
    const next = sections.filter((_, i) => i !== index);
    onChange(next);
  };

  // If no static defs are configured in pageSectionDefs.ts, generate dynamic generic ones
  const effectiveDefs: SectionDef[] = React.useMemo(() => {
    if (defs.length > 0) return defs;
    // Generate a default list of definitions based on current content size
    const count = Math.max(sections.length, 1);
    return Array.from({ length: count }, (_, i) => ({
      label: `Text Section #${i + 1}`,
      hint: `General text block #${i + 1} on this page`,
      multiline: true
    }));
  }, [defs, sections.length]);


  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {effectiveDefs.map((def: SectionDef, i: number) => {
          // Pre-fill with the hardcoded default text if not customized yet
          const currentValue = (sections[i] !== undefined && sections[i] !== "") ? sections[i] : (def.defaultValue || "");
          const isUnused = def.hint === "Not used on this page" || def.hint === "Not actively rendered on this page" || def.hint === "Not actively used on this page" || def.hint === "Not actively rendered";

          if (isUnused) return null;


          return (
            <div key={i} className="space-y-1.5 p-4 rounded-2xl border border-slate-100 bg-slate-50/20">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-emerald-500 shrink-0" />
                    {def.label}
                  </label>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{def.hint}</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentValue && (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Customised
                    </span>
                  )}
                  {defs.length === 0 && sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(i)}
                      className="text-[9px] font-bold text-rose-600 hover:text-rose-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              {def.multiline !== false ? (
                <textarea
                  rows={3}
                  value={currentValue}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder={def.hint}
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all leading-relaxed resize-y min-h-[85px]"
                />
              ) : (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder={def.hint}
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                />
              )}
            </div>
          );
        })}
      </div>

      {defs.length === 0 && (
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-3 border-2 border-dashed border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          + Add Page Text Section
        </button>
      )}
    </div>
  );
}

