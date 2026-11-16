import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/components/overview";
import { RequireRole } from "@/components/shell";

export const Route = createFileRoute("/admin/operacoes")({ component: OperationsPage });

function OperationsPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Overview
        title="Operações da imobiliária"
        subtitle="Acompanhe informações gerais sobre a operação."
        crumb="Operações"
        panel="Visão consolidada dos módulos"
      />
    </RequireRole>
  );
}
