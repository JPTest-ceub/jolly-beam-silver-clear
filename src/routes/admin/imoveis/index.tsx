import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { ButtonLink, Panel, SearchField, SelectInput, Table } from "@/components/ui";
import { money } from "@/lib/format";
import { PROPERTY_STATUSES, useStore } from "@/lib/store";
import type { PropertyStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/imoveis/")({ component: PropertiesPage });

function PropertiesPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Properties />
    </RequireRole>
  );
}

function Properties() {
  const properties = useStore((state) => state.properties);
  const updateProperty = useStore((state) => state.updateProperty);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return properties;
    return properties.filter((property) =>
      `${property.id} ${property.type} ${property.neighborhood} ${property.landlord}`.toLowerCase().includes(term),
    );
  }, [properties, query]);

  return (
    <AppShell
      title="Gestão de imóveis"
      subtitle="Cadastre, consulte, edite e acompanhe a disponibilidade."
      crumb="Imóveis"
      action={<ButtonLink to="/admin/imoveis/novo">Cadastrar imóvel</ButtonLink>}
    >
      <Panel title="Registros e informações" action={<SearchField value={query} onChange={setQuery} placeholder="Buscar imóvel" />}>
        <Table columns={["Imóvel", "Localização", "Valor", "Disponibilidade", ""]}>
          {visible.map((property) => (
            <tr key={property.id}>
              <td className="px-5 py-4 font-medium">
                {property.id} · {property.type}
              </td>
              <td className="px-5 py-4">{property.neighborhood}</td>
              <td className="px-5 py-4">{money(property.price)}</td>
              <td className="px-5 py-4">
                <SelectInput
                  className="h-9 max-w-44"
                  value={property.status}
                  onChange={(event) => updateProperty(property.id, { status: event.target.value as PropertyStatus })}
                >
                    {PROPERTY_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </SelectInput>
              </td>
              <td className="px-5 py-4 text-right">
                <ButtonLink to="/admin/imoveis/$id" params={{ id: property.id }} variant="ghost">
                  Editar
                </ButtonLink>
              </td>
            </tr>
          ))}
        </Table>
        {visible.length === 0 ? <p className="px-5 py-8 text-sm text-muted">Nenhum imóvel encontrado.</p> : null}
      </Panel>
    </AppShell>
  );
}
