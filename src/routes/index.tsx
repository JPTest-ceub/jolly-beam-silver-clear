import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, KeyRound, Shield } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Access });

const PROFILES: {
  role: Role;
  to: "/catalogo" | "/locador" | "/admin";
  title: string;
  text: string;
  action: string;
  icon: typeof KeyRound;
}[] = [
  {
    role: "locatario",
    to: "/catalogo",
    title: "Locatário",
    text: "Consulta imóveis e acompanha solicitações de aluguel.",
    action: "Entrar como Locatário",
    icon: KeyRound,
  },
  {
    role: "locador",
    to: "/locador",
    title: "Locador",
    text: "Acompanha negociações e informações financeiras dos seus imóveis.",
    action: "Entrar como Locador",
    icon: Building2,
  },
  {
    role: "admin",
    to: "/admin",
    title: "Administrador",
    text: "Gerencia a operação completa da imobiliária.",
    action: "Entrar como Administrador",
    icon: Shield,
  },
];

function Access() {
  const setRole = useStore((state) => state.setRole);
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,570px)_1fr]">
      <section className="relative flex flex-col justify-between overflow-hidden bg-navy px-8 py-12 text-white sm:px-16 sm:py-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-blue">
              <Building2 className="size-5" />
            </span>
            <p className="text-3xl font-bold">MeuImóvel</p>
          </div>
          <h1 className="mt-16 max-w-md text-3xl font-bold leading-tight">
            Gestão imobiliária mais simples, organizada e rastreável.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
            Centralize imóveis, solicitações, negociações, contratos e o financeiro da imobiliária.
          </p>
        </div>
        <p className="mt-12 text-sm text-white/60">Protótipo acadêmico · Dados ilustrativos</p>
      </section>
      <section className="flex flex-col justify-center bg-canvas px-6 py-12 sm:px-12 lg:px-16">
        <p className="text-xs font-semibold tracking-widest text-blue">BEM-VINDO AO SISTEMA</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Acesse seu ambiente</h2>
        <p className="mt-2 text-sm text-muted">Selecione o perfil para iniciar a demonstração.</p>
        <div className="mt-8 flex max-w-2xl flex-col gap-4">
          {PROFILES.map((profile) => {
            const Icon = profile.icon;
            return (
              <article key={profile.role} className="flex flex-col gap-4 rounded-xl border border-line bg-card p-5 sm:flex-row sm:items-center">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{profile.title}</h3>
                  <p className="text-sm text-muted">{profile.text}</p>
                </div>
                <button
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-blue px-4 text-sm font-semibold text-white"
                  onClick={() => {
                    setRole(profile.role);
                    void navigate({ to: profile.to });
                  }}
                >
                  {profile.action}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
