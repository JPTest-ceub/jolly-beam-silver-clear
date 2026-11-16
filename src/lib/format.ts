import type { Property } from "@/lib/types";

export function money(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function moneyMonth(value: number) {
  return `${money(value)} / mês`;
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function shortProperty(property: Pick<Property, "type" | "neighborhood">) {
  const kind = property.type === "Apartamento" ? "Apto." : property.type;
  return `${kind} ${property.neighborhood}`;
}

export function nextCode(prefix: string, ids: string[]) {
  const max = ids.reduce((acc, id) => {
    const value = Number(id.replace(/\D/g, ""));
    return Number.isFinite(value) ? Math.max(acc, value) : acc;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

const green = new Set([
  "Disponível",
  "Concluída",
  "Ativo",
  "Registrada",
  "Recebido",
  "Conferido",
  "Finalizada",
]);
const amber = new Set([
  "Em análise",
  "Em negociação",
  "Em andamento",
  "Pendente",
  "Documentação",
  "Documentação solicitada",
  "Proposta recebida",
  "Rascunho",
]);
const blue = new Set(["Em locação"]);
const red = new Set(["Recusada", "Indisponível", "Encerrado"]);

export function toneFor(status: string) {
  if (green.has(status)) return "green" as const;
  if (amber.has(status)) return "amber" as const;
  if (blue.has(status)) return "blue" as const;
  if (red.has(status)) return "red" as const;
  return "muted" as const;
}
