
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Passwordfield = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-indigo-100 mb-2"
      >
        {props.label}
      </label>

      {/* Input and Eye icon container */}
      <div className="relative">
        <input
          id={props.name}
          name={props.name}
          type={showPassword ? 'text' : 'password'}
          placeholder={props.placeholder}
          value={props.password}
          onChange={props.handlepassword}
          required={props.required}
          aria-invalid={!!props.error}
          aria-describedby={
            props.error ? `${props.name}-error` : undefined
          }
          className={`w-full rounded-lg px-4 py-3 pr-12
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

        {/* Eye icon */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-indigo-300 hover:text-indigo-100
            transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

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

export default Passwordfield;
