/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

export function JsonEditor({
  data,
  onChange,
  name = "Root",
  level = 0
}: {
  data: any;
  onChange: (newData: any) => void;
  name?: string;
  level?: number;
}) {
  const [collapsed, setCollapsed] = useState(level > 1);

  if (Array.isArray(data)) {
    return (
      <div className={`pl-4 py-2 border-l-2 ${level === 0 ? "border-transparent" : "border-slate-200"} mb-4`}>
        <div 
          className="flex items-center gap-2 mb-2 cursor-pointer group" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />}
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{name}</span>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">List ({data.length})</span>
        </div>
        
        {!collapsed && (
          <div className="space-y-4 mt-3">
            {data.map((item, idx) => (
              <div key={idx} className="relative bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm group">
                <button
                  type="button"
                  onClick={() => {
                    const newData = [...data];
                    newData.splice(idx, 1);
                    onChange(newData);
                  }}
                  className="absolute -right-2 -top-2 w-7 h-7 bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <JsonEditor 
                  data={item} 
                  name={`Item ${idx + 1}`} 
                  level={level + 1} 
                  onChange={(newItem) => {
                    const newData = [...data];
                    newData[idx] = newItem;
                    onChange(newData);
                  }} 
                />
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => {
                const sampleItem = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : "";
                // If it's a primitive string in an array of strings, add empty string. Else copy structure
                const newItem = typeof sampleItem === 'string' ? "" : (typeof sampleItem === 'object' && sampleItem !== null ? clearObject(sampleItem) : sampleItem);
                onChange([...data, newItem]);
              }}
              className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all w-fit"
            >
              <Plus className="w-3.5 h-3.5" /> Add {name} Item
            </button>
          </div>
        )}
      </div>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div className={`pl-4 py-2 border-l-2 ${level === 0 ? "border-transparent" : "border-slate-200"} mb-2`}>
        {level > 0 && (
          <div 
            className="flex items-center gap-2 mb-3 cursor-pointer group"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />}
            <span className="text-xs font-bold text-slate-700 capitalize">{name}</span>
          </div>
        )}
        
        {!collapsed && (
          <div className="space-y-3">
            {Object.keys(data).map((key) => (
              <div key={key}>
                {typeof data[key] === 'object' && data[key] !== null ? (
                  <JsonEditor 
                    data={data[key]} 
                    name={key} 
                    level={level + 1} 
                    onChange={(newVal) => onChange({ ...data, [key]: newVal })} 
                  />
                ) : (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">{key}</label>
                    <textarea
                      value={data[key]}
                      onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner resize-y min-h-[40px]"
                      rows={typeof data[key] === 'string' && data[key].length > 100 ? 4 : 1}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Primitive Fallback (e.g. array of strings)
  return (
    <div className="mb-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">{name}</label>
      <textarea
        value={String(data)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner min-h-[40px]"
        rows={String(data).length > 100 ? 4 : 2}
      />
    </div>
  );
}

// Helper to deeply clear object values to prep for a "new" item
function clearObject(obj: any): any {
  if (Array.isArray(obj)) return [];
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = typeof obj[key] === 'string' ? "" : typeof obj[key] === 'number' ? 0 : clearObject(obj[key]);
    }
    return newObj;
  }
  return "";
}
