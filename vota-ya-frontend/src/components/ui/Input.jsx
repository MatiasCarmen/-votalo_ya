/**
 * VotaloYa - Componente Input
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Input reutilizable con iconos y validación
 */

import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ label, icon: Icon, error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300">
            <Icon size={20} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl",
            "focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 block py-3",
            "placeholder-slate-600 backdrop-blur-sm transition-all duration-300",
            Icon ? "pl-12 pr-4" : "px-4",
            error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "",
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
