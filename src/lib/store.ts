import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nextCode, todayISO } from "@/lib/format";
import type {
  Contract,
  ContractStatus,
  DocItem,
  DocStatus,
  Negotiation,
  Property,
  PropertyStatus,
  RentalRequest,
  RequestStatus,
  Revenue,
  Role,
} from "@/lib/types";

export const DEMO_LANDLORD = "Helena Duarte";
export const DEMO_TENANT = {
  name: "Marina Costa",
  email: "marina.costa@email.com",
  phone: "(61) 99999-0000",
};

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
  key: () => null,
  length: 0,
};

const seedProperties: Property[] = [
  {
    id: "MI-001",
    type: "Apartamento",
    neighborhood: "Asa Norte",
    city: "Brasília/DF",
    price: 2400,
    beds: 2,
    parking: 1,
    area: 68,
    status: "Disponível",
    landlord: DEMO_LANDLORD,
    image: "/imoveis/mi-001.jpg",
    description:
      "Apartamento arejado na Asa Norte, com sala integrada, dois quartos e uma vaga. Próximo ao comércio local e com boa incidência de luz.",
  },
  {
    id: "MI-002",
    type: "Casa",
    neighborhood: "Lago Sul",
    city: "Brasília/DF",
    price: 4800,
    beds: 3,
    parking: 2,
    area: 145,
    status: "Em locação",
    landlord: DEMO_LANDLORD,
    image: "/imoveis/mi-002.jpg",
    description:
      "Casa com jardim no Lago Sul, três quartos, duas vagas e área de estar voltada para o gramado. Indicada para famílias.",
  },
  {
    id: "MI-003",
    type: "Studio",
    neighborhood: "Sudoeste",
    city: "Brasília/DF",
    price: 1200,
    beds: 1,
    parking: 1,
    area: 32,
    status: "Em locação",
    landlord: DEMO_LANDLORD,
    image: "/imoveis/mi-003.jpg",
    description:
      "Studio compacto no Sudoeste, com cozinha integrada e uma vaga. Boa opção para quem busca praticidade perto do centro.",
  },
  {
    id: "MI-004",
    type: "Apartamento",
    neighborhood: "Águas Claras",
    city: "Brasília/DF",
    price: 1950,
    beds: 2,
    parking: 1,
    area: 58,
    status: "Disponível",
    landlord: "Paulo Neri",
    image: "/imoveis/mi-004.jpg",
    description:
      "Apartamento em Águas Claras com dois quartos, uma vaga e vista para a área residencial. Condomínio com portaria.",
  },
  {
    id: "MI-005",
    type: "Apartamento",
    neighborhood: "Asa Sul",
    city: "Brasília/DF",
    price: 3100,
    beds: 3,
    parking: 1,
    area: 92,
    status: "Disponível",
    landlord: "Paulo Neri",
    image: "/imoveis/mi-005.jpg",
    description:
      "Apartamento na Asa Sul com três quartos e sala ampla. Região arborizada e acesso fácil ao eixo monumental.",
  },
  {
    id: "MI-006",
    type: "Casa",
    neighborhood: "Park Way",
    city: "Brasília/DF",
    price: 6200,
    beds: 4,
    parking: 3,
    area: 210,
    status: "Disponível",
    landlord: DEMO_LANDLORD,
    image: "/imoveis/mi-006.jpg",
    description:
      "Casa ampla no Park Way, quatro quartos e três vagas, com jardim frontal e áreas sociais integradas.",
  },
];

const seedRequests: RentalRequest[] = [
  {
    id: "SOL-032",
    propertyId: "MI-001",
    name: DEMO_TENANT.name,
    email: DEMO_TENANT.email,
    phone: DEMO_TENANT.phone,
    message: "Tenho interesse em visitar o apartamento neste mês.",
    date: "2026-11-09",
    status: "Em análise",
    mine: true,
  },
  {
    id: "SOL-031",
    propertyId: "MI-002",
    name: "Rafael Lima",
    email: "rafael.lima@email.com",
    phone: "(61) 98888-1010",
    message: "Gostaria de seguir com a proposta da casa.",
    date: "2026-11-02",
    status: "Em negociação",
    mine: false,
  },
  {
    id: "SOL-030",
    propertyId: "MI-003",
    name: "Bruno Alves",
    email: "bruno.alves@email.com",
    phone: "(61) 97777-2020",
    message: "Contrato do studio já foi concluído.",
    date: "2026-10-18",
    status: "Concluída",
    mine: false,
  },
  {
    id: "SOL-029",
    propertyId: "MI-002",
    name: DEMO_TENANT.name,
    email: DEMO_TENANT.email,
    phone: DEMO_TENANT.phone,
    message: "Interesse anterior, já encerrado.",
    date: "2026-11-02",
    status: "Concluída",
    mine: true,
  },
];

const seedNegotiations: Negotiation[] = [
  {
    id: "NEG-001",
    propertyId: "MI-001",
    requestId: "SOL-032",
    tenant: DEMO_TENANT.name,
    landlord: DEMO_LANDLORD,
    stage: "Em análise",
    update: "Documentação solicitada",
    status: "Em andamento",
  },
  {
    id: "NEG-002",
    propertyId: "MI-002",
    requestId: "SOL-031",
    tenant: "Rafael Lima",
    landlord: DEMO_LANDLORD,
    stage: "Em negociação",
    update: "Proposta recebida",
    status: "Em andamento",
  },
  {
    id: "NEG-003",
    propertyId: "MI-003",
    requestId: "SOL-030",
    tenant: "Bruno Alves",
    landlord: DEMO_LANDLORD,
    stage: "Finalizada",
    update: "Contrato assinado",
    status: "Finalizada",
  },
];

const seedDocuments: DocItem[] = [
  {
    id: "DOC-001",
    protocol: "SOL-032",
    person: DEMO_TENANT.name,
    type: "Identificação",
    status: "Pendente",
  },
  {
    id: "DOC-002",
    protocol: "SOL-031",
    person: "Rafael Lima",
    type: "Comprovante",
    status: "Recebido",
  },
];

const seedContracts: Contract[] = [
  {
    id: "CTR-014",
    propertyId: "MI-001",
    landlord: DEMO_LANDLORD,
    tenant: DEMO_TENANT.name,
    status: "Rascunho",
  },
  {
    id: "CTR-013",
    propertyId: "MI-002",
    landlord: DEMO_LANDLORD,
    tenant: "Rafael Lima",
    status: "Ativo",
  },
  {
    id: "CTR-012",
    propertyId: "MI-003",
    landlord: DEMO_LANDLORD,
    tenant: "Bruno Alves",
    status: "Ativo",
  },
];

const seedRevenues: Revenue[] = [
  { id: "REC-001", propertyId: "MI-001", competence: "Nov/2026", amount: 2400, note: "Aluguel de novembro" },
  { id: "REC-002", propertyId: "MI-002", competence: "Nov/2026", amount: 4800, note: "Aluguel de novembro" },
  { id: "REC-003", propertyId: "MI-003", competence: "Nov/2026", amount: 1200, note: "Aluguel de novembro" },
  { id: "REC-004", propertyId: "MI-004", competence: "Nov/2026", amount: 1950, note: "Aluguel de novembro" },
  { id: "REC-005", propertyId: "MI-005", competence: "Nov/2026", amount: 3100, note: "Aluguel de novembro" },
];

type PropertyInput = Omit<Property, "id" | "image" | "city"> & { city?: string; image?: string };

type State = {
  role: Role | null;
  properties: Property[];
  requests: RentalRequest[];
  negotiations: Negotiation[];
  documents: DocItem[];
  contracts: Contract[];
  revenues: Revenue[];
  lastRequestId: string | null;
  setRole: (role: Role | null) => void;
  addProperty: (input: PropertyInput) => string;
  updateProperty: (id: string, patch: Partial<Property>) => void;
  submitRequest: (input: Omit<RentalRequest, "id" | "date" | "status" | "mine">) => string;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateNegotiation: (id: string, patch: Partial<Pick<Negotiation, "stage" | "status" | "update">>) => void;
  addDocument: (input: Omit<DocItem, "id">) => void;
  updateDocument: (id: string, status: DocStatus) => void;
  addContract: (input: Omit<Contract, "id">) => void;
  updateContract: (id: string, status: ContractStatus) => void;
  addRevenue: (input: Omit<Revenue, "id">) => void;
  resetDemo: () => void;
};

const imageFor = (type: Property["type"]) =>
  type === "Casa" ? "/imoveis/mi-002.jpg" : type === "Studio" ? "/imoveis/mi-003.jpg" : "/imoveis/mi-001.jpg";

const seedSlice = {
  properties: seedProperties,
  requests: seedRequests,
  negotiations: seedNegotiations,
  documents: seedDocuments,
  contracts: seedContracts,
  revenues: seedRevenues,
  lastRequestId: "SOL-032",
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      role: null,
      ...seedSlice,
      setRole: (role) => set({ role }),
      addProperty: (input) => {
        const id = nextCode(
          "MI",
          get().properties.map((item) => item.id),
        );
        const property: Property = {
          ...input,
          id,
          city: input.city ?? "Brasília/DF",
          image: input.image ?? imageFor(input.type),
        };
        set((state) => ({ properties: [property, ...state.properties] }));
        return id;
      },
      updateProperty: (id, patch) =>
        set((state) => ({
          properties: state.properties.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),
      submitRequest: (input) => {
        const id = nextCode(
          "SOL",
          get().requests.map((item) => item.id),
        );
        const request: RentalRequest = {
          ...input,
          id,
          date: todayISO(),
          status: "Em análise",
          mine: true,
        };
        set((state) => ({ requests: [request, ...state.requests], lastRequestId: id }));
        return id;
      },
      updateRequestStatus: (id, status) =>
        set((state) => {
          const requests = state.requests.map((item) => (item.id === id ? { ...item, status } : item));
          const request = requests.find((item) => item.id === id);
          if (!request) return { requests };
          const property = state.properties.find((item) => item.id === request.propertyId);
          let negotiations = state.negotiations;
          let properties = state.properties;
          const stage = status === "Concluída" ? "Finalizada" : status;
          const progress = status === "Concluída" || status === "Recusada" ? "Finalizada" : "Em andamento";
          const existing = negotiations.find((item) => item.requestId === id);
          if (existing) {
            negotiations = negotiations.map((item) =>
              item.requestId === id ? { ...item, stage, status: progress, update: stage } : item,
            );
          } else if (property && status !== "Recusada") {
            negotiations = [
              {
                id: nextCode(
                  "NEG",
                  negotiations.map((item) => item.id),
                ),
                propertyId: property.id,
                requestId: id,
                tenant: request.name,
                landlord: property.landlord,
                stage,
                update: "Situação atualizada",
                status: progress,
              },
              ...negotiations,
            ];
          }
          if (status === "Concluída" && property) {
            properties = properties.map((item) =>
              item.id === property.id ? { ...item, status: "Em locação" } : item,
            );
          }
          return { requests, negotiations, properties };
        }),
      updateNegotiation: (id, patch) =>
        set((state) => ({
          negotiations: state.negotiations.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),
      addDocument: (input) =>
        set((state) => ({
          documents: [
            {
              ...input,
              id: nextCode(
                "DOC",
                state.documents.map((item) => item.id),
              ),
            },
            ...state.documents,
          ],
        })),
      updateDocument: (id, status) =>
        set((state) => ({
          documents: state.documents.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
      addContract: (input) =>
        set((state) => ({
          contracts: [
            {
              ...input,
              id: nextCode(
                "CTR",
                state.contracts.map((item) => item.id),
              ),
            },
            ...state.contracts,
          ],
        })),
      updateContract: (id, status) =>
        set((state) => ({
          contracts: state.contracts.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
      addRevenue: (input) =>
        set((state) => ({
          revenues: [
            {
              ...input,
              id: nextCode(
                "REC",
                state.revenues.map((item) => item.id),
              ),
            },
            ...state.revenues,
          ],
        })),
      resetDemo: () => set({ role: null, ...seedSlice }),
    }),
    {
      name: "meuimovel",
      skipHydration: true,
      version: 1,
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage)),
      partialize: (state) => ({
        role: state.role,
        properties: state.properties,
        requests: state.requests,
        negotiations: state.negotiations,
        documents: state.documents,
        contracts: state.contracts,
        revenues: state.revenues,
        lastRequestId: state.lastRequestId,
      }),
    },
  ),
);

export function propertyById(id: string) {
  return useStore.getState().properties.find((item) => item.id === id);
}

export const PROPERTY_STATUSES: PropertyStatus[] = ["Disponível", "Em locação", "Indisponível"];
export const REQUEST_STATUSES: RequestStatus[] = ["Em análise", "Em negociação", "Concluída", "Recusada"];
export const DOC_STATUSES: DocStatus[] = ["Pendente", "Recebido", "Conferido"];
export const CONTRACT_STATUSES: ContractStatus[] = ["Rascunho", "Ativo", "Encerrado"];
