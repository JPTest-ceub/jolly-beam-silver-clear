import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, RequireRole } from "@/components/shell";
import { ButtonLink, Panel, SearchField, SelectInput, Table } from "@/components/ui";
import { DOC_STATUSES, useStore } from "@/lib/store";
import type { DocStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/documentos/")({ component: DocumentsPage });

function DocumentsPage() {
  return (
    <RequireRole allow={["admin"]}>
      <Documents />
    </RequireRole>
  );
}

function Documents() {
  const documents = useStore((state) => state.documents);
  const updateDocument = useStore((state) => state.updateDocument);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return documents.filter((item) => `${item.protocol} ${item.person} ${item.type}`.toLowerCase().includes(term));
  }, [documents, query]);

  return (
    <AppShell
      title="Gestão de documentação"
      subtitle="Registre e acompanhe documentos da ficha de locação."
      crumb="Documentação"
      action={<ButtonLink to="/admin/documentos/novo">Registrar documento</ButtonLink>}
    >
      <Panel title="Registros e informações" action={<SearchField value={query} onChange={setQuery} placeholder="Buscar documento" />}>
        <Table columns={["Protocolo", "Envolvido", "Documento", "Acompanhamento"]}>
          {visible.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-4 font-medium">{item.protocol}</td>
              <td className="px-5 py-4">{item.person}</td>
              <td className="px-5 py-4">{item.type}</td>
              <td className="px-5 py-4">
                <SelectInput
                  className="h-9 max-w-44"
                  value={item.status}
                  onChange={(event) => updateDocument(item.id, event.target.value as DocStatus)}
                >
                  {DOC_STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </SelectInput>
              </td>
            </tr>
          ))}
        </Table>
        <p className="px-5 py-4 text-sm text-muted">
          Os tipos de documento, campos contratuais e estados são exemplos do protótipo.
        </p>
      </Panel>
    </AppShell>
  );
}
