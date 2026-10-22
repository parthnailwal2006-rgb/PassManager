
import React from 'react';

const Inputfield = (props) => {
  return (
    <div className="p-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-indigo-100 mb-2"
      >
        {props.label}
      </label>

      <input
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.type==='email'? props.value:props.username}
        onChange={props.type==='email'? props.handlechange:props.changename}
        required={props.required}
        aria-invalid={!!props.error}
        aria-describedby={
          props.error ? `${props.name}-error` : undefined
        }
        className={`w-full rounded-lg px-4 py-3
          bg-[#17152F]/70 text-indigo-50
          placeholder:text-indigo-300/50
          border transition-all duration-200
          outline-none focus:ring-2
          ${
            props.error
              ? 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/20'
              : 'border-indigo-300/20 focus:border-indigo-400 focus:ring-indigo-400/20'
          }`}
      />

      {props.error && (
        <p
          id={`${props.name}-error`}
          className="text-rose-300 text-xs mt-2 flex items-center gap-1"
        >
          <span>⚠</span>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Inputfield;
