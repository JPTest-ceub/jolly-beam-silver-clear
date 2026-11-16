import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BadgeDollarSign,
  Building2,
  ClipboardList,
  FileText,
  Handshake,
  LayoutDashboard,
  Menu,
  ScrollText,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/components/ui";
import type { Role } from "@/lib/types";
import { useStore } from "@/lib/store";

const NAV: Record<Role, { to: string; label: string; icon: typeof Search; exact?: boolean }[]> = {
  locatario: [
    { to: "/catalogo", label: "Buscar imóveis", icon: Search },
    { to: "/minhas-solicitacoes", label: "Minhas solicitações", icon: ClipboardList },
  ],
  locador: [
    { to: "/locador", label: "Painel", icon: LayoutDashboard, exact: true },
    { to: "/locador/negociacoes", label: "Negociações", icon: Handshake },
    { to: "/locador/financeiro", label: "Financeiro", icon: Wallet },
  ],
  admin: [
    { to: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
    { to: "/admin/imoveis", label: "Imóveis", icon: Building2 },
    { to: "/admin/solicitacoes", label: "Solicitações", icon: ClipboardList },
    { to: "/admin/negociacoes", label: "Negociações", icon: Handshake },
    { to: "/admin/documentos", label: "Documentação", icon: FileText },
    { to: "/admin/contratos", label: "Contratos", icon: ScrollText },
    { to: "/admin/receitas", label: "Receitas", icon: BadgeDollarSign },
    { to: "/admin/financeiro", label: "Financeiro", icon: Wallet },
    { to: "/admin/operacoes", label: "Operações", icon: Activity },
  ],
};

const ROLE_META: Record<Role, { label: string; initials: string }> = {
  locatario: { label: "LOCATÁRIO", initials: "LT" },
  locador: { label: "LOCADOR", initials: "LO" },
  admin: { label: "ADMINISTRADOR", initials: "AD" },
};

function active(path: string, to: string, exact?: boolean) {
  if (exact) return path === to;
  return path === to || path.startsWith(`${to}/`);
}

export function AppShell({
  title,
  subtitle,
  crumb,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  crumb: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const meta = role ? ROLE_META[role] : null;
  const items = role ? NAV[role] : [];

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {open ? (
        <button
          className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between px-6 pb-2 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-blue">
                <Building2 className="size-4" />
              </span>
              <p className="text-lg font-bold">MeuImóvel</p>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-widest text-white/60">{meta?.label}</p>
          </div>
          <button className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar">
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-6">
          {items.map((item) => {
            const Icon = item.icon;
            const on = active(path, item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium",
                  on ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-card px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>
            <p className="truncate text-sm text-muted">
              <span className="font-semibold text-ink">MeuImóvel</span>
              <span> / {crumb}</span>
            </p>
          </div>
          <Link
            to="/"
            onClick={() => setRole(null)}
            className="flex size-10 items-center justify-center rounded-full bg-blue-light text-sm font-bold text-blue"
            aria-label="Trocar perfil"
            title="Trocar perfil"
          >
            {meta?.initials ?? "MI"}
          </Link>
        </header>
        <main className="px-4 py-6 sm:px-8 sm:py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
            </div>
            {action}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function RequireRole({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const role = useStore((state) => state.role);
  const [ready, setReady] = useState(() => useStore.persist.hasHydrated());

  useEffect(() => {
    if (useStore.persist.hasHydrated()) {
      setReady(true);
      return;
    }
    return useStore.persist.onFinishHydration(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
        <p className="text-sm text-muted">Carregando o MeuImóvel…</p>
      </main>
    );
  }
  if (!role || !allow.includes(role)) return <Navigate to="/" />;
  return children;
}
