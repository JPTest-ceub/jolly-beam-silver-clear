import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/components/overview";
import { RequireRole } from "@/components/shell";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  return (
    <RequireRole allow={["admin"]}>
      <Overview
        title="Visão geral administrativa"
        subtitle="Acompanhe os principais módulos e a atividade recente."
        crumb="Visão geral"
        panel="Atividade recente"
      />
    </RequireRole>
  );
}
