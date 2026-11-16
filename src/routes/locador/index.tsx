import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, Panel, Stat, Table } from "@/components/ui";
import { money, shortProperty } from "@/lib/format";
import { DEMO_LANDLORD, useStore } from "@/lib/store";

export const Route = createFileRoute("/locador/")({ component: LandlordPage });

function LandlordPage() {
  return (
    <RequireRole allow={["locador"]}>
      <LandlordHome />
    </RequireRole>
  );
}

function LandlordHome() {
  const properties = useStore((state) => state.properties);
  const negotiations = useStore((state) => state.negotiations);
  const revenues = useStore((state) => state.revenues);
  const mine = useMemo(() => properties.filter((item) => item.landlord === DEMO_LANDLORD), [properties]);
  const deals = useMemo(() => negotiations.filter((item) => item.landlord === DEMO_LANDLORD), [negotiations]);
  const income = useMemo(
    () => revenues.filter((item) => mine.some((property) => property.id === item.propertyId)),
    [mine, revenues],
  );
  const total = income.reduce((sum, item) => sum + item.amount, 0);
  const active = deals.filter((item) => item.status === "Em andamento").length;

  return (
    <AppShell title="Painel do locador" subtitle="Visão geral das negociações e receitas dos seus imóveis." crumb="Painel">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Imóveis vinculados" value={String(mine.length).padStart(2, "0")} />
        <Stat label="Negociações em andamento" value={String(active).padStart(2, "0")} />
        <Stat label="Receita registrada" value={money(total)} />
      </div>
      <Panel title="Atividade recente">
        <Table columns={["Imóvel", "Interessado", "Etapa"]}>
          {deals.map((item) => {
            const property = properties.find((property) => property.id === item.propertyId);
            return (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{property ? shortProperty(property) : item.propertyId}</td>
                <td className="px-5 py-4">{item.tenant}</td>
                <td className="px-5 py-4">
                  <Badge status={item.stage} />
                </td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </AppShell>
  );
}
