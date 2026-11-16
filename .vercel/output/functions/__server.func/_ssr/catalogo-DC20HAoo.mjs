import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, m as moneyMonth } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, d as SelectInput, i as Button, l as RequireRole, o as EmptyState, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-DC20HAoo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LOCATIONS = [
	"Brasília/DF",
	"Asa Norte",
	"Asa Sul",
	"Lago Sul",
	"Lago Norte",
	"Águas Claras",
	"Sudoeste",
	"Park Way"
];
function CatalogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locatario"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {})
	});
}
function Catalog() {
	const properties = useStore((state) => state.properties);
	const [location, setLocation] = (0, import_react.useState)("Brasília/DF");
	const [type, setType] = (0, import_react.useState)("Todos");
	const [applied, setApplied] = (0, import_react.useState)({
		location: "Brasília/DF",
		type: "Todos"
	});
	const visible = (0, import_react.useMemo)(() => properties.filter((property) => {
		const place = applied.location === "Brasília/DF" || property.neighborhood === applied.location || property.city === applied.location;
		const kind = applied.type === "Todos" || property.type === applied.type;
		return place && kind && property.status !== "Indisponível";
	}), [applied, properties]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: visible.length === 0 ? "Nenhum imóvel encontrado" : "Catálogo de imóveis",
		subtitle: visible.length === 0 ? "Estado vazio após a aplicação de filtros." : "Explore imóveis disponíveis para aluguel.",
		crumb: "Catálogo de imóveis",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 rounded-xl border border-line bg-card p-4 md:grid-cols-[1fr_16rem_auto] md:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block font-medium",
						children: "Localização"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: location,
						onChange: (event) => setLocation(event.target.value),
						children: LOCATIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block font-medium",
						children: "Tipo de imóvel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: type,
						onChange: (event) => setType(event.target.value),
						children: [
							"Todos",
							"Apartamento",
							"Casa",
							"Studio"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setApplied({
						location,
						type
					}),
					children: "Aplicar filtros"
				})
			]
		}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-line bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Não encontramos imóveis com esses filtros",
				text: "Tente ajustar a localização ou o tipo de imóvel.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						setLocation("Brasília/DF");
						setType("Todos");
						setApplied({
							location: "Brasília/DF",
							type: "Todos"
						});
					},
					children: "Limpar filtros"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
			children: visible.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-xl border border-line bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: property.image,
					alt: `${property.type} em ${property.neighborhood}`,
					className: "h-44 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: property.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 text-lg font-semibold",
							children: [
								property.type,
								" · ",
								property.neighborhood
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xl font-bold text-navy",
							children: moneyMonth(property.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								property.beds,
								" quartos · ",
								property.parking,
								" vaga",
								property.parking === 1 ? "" : "s",
								" · ",
								property.area,
								" m²"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/imovel/$id",
							params: { id: property.id },
							className: "mt-5",
							children: "Ver detalhes"
						})
					]
				})]
			}, property.id))
		})]
	});
}
//#endregion
export { CatalogPage as component };
