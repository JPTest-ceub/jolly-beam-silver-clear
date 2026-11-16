import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, Panel, Table } from "@/components/ui";
import { shortProperty } from "@/lib/format";
import { DEMO_LANDLORD, useStore } from "@/lib/store";

export const Route = createFileRoute("/locador/negociacoes")({ component: LandlordNegotiationsPage });

function LandlordNegotiationsPage() {
  return (
    <RequireRole allow={["locador"]}>
      <LandlordNegotiations />
    </RequireRole>
  );
}

function LandlordNegotiations() {
  const negotiations = useStore((state) => state.negotiations);
  const properties = useStore((state) => state.properties);
  const deals = useMemo(() => negotiations.filter((item) => item.landlord === DEMO_LANDLORD), [negotiations]);

  return (
    <AppShell
      title="Negociações do locador"
      subtitle="Acompanhe as tratativas relacionadas aos seus imóveis."
      crumb="Negociações"
    >
      <Panel title="Registros e informações">
        <Table columns={["Imóvel", "Interessado", "Atualização", "Situação"]}>
          {deals.map((item) => {
            const property = properties.find((property) => property.id === item.propertyId);
            return (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{property ? shortProperty(property) : item.propertyId}</td>
                <td className="px-5 py-4">{item.tenant}</td>
                <td className="px-5 py-4">{item.update}</td>
                <td className="px-5 py-4">
                  <Badge status={item.status} />
                </td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </AppShell>
  );
}
