'use client';
import React from 'react'
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const QuillEditorLatest = ({ value, onChange, placeholder = "Write something...", required = true }) => {

  return (
    <React.Fragment>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default QuillEditorLatest;
