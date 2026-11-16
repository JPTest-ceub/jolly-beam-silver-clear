import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Panel, SearchField, SelectInput, Table } from "@/components/ui";
import { shortProperty } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/negociacoes")({ component: NegotiationsPage });

const STAGES = ["Em análise", "Em negociação", "Documentação solicitada", "Proposta recebida", "Finalizada"];

function NegotiationsPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Negotiations />
    </RequireRole>
  );
}

function Negotiations() {
  const negotiations = useStore((state) => state.negotiations);
  const properties = useStore((state) => state.properties);
  const updateNegotiation = useStore((state) => state.updateNegotiation);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return negotiations.filter((item) => {
      const property = properties.find((property) => property.id === item.propertyId);
      const label = `${property ? shortProperty(property) : ""} ${item.tenant} ${item.landlord}`.toLowerCase();
      return !term || label.includes(term);
    });
  }, [negotiations, properties, query]);

  return (
    <AppShell
      title="Gestão de negociações"
      subtitle="Acompanhe as tratativas entre locadores e locatários."
      crumb="Negociações"
    >
      <Panel title="Registros e informações" action={<SearchField value={query} onChange={setQuery} placeholder="Buscar negociação" />}>
        <Table columns={["Imóvel", "Locador", "Locatário", "Etapa"]}>
          {visible.map((item) => {
            const property = properties.find((property) => property.id === item.propertyId);
            return (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{property ? shortProperty(property) : item.propertyId}</td>
                <td className="px-5 py-4">{item.landlord}</td>
                <td className="px-5 py-4">{item.tenant}</td>
                <td className="px-5 py-4">
                  <SelectInput
                    className="h-9 max-w-56"
                    value={STAGES.includes(item.stage) ? item.stage : STAGES[0]}
                    onChange={(event) =>
                      updateNegotiation(item.id, {
                        stage: event.target.value,
                        update: event.target.value,
                        status: event.target.value === "Finalizada" ? "Finalizada" : "Em andamento",
                      })
                    }
                  >
                    {STAGES.map((stage) => (
                      <option key={stage}>{stage}</option>
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
