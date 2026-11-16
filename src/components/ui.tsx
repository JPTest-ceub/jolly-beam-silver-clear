import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Home } from "lucide-react";
import { toneFor } from "@/lib/format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const variants = {
  primary: "bg-blue text-white hover:opacity-90",
  secondary: "border border-line bg-card text-ink hover:bg-canvas",
  ghost: "text-blue hover:bg-blue-light",
};

type Variant = keyof typeof variants;

const buttonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  variant = "primary",
  className,
  type,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type ?? "button"} className={cn(buttonClass, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: LinkProps & { variant?: Variant; className?: string }) {
  return <Link className={cn(buttonClass, variants[variant], className)} {...props} />;
}

export function Badge({ status }: { status: string }) {
  const tone = toneFor(status);
  const styles = {
    green: "bg-green-light text-green",
    amber: "bg-amber-light text-amber",
    blue: "bg-blue-light text-blue",
    red: "bg-danger-light text-danger",
    muted: "bg-canvas text-muted",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", styles[tone])}>
      {status}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-line bg-card px-5 py-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-ink">{value}</p>
    </article>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Table({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs font-semibold tracking-wide text-muted">
            {columns.map((column) => (
              <th key={column} className="px-5 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

export const controlClass =
  "h-11 w-full rounded-lg border border-line bg-card px-3 text-sm text-ink outline-none ring-blue/30 placeholder:text-muted focus:ring-2";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function AreaInput({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "h-28 py-2", className)} {...props} />;
}

export function SelectInput({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClass, className)} {...props} />;
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-light text-blue">
        <Home className="size-7" />
      </div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted">{text}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder = "Buscar",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-10 w-full max-w-xs rounded-lg border border-line bg-card px-3 text-sm outline-none ring-blue/30 focus:ring-2"
    />
  );
}
