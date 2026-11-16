import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, Panel, Stat, Table } from "@/components/ui";
import { money, shortProperty } from "@/lib/format";
import { DEMO_LANDLORD, useStore } from "@/lib/store";

export const Route = createFileRoute("/locador/financeiro")({ component: LandlordFinancePage });

function LandlordFinancePage() {
  return (
    <RequireRole allow={["locador"]}>
      <LandlordFinance />
    </RequireRole>
  );
}

function LandlordFinance() {
  const properties = useStore((state) => state.properties);
  const revenues = useStore((state) => state.revenues);
  const mine = useMemo(() => properties.filter((item) => item.landlord === DEMO_LANDLORD), [properties]);
  const income = useMemo(
    () => revenues.filter((item) => mine.some((property) => property.id === item.propertyId)),
    [mine, revenues],
  );
  const total = income.reduce((sum, item) => sum + item.amount, 0);
  const homes = new Set(income.map((item) => item.propertyId)).size;
  const latest = income[0]?.competence ?? "—";

  return (
    <AppShell
      title="Financeiro do locador"
      subtitle="Consulte receitas e desempenho financeiro dos seus imóveis."
      crumb="Financeiro"
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Receitas registradas" value={money(total)} />
        <Stat label="Imóveis com receita" value={String(homes).padStart(2, "0")} />
        <Stat label="Último registro" value={latest} />
      </div>
      <Panel title="Atividade recente">
        <Table columns={["Imóvel", "Competência", "Receita", "Registro"]}>
          {income.map((item) => {
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
