import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, Button, ButtonLink, EmptyState, SelectInput } from "@/components/ui";
import { moneyMonth } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { PropertyType } from "@/lib/types";

export const Route = createFileRoute("/catalogo")({ component: CatalogPage });

const LOCATIONS = ["Brasília/DF", "Asa Norte", "Asa Sul", "Lago Sul", "Lago Norte", "Águas Claras", "Sudoeste", "Park Way"];

function CatalogPage() {
  return (
    <RequireRole allow={["locatario"]}>
      <Catalog />
    </RequireRole>
  );
}

function Catalog() {
  const properties = useStore((state) => state.properties);
  const [location, setLocation] = useState("Brasília/DF");
  const [type, setType] = useState<"Todos" | PropertyType>("Todos");
  const [applied, setApplied] = useState({ location: "Brasília/DF", type: "Todos" as "Todos" | PropertyType });

  const visible = useMemo(
    () =>
      properties.filter((property) => {
        const place =
          applied.location === "Brasília/DF" ||
          property.neighborhood === applied.location ||
          property.city === applied.location;
        const kind = applied.type === "Todos" || property.type === applied.type;
        return place && kind && property.status !== "Indisponível";
      }),
    [applied, properties],
  );

  return (
    <AppShell
      title={visible.length === 0 ? "Nenhum imóvel encontrado" : "Catálogo de imóveis"}
      subtitle={
        visible.length === 0
          ? "Estado vazio após a aplicação de filtros."
          : "Explore imóveis disponíveis para aluguel."
      }
      crumb="Catálogo de imóveis"
    >
      <div className="mb-6 grid gap-3 rounded-xl border border-line bg-card p-4 md:grid-cols-[1fr_16rem_auto] md:items-end">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Localização</span>
          <SelectInput value={location} onChange={(event) => setLocation(event.target.value)}>
            {LOCATIONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Tipo de imóvel</span>
          <SelectInput value={type} onChange={(event) => setType(event.target.value as "Todos" | PropertyType)}>
            {["Todos", "Apartamento", "Casa", "Studio"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </label>
        <Button onClick={() => setApplied({ location, type })}>Aplicar filtros</Button>
      </div>
      {visible.length === 0 ? (
        <div className="rounded-xl border border-line bg-card">
          <EmptyState
            title="Não encontramos imóveis com esses filtros"
            text="Tente ajustar a localização ou o tipo de imóvel."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setLocation("Brasília/DF");
                  setType("Todos");
                  setApplied({ location: "Brasília/DF", type: "Todos" });
                }}
              >
                Limpar filtros
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((property) => (
            <article key={property.id} className="overflow-hidden rounded-xl border border-line bg-card">
              <img
                src={property.image}
                alt={`${property.type} em ${property.neighborhood}`}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <Badge status={property.status} />
                <h2 className="mt-3 text-lg font-semibold">
                  {property.type} · {property.neighborhood}
                </h2>
                <p className="mt-1 text-xl font-bold text-navy">{moneyMonth(property.price)}</p>
                <p className="mt-2 text-sm text-muted">
                  {property.beds} quartos · {property.parking} vaga{property.parking === 1 ? "" : "s"} · {property.area} m²
                </p>
                <ButtonLink to="/imovel/$id" params={{ id: property.id }} className="mt-5">
                  Ver detalhes
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
