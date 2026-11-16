import { i as __toESM } from "../_runtime.mjs";
import { C as useNavigate, T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as useStore } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, i as Button, m as TextInput, n as AreaInput, s as Field } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property-form-DheUYO39.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = [
	"Apartamento",
	"Casa",
	"Studio"
];
var STATUSES = [
	"Disponível",
	"Em locação",
	"Indisponível"
];
function PropertyForm({ propertyId }) {
	const existing = useStore((state) => state.properties.find((item) => item.id === propertyId));
	const addProperty = useStore((state) => state.addProperty);
	const updateProperty = useStore((state) => state.updateProperty);
	const navigate = useNavigate();
	const [type, setType] = (0, import_react.useState)(existing?.type ?? "Apartamento");
	const [neighborhood, setNeighborhood] = (0, import_react.useState)(existing?.neighborhood ?? "");
	const [price, setPrice] = (0, import_react.useState)(existing ? String(existing.price) : "");
	const [beds, setBeds] = (0, import_react.useState)(existing ? String(existing.beds) : "2");
	const [parking, setParking] = (0, import_react.useState)(existing ? String(existing.parking) : "1");
	const [area, setArea] = (0, import_react.useState)(existing ? String(existing.area) : "");
	const [landlord, setLandlord] = (0, import_react.useState)(existing?.landlord ?? "Helena Duarte");
	const [description, setDescription] = (0, import_react.useState)(existing?.description ?? "");
	const [status, setStatus] = (0, import_react.useState)(existing?.status ?? "Disponível");
	const [error, setError] = (0, import_react.useState)("");
	if (propertyId && !existing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Imóvel não encontrado."
	});
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
			landlord: landlord.trim()
		};
		if (existing) updateProperty(existing.id, payload);
		else addProperty(payload);
		toast.success(existing ? "Imóvel atualizado." : "Imóvel cadastrado.");
		navigate({ to: "/admin/imoveis" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Informações do imóvel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 p-5 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Identificação do imóvel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: type === "Apartamento" ? `Apartamento ${neighborhood || ""}`.trim() : `${type} ${neighborhood}`.trim(),
						readOnly: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Localização",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: neighborhood,
						placeholder: "Endereço / região",
						onChange: (event) => setNeighborhood(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tipo de imóvel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: type,
						onChange: (event) => setType(event.target.value),
						children: TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Valor mensal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: price,
						placeholder: "0",
						onChange: (event) => setPrice(event.target.value.replace(/\D/g, ""))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Quartos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: beds,
						onChange: (event) => setBeds(event.target.value.replace(/\D/g, ""))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Vagas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: parking,
						onChange: (event) => setParking(event.target.value.replace(/\D/g, ""))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Área (m²)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: area,
						onChange: (event) => setArea(event.target.value.replace(/\D/g, ""))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Locador",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: landlord,
						onChange: (event) => setLandlord(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Disponibilidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: status,
						onChange: (event) => setStatus(event.target.value),
						children: STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descrição",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaInput, {
							value: description,
							placeholder: "Características do imóvel",
							onChange: (event) => setDescription(event.target.value)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted sm:col-span-2",
					children: "Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo."
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger sm:col-span-2",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						children: "Salvar imóvel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/admin/imoveis",
						variant: "secondary",
						children: "Cancelar"
					})]
				})
			]
		})
	});
}
//#endregion
export { PropertyForm as t };
