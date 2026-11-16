import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, RequireRole } from "@/components/shell";
import { Button, ButtonLink, Field, Panel, TextInput, AreaInput } from "@/components/ui";
import { DEMO_TENANT, useStore } from "@/lib/store";

export const Route = createFileRoute("/solicitar/$id")({ component: RequestPage });

function RequestPage() {
  const { id } = Route.useParams();
  return (
    <RequireRole allow={["locatario"]}>
      <RequestForm propertyId={id} />
    </RequireRole>
  );
}

function RequestForm({ propertyId }: { propertyId: string }) {
  const property = useStore((state) => state.properties.find((item) => item.id === propertyId));
  const submitRequest = useStore((state) => state.submitRequest);
  const navigate = useNavigate();
  const [name, setName] = useState(DEMO_TENANT.name);
  const [email, setEmail] = useState(DEMO_TENANT.email);
  const [phone, setPhone] = useState(DEMO_TENANT.phone);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!property) {
    return (
      <AppShell title="Imóvel não encontrado" subtitle="Não foi possível abrir a solicitação." crumb="Solicitação de aluguel">
        <ButtonLink to="/catalogo" variant="secondary">
          Voltar ao catálogo
        </ButtonLink>
      </AppShell>
    );
  }

  function send() {
    const next: Record<string, string> = {};
    if (name.trim().length < 3) next.name = "Informe o nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (phone.trim().length < 8) next.phone = "Informe um telefone para contato.";
    setErrors(next);
    if (Object.keys(next).length) return;
    submitRequest({
      propertyId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });
    toast.success("Solicitação registrada.");
    void navigate({ to: "/solicitacao-enviada" });
  }

  return (
    <AppShell
      title="Solicitação de aluguel"
      subtitle={`Registre seu interesse em ${property.type.toLowerCase()} · ${property.neighborhood}.`}
      crumb="Solicitação de aluguel"
    >
      <Panel title="Solicitação de aluguel">
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field label="Nome do interessado *" error={errors.name}>
            <TextInput value={name} placeholder="Seu nome completo" onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field label="E-mail para contato *" error={errors.email}>
            <TextInput value={email} placeholder="seuemail@exemplo.com" onChange={(event) => setEmail(event.target.value)} />
          </Field>
          <Field label="Telefone *" error={errors.phone}>
            <TextInput value={phone} placeholder="(61) 99999-0000" onChange={(event) => setPhone(event.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Mensagem">
              <AreaInput value={message} placeholder="Descreva seu interesse" onChange={(event) => setMessage(event.target.value)} />
            </Field>
          </div>
          <p className="text-sm text-muted sm:col-span-2">
            Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo.
          </p>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button onClick={send}>Enviar solicitação</Button>
            <ButtonLink to="/imovel/$id" params={{ id: property.id }} variant="secondary">
              Cancelar
            </ButtonLink>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
