import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, ButtonLink, Panel, Stat, Table } from "@/components/ui";
import { money, shortProperty } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/financeiro")({ component: FinancePage });

function FinancePage() {
  return (
    <RequireRole allow={["admin"]}>
      <Finance />
    </RequireRole>
  );
}

function Finance() {
  const revenues = useStore((state) => state.revenues);
  const properties = useStore((state) => state.properties);
  const total = revenues.reduce((sum, item) => sum + item.amount, 0);
  const homes = new Set(revenues.map((item) => item.propertyId)).size;

  return (
    <AppShell
      title="Informações financeiras"
      subtitle="Consulte receitas e desempenho financeiro da operação."
      crumb="Financeiro"
      action={<ButtonLink to="/admin/receitas">Registrar receita</ButtonLink>}
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Receitas registradas" value={money(total)} />
        <Stat label="Imóveis com receita" value={String(homes).padStart(2, "0")} />
        <Stat label="Competência" value="Nov/2026" />
      </div>
      <Panel title="Atividade recente">
        <Table columns={["Imóvel", "Competência", "Receita", "Registro"]}>
          {revenues.map((item) => {
            const property = properties.find((property) => property.id === item.propertyId);
            return (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{property ? shortProperty(property) : item.propertyId}</td>
                <td className="px-5 py-4">{item.competence}</td>
                <td className="px-5 py-4">{money(item.amount)}</td>
                <td className="px-5 py-4">
                  <Badge status="Registrada" />
                </td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </AppShell>
  );
}
