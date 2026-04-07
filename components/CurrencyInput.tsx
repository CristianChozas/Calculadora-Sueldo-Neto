"use client";

import { useId, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

type CurrencyInputProps = {
  label: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  min?: number;
  max?: number;
  error?: string;
  hint?: string;
  placeholder?: string;
};

function formatEditableValue(value: number) {
  return value.toString().replace(".", ",");
}

function parseCurrencyInput(rawValue: string) {
  const normalizedValue = rawValue
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function CurrencyInput({
  label,
  value,
  onValueChange,
  min,
  max,
  error,
  hint,
  placeholder = "30.000 €",
}: CurrencyInputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const [isFocused, setIsFocused] = useState(false);
  const [draftValue, setDraftValue] = useState("");

  const displayValue = isFocused
    ? draftValue
    : value === null
      ? ""
      : currencyFormatter.format(value);

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-primary-strong"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={displayValue}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${hint ? `${hintId} ` : ""}${errorId}` : hint ? hintId : undefined}
          onFocus={() => {
            setDraftValue(value === null ? "" : formatEditableValue(value));
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setDraftValue("");
          }}
          onChange={(event) => {
            const nextDisplayValue = event.target.value;

            setDraftValue(nextDisplayValue);
            onValueChange(parseCurrencyInput(nextDisplayValue));
          }}
          min={min}
          max={max}
          className="w-full rounded-[var(--radius-card)] border bg-surface px-4 py-3 text-lg font-semibold text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted">
          EUR
        </span>
      </div>
      {hint ? (
        <p id={hintId} className="text-sm leading-6 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
      {value !== null && min !== undefined && max !== undefined ? (
        <p className="text-xs tracking-[0.14em] text-muted uppercase">
          Rango permitido: {currencyFormatter.format(min)} a {currencyFormatter.format(max)}
        </p>
      ) : null}
    </div>
  );
}
