import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell, RequireRole } from "@/components/shell";
import { ButtonLink } from "@/components/ui";

export const Route = createFileRoute("/solicitacao-enviada")({ component: SuccessPage });

function SuccessPage() {
  return (
    <RequireRole allow={["locatario"]}>
      <AppShell
        title="Solicitação enviada"
        subtitle="Confirmação do registro da solicitação."
        crumb="Solicitação enviada"
      >
        <div className="mx-auto max-w-xl rounded-xl border border-line bg-card px-6 py-12 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-light text-green">
            <Check className="size-8" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Solicitação registrada com sucesso!</h2>
          <p className="mt-2 text-sm text-muted">
            Você poderá acompanhar o andamento em Minhas solicitações.
          </p>
          <ButtonLink to="/minhas-solicitacoes" className="mt-6">
            Acompanhar solicitação
          </ButtonLink>
        </div>
      </AppShell>
    </RequireRole>
  );
}
