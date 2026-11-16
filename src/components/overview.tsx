import { Link } from "@tanstack/react-router";
import { AppShell } from "@/components/shell";
import { Stat, Panel, Table } from "@/components/ui";
import { money } from "@/lib/format";
import { useStore } from "@/lib/store";

const MODULES = [
  { label: "Imóveis", to: "/admin/imoveis", note: "Cadastro e disponibilidade", count: "properties" },
  { label: "Solicitações", to: "/admin/solicitacoes", note: "Interesses registrados", count: "requests" },
  { label: "Negociações", to: "/admin/negociacoes", note: "Acompanhamento", count: "negotiations" },
  { label: "Contratos", to: "/admin/contratos", note: "Registro e acompanhamento", count: "contracts" },
] as const;

export function Overview({
  title,
  subtitle,
  crumb,
  panel,
}: {
  title: string;
  subtitle: string;
  crumb: string;
  panel: string;
}) {
  const properties = useStore((state) => state.properties);
  const requests = useStore((state) => state.requests);
  const negotiations = useStore((state) => state.negotiations);
  const contracts = useStore((state) => state.contracts);
  const revenues = useStore((state) => state.revenues);
  const month = revenues.filter((item) => item.competence === "Nov/2026").reduce((sum, item) => sum + item.amount, 0);
  const open = requests.filter((item) => item.status === "Em análise" || item.status === "Em negociação").length;
  const active = negotiations.filter((item) => item.status === "Em andamento").length;
  const counts = {
    properties: properties.length,
    requests: requests.length,
    negotiations: active,
    contracts: contracts.length,
  };

  return (
    <AppShell title={title} subtitle={subtitle} crumb={crumb}>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Imóveis cadastrados" value={String(properties.length).padStart(2, "0")} />
        <Stat label="Solicitações abertas" value={String(open).padStart(2, "0")} />
        <Stat label="Negociações ativas" value={String(active).padStart(2, "0")} />
        <Stat label="Receitas no mês" value={money(month)} />
      </div>
      <Panel title={panel}>
        <Table columns={["Módulo", "Registros", "Acompanhamento"]}>
          {MODULES.map((item) => (
            <tr key={item.label}>
              <td className="px-5 py-4 font-medium">
                <Link to={item.to} className="text-blue">
                  {item.label}
                </Link>
              </td>
              <td className="px-5 py-4">{String(counts[item.count]).padStart(2, "0")}</td>
              <td className="px-5 py-4 text-muted">{item.note}</td>
            </tr>
          ))}
        </Table>
      </Panel>
    </AppShell>
  );
}
