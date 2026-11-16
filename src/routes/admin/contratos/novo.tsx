import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, RequireRole } from "@/components/shell";
import { Button, ButtonLink, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { shortProperty } from "@/lib/format";
import { CONTRACT_STATUSES, useStore } from "@/lib/store";
import type { ContractStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/contratos/novo")({ component: NewContractPage });

function NewContractPage() {
  return (
    <RequireRole allow={["admin"]}>
      <NewContract />
    </RequireRole>
  );
}

function NewContract() {
  const properties = useStore((state) => state.properties);
  const addContract = useStore((state) => state.addContract);
  const navigate = useNavigate();
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? "");
  const [landlord, setLandlord] = useState(properties[0]?.landlord ?? "");
  const [tenant, setTenant] = useState("");
  const [status, setStatus] = useState<ContractStatus>("Rascunho");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  function save() {
    if (!propertyId || !landlord.trim() || !tenant.trim()) {
      setError("Selecione o imóvel e informe locador e locatário.");
      return;
    }
    addContract({
      propertyId,
      landlord: landlord.trim(),
      tenant: fileName ? `${tenant.trim()}` : tenant.trim(),
      status,
    });
    toast.success("Contrato registrado.");
    void navigate({ to: "/admin/contratos" });
  }

  return (
    <AppShell title="Registrar contrato" subtitle="Registre e acompanhe um contrato de aluguel." crumb="Registrar contrato">
      <Panel title="Dados do contrato">
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field label="Imóvel relacionado">
            <SelectInput
              value={propertyId}
              onChange={(event) => {
                const next = event.target.value;
                setPropertyId(next);
                const property = properties.find((item) => item.id === next);
                if (property) setLandlord(property.landlord);
              }}
            >
              <option value="">Selecione o imóvel</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.id} · {shortProperty(property)}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Locador">
            <TextInput value={landlord} placeholder="Selecione o locador" onChange={(event) => setLandlord(event.target.value)} />
          </Field>
          <Field label="Locatário">
            <TextInput value={tenant} placeholder="Selecione o locatário" onChange={(event) => setTenant(event.target.value)} />
          </Field>
          <Field label="Acompanhamento">
            <SelectInput value={status} onChange={(event) => setStatus(event.target.value as ContractStatus)}>
              {CONTRACT_STATUSES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Anexar contrato">
              <input
                type="file"
                className="block w-full text-sm text-muted file:mr-4 file:h-10 file:rounded-lg file:border-0 file:bg-blue-light file:px-4 file:font-semibold file:text-blue"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </Field>
            <p className="mt-2 text-sm text-muted">
              {fileName ? `Arquivo indicado: ${fileName}. ` : ""}
              Campos e regras contratuais devem ser confirmados fora deste protótipo.
            </p>
          </div>
          {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button onClick={save}>Salvar contrato</Button>
            <ButtonLink to="/admin/contratos" variant="secondary">
              Cancelar
            </ButtonLink>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
