import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, RequireRole } from "@/components/shell";
import { Button, ButtonLink, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { DOC_STATUSES, useStore } from "@/lib/store";
import type { DocStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/documentos/novo")({ component: NewDocumentPage });

function NewDocumentPage() {
  return (
    <RequireRole allow={["admin"]}>
      <NewDocument />
    </RequireRole>
  );
}

function NewDocument() {
  const requests = useStore((state) => state.requests);
  const addDocument = useStore((state) => state.addDocument);
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState(requests[0]?.id ?? "");
  const [person, setPerson] = useState("");
  const [type, setType] = useState("Identificação");
  const [status, setStatus] = useState<DocStatus>("Pendente");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  function save() {
    if (!protocol || !person.trim() || !type.trim()) {
      setError("Selecione o protocolo e informe a pessoa e o tipo de documento.");
      return;
    }
    addDocument({
      protocol,
      person: person.trim(),
      type: fileName ? `${type.trim()} · ${fileName}` : type.trim(),
      status,
    });
    toast.success("Documento registrado.");
    void navigate({ to: "/admin/documentos" });
  }

  return (
    <AppShell
      title="Registrar documento"
      subtitle="Registre um documento relacionado à solicitação de aluguel."
      crumb="Registrar documento"
    >
      <Panel title="Informações do documento">
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field label="Solicitação relacionada">
            <SelectInput value={protocol} onChange={(event) => setProtocol(event.target.value)}>
              <option value="">Selecione o protocolo</option>
              {requests.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.id} · {request.name}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Pessoa relacionada">
            <TextInput value={person} placeholder="Locador ou locatário" onChange={(event) => setPerson(event.target.value)} />
          </Field>
          <Field label="Tipo de documento">
            <SelectInput value={type} onChange={(event) => setType(event.target.value)}>
              {["Identificação", "Comprovante de renda", "Comprovante de residência", "Procuração"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Acompanhamento">
            <SelectInput value={status} onChange={(event) => setStatus(event.target.value as DocStatus)}>
              {DOC_STATUSES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Anexar arquivo">
              <input
                type="file"
                className="block w-full text-sm text-muted file:mr-4 file:h-10 file:rounded-lg file:border-0 file:bg-blue-light file:px-4 file:font-semibold file:text-blue"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </Field>
            <p className="mt-2 text-sm text-muted">Área ilustrativa para representar o envio do arquivo. O nome fica registrado na ficha.</p>
          </div>
          {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button onClick={save}>Salvar documento</Button>
            <ButtonLink to="/admin/documentos" variant="secondary">
              Cancelar
            </ButtonLink>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
