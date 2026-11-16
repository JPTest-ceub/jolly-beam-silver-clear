import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { ButtonLink, Panel, SearchField, SelectInput, Table } from "@/components/ui";
import { shortProperty } from "@/lib/format";
import { CONTRACT_STATUSES, useStore } from "@/lib/store";
import type { ContractStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/contratos/")({ component: ContractsPage });

function ContractsPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Contracts />
    </RequireRole>
  );
}

function Contracts() {
  const contracts = useStore((state) => state.contracts);
  const properties = useStore((state) => state.properties);
  const updateContract = useStore((state) => state.updateContract);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return contracts.filter((item) => `${item.id} ${item.tenant} ${item.landlord}`.toLowerCase().includes(term));
  }, [contracts, query]);

  return (
    <AppShell
      title="Gestão de contratos"
      subtitle="Registre e acompanhe contratos de aluguel."
      crumb="Contratos"
      action={<ButtonLink to="/admin/contratos/novo">Registrar contrato</ButtonLink>}
    >
      <Panel title="Registros e informações" action={<SearchField value={query} onChange={setQuery} placeholder="Buscar contrato" />}>
        <Table columns={["Contrato", "Imóvel", "Envolvidos", "Acompanhamento"]}>
          {visible.map((item) => {
            const property = properties.find((property) => property.id === item.propertyId);
            return (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{item.id}</td>
                <td className="px-5 py-4">{property ? shortProperty(property) : item.propertyId}</td>
                <td className="px-5 py-4">
                  {item.tenant}
                  <span className="block text-xs text-muted">{item.landlord}</span>
                </td>
                <td className="px-5 py-4">
                  <SelectInput
                    className="h-9 max-w-40"
                    value={item.status}
                    onChange={(event) => updateContract(item.id, event.target.value as ContractStatus)}
                  >
                    {CONTRACT_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </SelectInput>
                </td>
              </tr>
            );
          })}
        </Table>
        <p className="px-5 py-4 text-sm text-muted">Campos e regras contratuais devem ser confirmados na operação real.</p>
      </Panel>
    </AppShell>
  );
}
