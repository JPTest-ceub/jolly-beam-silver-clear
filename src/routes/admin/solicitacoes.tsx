import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { ButtonLink, Panel, SearchField, SelectInput, Table } from "@/components/ui";
import { formatDate, shortProperty } from "@/lib/format";
import { REQUEST_STATUSES, useStore } from "@/lib/store";
import type { RequestStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/solicitacoes")({ component: RequestsPage });

function RequestsPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Requests />
    </RequireRole>
  );
}

function Requests() {
  const requests = useStore((state) => state.requests);
  const properties = useStore((state) => state.properties);
  const updateRequestStatus = useStore((state) => state.updateRequestStatus);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return requests.filter((request) => {
      const property = properties.find((item) => item.id === request.propertyId);
      const label = `${request.id} ${request.name} ${property ? shortProperty(property) : ""}`.toLowerCase();
      return !term || label.includes(term);
    });
  }, [properties, query, requests]);

  return (
    <AppShell
      title="Solicitações de aluguel"
      subtitle="Consulte e acompanhe os interesses dos locatários."
      crumb="Solicitações"
      action={
        <ButtonLink to="/admin/negociacoes" variant="secondary">
          Acompanhar negociações
        </ButtonLink>
      }
    >
      <Panel title="Registros e informações" action={<SearchField value={query} onChange={setQuery} placeholder="Buscar solicitação" />}>
        <Table columns={["Protocolo", "Interessado", "Imóvel", "Data", "Situação"]}>
          {visible.map((request) => {
            const property = properties.find((item) => item.id === request.propertyId);
            return (
              <tr key={request.id}>
                <td className="px-5 py-4 font-medium">{request.id}</td>
                <td className="px-5 py-4">{request.name}</td>
                <td className="px-5 py-4">{property ? shortProperty(property) : request.propertyId}</td>
                <td className="px-5 py-4 text-muted">{formatDate(request.date)}</td>
                <td className="px-5 py-4">
                  <SelectInput
                    className="h-9 max-w-48"
                    value={request.status}
                    onChange={(event) => updateRequestStatus(request.id, event.target.value as RequestStatus)}
                  >
                    {REQUEST_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </SelectInput>
                </td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </AppShell>
  );
}
