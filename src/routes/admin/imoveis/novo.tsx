import { createFileRoute } from "@tanstack/react-router";
import { PropertyForm } from "@/components/property-form";
import { AppShell, RequireRole } from "@/components/shell";

export const Route = createFileRoute("/admin/imoveis/novo")({ component: NewPropertyPage });

function NewPropertyPage() {
  return (
    <RequireRole allow={["admin"]}>
      <AppShell title="Cadastro de imóvel" subtitle="Registre as informações do imóvel." crumb="Cadastro de imóvel">
        <PropertyForm />
      </AppShell>
    </RequireRole>
  );
}
