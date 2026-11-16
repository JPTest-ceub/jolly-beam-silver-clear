export type Role = "locatario" | "locador" | "admin";

export type PropertyType = "Apartamento" | "Casa" | "Studio";
export type PropertyStatus = "Disponível" | "Em locação" | "Indisponível";

export type Property = {
  id: string;
  type: PropertyType;
  neighborhood: string;
  city: string;
  price: number;
  beds: number;
  parking: number;
  area: number;
  status: PropertyStatus;
  description: string;
  landlord: string;
  image: string;
};

export type RequestStatus = "Em análise" | "Em negociação" | "Concluída" | "Recusada";

export type RentalRequest = {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: RequestStatus;
  mine: boolean;
};

export type Negotiation = {
  id: string;
  propertyId: string;
  requestId: string;
  tenant: string;
  landlord: string;
  stage: string;
  update: string;
  status: "Em andamento" | "Finalizada";
};

export type DocStatus = "Pendente" | "Recebido" | "Conferido";

export type DocItem = {
  id: string;
  protocol: string;
  person: string;
  type: string;
  status: DocStatus;
};

export type ContractStatus = "Ativo" | "Rascunho" | "Encerrado";

export type Contract = {
  id: string;
  propertyId: string;
  landlord: string;
  tenant: string;
  status: ContractStatus;
};

export type Revenue = {
  id: string;
  propertyId: string;
  competence: string;
  amount: number;
  note: string;
};
