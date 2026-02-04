import * as React from "react";
import { cn } from "../lib/utils";
import { Typography } from "./Typography";

/**
 * Shared Input Wrapper for Label and Helper Text
 */
interface InputWrapperProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const InputWrapper = ({ label, error, helperText, required, children, className }: InputWrapperProps) => (
  <div className={cn("flex flex-col gap-1.5 w-full", className)}>
    {label && (
      <label className="text-sm font-medium text-text-main flex gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {children}
    {error ? (
      <Typography variant="small" className="text-red-500 text-xs">
        {error}
      </Typography>
    ) : helperText ? (
      <Typography variant="small" dimmed className="text-xs">
        {helperText}
      </Typography>
    ) : null}
  </div>
);

/**
 * Base Input Styles
 */
const baseInputStyles = "w-full rounded-primitive border bg-surface-base px-3 py-2 text-base ring-offset-surface-base transition-all placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const borderStyles = "border-surface-muted focus:border-brand-accent";
const errorStyles = "border-red-500 focus:border-red-500 focus-visible:ring-red-500";

/**
 * Text Input Primitive
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => (
    <InputWrapper label={label} error={error} helperText={helperText} required={props.required}>
      <input
        ref={ref}
        className={cn(baseInputStyles, error ? errorStyles : borderStyles, className)}
        {...props}
      />
    </InputWrapper>
  )
);

/**
 * Textarea Primitive
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => (
    <InputWrapper label={label} error={error} helperText={helperText} required={props.required}>
      <textarea
        ref={ref}
        className={cn(baseInputStyles, "min-h-[100px] resize-y", error ? errorStyles : borderStyles, className)}
        {...props}
      />
    </InputWrapper>
  )
);

/**
 * Select Primitive
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => (
    <InputWrapper label={label} error={error} helperText={helperText} required={props.required}>
      <select
        ref={ref}
        className={cn(baseInputStyles, "appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem_1.25rem]", error ? errorStyles : borderStyles, className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
);

/**
 * Checkbox Primitive
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "h-4 w-4 rounded border-surface-muted text-brand-primary focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        <span className={cn("text-sm text-text-main group-hover:text-brand-primary transition-colors", props.disabled && "opacity-50")}>
          {label}
        </span>
      </label>
      {error && <Typography variant="small" className="text-red-500 text-xs">{error}</Typography>}
    </div>
  )
);
