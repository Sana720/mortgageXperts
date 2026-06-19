"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const CustomEditor = () => {
  const editorRef = useRef<any>(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setLoaded(true);
  }, []);

  return { loaded, CKEditor, ClassicEditor };
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const { loaded, CKEditor, ClassicEditor } = CustomEditor();

  if (!loaded) return <div className="h-64 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">Loading Editor...</div>;

  return (
    <div className="prose max-w-none ck-editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'insertTable', 'undo', 'redo'
          ]
        }}
      />
      <style jsx global>{`
        .ck-editor-container .ck-editor__editable_inline {
          min-height: 400px;
          border-bottom-left-radius: 0.75rem !important;
          border-bottom-right-radius: 0.75rem !important;
          border-color: #e2e8f0 !important;
        }
        .ck-editor-container .ck-toolbar {
          border-top-left-radius: 0.75rem !important;
          border-top-right-radius: 0.75rem !important;
          border-color: #e2e8f0 !important;
          background: #f8fafc !important;
        }
        .ck-editor-container .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
          border-color: #e2e8f0 !important;
        }
        .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
          border-color: #3b82f6 !important;
          box-shadow: inset 0 0 0 1px #3b82f6 !important;
        }
      `}</style>
    </div>
  );
}
