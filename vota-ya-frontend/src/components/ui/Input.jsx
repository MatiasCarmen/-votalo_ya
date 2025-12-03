import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ label, icon: Icon, error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors duration-300">
            <Icon size={20} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white/50 border border-slate-200 text-slate-900 text-sm rounded-xl",
            "focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 block p-3",
            "placeholder-slate-400 backdrop-blur-sm transition-all duration-300",
            Icon ? "pl-10" : "pl-3",
            error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-1 font-medium animate-pulse">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
