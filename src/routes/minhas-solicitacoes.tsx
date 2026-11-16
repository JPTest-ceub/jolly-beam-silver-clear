import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, ButtonLink, Panel, Table } from "@/components/ui";
import { formatDate, shortProperty } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/minhas-solicitacoes")({ component: MinePage });

function MinePage() {
  return (
    <RequireRole allow={["locatario"]}>
      <Mine />
    </RequireRole>
  );
}

function Mine() {
  const requests = useStore((state) => state.requests);
  const properties = useStore((state) => state.properties);
  const mine = useMemo(() => requests.filter((item) => item.mine), [requests]);

  return (
    <AppShell
      title="Minhas solicitações"
      subtitle="Acompanhe os registros de interesse enviados por você."
      crumb="Minhas solicitações"
      action={
        <ButtonLink to="/catalogo" variant="secondary">
          Consultar imóveis
        </ButtonLink>
      }
    >
      <Panel title="Registros e informações">
        {mine.length === 0 ? (
          <p className="px-5 py-10 text-sm text-muted">Você ainda não registrou interesse em um imóvel.</p>
        ) : (
          <Table columns={["Imóvel", "Data", "Acompanhamento"]}>
            {mine.map((request) => {
              const property = properties.find((item) => item.id === request.propertyId);
              return (
                <tr key={request.id}>
                  <td className="px-5 py-4 font-medium">{property ? shortProperty(property) : request.propertyId}</td>
                  <td className="px-5 py-4 text-muted">{formatDate(request.date)}</td>
                  <td className="px-5 py-4">
                    <Badge status={request.status} />
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Panel>
    </AppShell>
  );
}
