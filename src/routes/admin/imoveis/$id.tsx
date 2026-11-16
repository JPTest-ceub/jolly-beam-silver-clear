import { createFileRoute } from "@tanstack/react-router";
import { PropertyForm } from "@/components/property-form";
import { AppShell, RequireRole } from "@/components/shell";

export const Route = createFileRoute("/admin/imoveis/$id")({ component: EditPropertyPage });

function EditPropertyPage() {
  const { id } = Route.useParams();
  return (
    <RequireRole allow={["admin"]}>
      <AppShell title="Cadastro de imóvel" subtitle="Atualize as informações do imóvel." crumb="Cadastro de imóvel">
        <PropertyForm propertyId={id} />
      </AppShell>
    </RequireRole>
  );
}
