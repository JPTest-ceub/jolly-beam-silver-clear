import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button, ButtonLink, Field, Panel, SelectInput, TextInput, AreaInput } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { PropertyStatus, PropertyType } from "@/lib/types";

const TYPES: PropertyType[] = ["Apartamento", "Casa", "Studio"];
const STATUSES: PropertyStatus[] = ["Disponível", "Em locação", "Indisponível"];

export function PropertyForm({ propertyId }: { propertyId?: string }) {
  const existing = useStore((state) => state.properties.find((item) => item.id === propertyId));
  const addProperty = useStore((state) => state.addProperty);
  const updateProperty = useStore((state) => state.updateProperty);
  const navigate = useNavigate();
  const [type, setType] = useState<PropertyType>(existing?.type ?? "Apartamento");
  const [neighborhood, setNeighborhood] = useState(existing?.neighborhood ?? "");
  const [price, setPrice] = useState(existing ? String(existing.price) : "");
  const [beds, setBeds] = useState(existing ? String(existing.beds) : "2");
  const [parking, setParking] = useState(existing ? String(existing.parking) : "1");
  const [area, setArea] = useState(existing ? String(existing.area) : "");
  const [landlord, setLandlord] = useState(existing?.landlord ?? "Helena Duarte");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [status, setStatus] = useState<PropertyStatus>(existing?.status ?? "Disponível");
  const [error, setError] = useState("");

  if (propertyId && !existing) {
    return <p className="text-sm text-muted">Imóvel não encontrado.</p>;
  }

  function save() {
    if (!neighborhood.trim() || !price || !area || !description.trim() || !landlord.trim()) {
      setError("Preencha identificação, localização, valor, área e descrição.");
      return;
    }
    const payload = {
      type,
      neighborhood: neighborhood.trim(),
      price: Number(price),
      beds: Number(beds) || 0,
      parking: Number(parking) || 0,
      area: Number(area) || 0,
      status,
      description: description.trim(),
      landlord: landlord.trim(),
    };
    if (existing) updateProperty(existing.id, payload);
    else addProperty(payload);
    toast.success(existing ? "Imóvel atualizado." : "Imóvel cadastrado.");
    void navigate({ to: "/admin/imoveis" });
  }

  return (
    <Panel title="Informações do imóvel">
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Field label="Identificação do imóvel">
          <TextInput value={type === "Apartamento" ? `Apartamento ${neighborhood || ""}`.trim() : `${type} ${neighborhood}`.trim()} readOnly />
        </Field>
        <Field label="Localização">
          <TextInput value={neighborhood} placeholder="Endereço / região" onChange={(event) => setNeighborhood(event.target.value)} />
        </Field>
        <Field label="Tipo de imóvel">
          <SelectInput value={type} onChange={(event) => setType(event.target.value as PropertyType)}>
            {TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Valor mensal">
          <TextInput inputMode="numeric" value={price} placeholder="0" onChange={(event) => setPrice(event.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Quartos">
          <TextInput inputMode="numeric" value={beds} onChange={(event) => setBeds(event.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Vagas">
          <TextInput inputMode="numeric" value={parking} onChange={(event) => setParking(event.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Área (m²)">
          <TextInput inputMode="numeric" value={area} onChange={(event) => setArea(event.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Locador">
          <TextInput value={landlord} onChange={(event) => setLandlord(event.target.value)} />
        </Field>
        <Field label="Disponibilidade">
          <SelectInput value={status} onChange={(event) => setStatus(event.target.value as PropertyStatus)}>
            {STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Descrição">
            <AreaInput value={description} placeholder="Características do imóvel" onChange={(event) => setDescription(event.target.value)} />
          </Field>
        </div>
        <p className="text-sm text-muted sm:col-span-2">
          Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo.
        </p>
        {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <Button onClick={save}>Salvar imóvel</Button>
          <ButtonLink to="/admin/imoveis" variant="secondary">
            Cancelar
          </ButtonLink>
        </div>
      </div>
    </Panel>
  );
}
