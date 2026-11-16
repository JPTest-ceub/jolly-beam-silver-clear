import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, RequireRole } from "@/components/shell";
import { Button, ButtonLink, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { shortProperty } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/receitas")({ component: RevenuePage });

function RevenuePage() {
  return (
    <RequireRole allow={["admin"]}>
      <RevenueForm />
    </RequireRole>
  );
}

function RevenueForm() {
  const properties = useStore((state) => state.properties);
  const addRevenue = useStore((state) => state.addRevenue);
  const navigate = useNavigate();
  const [propertyId, setPropertyId] = useState("");
  const [competence, setCompetence] = useState("Nov/2026");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  function save() {
    if (!propertyId || !competence.trim() || !amount) {
      setError("Selecione o imóvel e informe competência e valor.");
      return;
    }
    addRevenue({
      propertyId,
      competence: competence.trim(),
      amount: Number(amount),
      note: note.trim() || "Receita registrada",
    });
    toast.success("Receita registrada.");
    void navigate({ to: "/admin/financeiro" });
  }

  return (
    <AppShell title="Registro de receitas" subtitle="Registre receitas mensais dos imóveis alugados." crumb="Receitas">
      <Panel title="Nova receita">
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field label="Imóvel alugado">
            <SelectInput value={propertyId} onChange={(event) => setPropertyId(event.target.value)}>
              <option value="">Selecione um imóvel</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {shortProperty(property)}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Competência">
            <TextInput value={competence} placeholder="Mês / ano" onChange={(event) => setCompetence(event.target.value)} />
          </Field>
          <Field label="Valor da receita">
            <TextInput inputMode="numeric" value={amount} placeholder="0" onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))} />
          </Field>
          <Field label="Observação">
            <TextInput value={note} placeholder="Informação complementar" onChange={(event) => setNote(event.target.value)} />
          </Field>
          <p className="text-sm text-muted sm:col-span-2">
            Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo.
          </p>
          {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button onClick={save}>Salvar receita</Button>
            <ButtonLink to="/admin" variant="secondary">
              Cancelar
            </ButtonLink>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
