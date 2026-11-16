import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { Badge, ButtonLink } from "@/components/ui";
import { moneyMonth } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/imovel/$id")({ component: DetailPage });

function DetailPage() {
  const { id } = Route.useParams();
  return (
    <RequireRole allow={["locatario", "locador", "admin"]}>
      <Detail id={id} />
    </RequireRole>
  );
}

function Detail({ id }: { id: string }) {
  const property = useStore((state) => state.properties.find((item) => item.id === id));
  const role = useStore((state) => state.role);
  if (!property) {
    return (
      <AppShell title="Imóvel não encontrado" subtitle="Esse registro não está no catálogo." crumb="Detalhes do imóvel">
        <ButtonLink to="/catalogo" variant="secondary">
          Voltar ao catálogo
        </ButtonLink>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Detalhes do imóvel"
      subtitle="Consulte as informações do imóvel selecionado."
      crumb="Detalhes do imóvel"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_22rem]">
        <div>
          <img
            src={property.image}
            alt={`${property.type} em ${property.neighborhood}`}
            className="h-80 w-full rounded-xl object-cover"
          />
          <h2 className="mt-6 text-2xl font-bold">
            {property.type} · {property.neighborhood}
          </h2>
          <p className="mt-2 text-2xl font-bold text-navy">{moneyMonth(property.price)}</p>
          <p className="mt-3 text-sm text-muted">
            {property.beds} quartos · {property.parking} vaga{property.parking === 1 ? "" : "s"} · {property.area} m²
          </p>
          <h3 className="mt-8 text-lg font-semibold">Descrição do imóvel</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{property.description}</p>
        </div>
        <aside className="h-fit rounded-xl border border-line bg-card p-6">
          <h2 className="text-lg font-semibold">Resumo</h2>
          <p className="mt-5 text-sm text-muted">Código</p>
          <p className="font-semibold">{property.id}</p>
          <p className="mt-4 text-sm text-muted">Localização</p>
          <p className="font-semibold">
            {property.neighborhood} · {property.city}
          </p>
          <p className="mt-4 text-sm text-muted">Locador</p>
          <p className="font-semibold">{property.landlord}</p>
          <p className="mt-4 text-sm text-muted">Disponibilidade</p>
          <div className="mt-1">
            <Badge status={property.status} />
          </div>
          {role === "locatario" ? (
            <ButtonLink to="/solicitar/$id" params={{ id: property.id }} className="mt-6 w-full">
              Tenho interesse neste imóvel
            </ButtonLink>
          ) : null}
          {role === "admin" ? (
            <ButtonLink to="/admin/imoveis/$id" params={{ id: property.id }} className="mt-6 w-full" variant="secondary">
              Editar cadastro
            </ButtonLink>
          ) : null}
        </aside>
      </div>
    </AppShell>
  );
}
