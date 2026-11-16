import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, h as shortProperty } from "./router-fdyyI6In.mjs";
import { c as Panel, d as SelectInput, l as RequireRole, p as Table, t as AppShell, u as SearchField } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/negociacoes-Chtpus35.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	"Em análise",
	"Em negociação",
	"Documentação solicitada",
	"Proposta recebida",
	"Finalizada"
];
function NegotiationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Negotiations, {})
	});
}
function Negotiations() {
	const negotiations = useStore((state) => state.negotiations);
	const properties = useStore((state) => state.properties);
	const updateNegotiation = useStore((state) => state.updateNegotiation);
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		return negotiations.filter((item) => {
			const property = properties.find((property) => property.id === item.propertyId);
			const label = `${property ? shortProperty(property) : ""} ${item.tenant} ${item.landlord}`.toLowerCase();
			return !term || label.includes(term);
		});
	}, [
		negotiations,
		properties,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Gestão de negociações",
		subtitle: "Acompanhe as tratativas entre locadores e locatários.",
		crumb: "Negociações",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Registros e informações",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: query,
				onChange: setQuery,
				placeholder: "Buscar negociação"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Locador",
					"Locatário",
					"Etapa"
				],
				children: visible.map((item) => {
					const property = properties.find((property) => property.id === item.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: property ? shortProperty(property) : item.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: item.landlord
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: item.tenant
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								className: "h-9 max-w-56",
								value: STAGES.includes(item.stage) ? item.stage : STAGES[0],
								onChange: (event) => updateNegotiation(item.id, {
									stage: event.target.value,
									update: event.target.value,
									status: event.target.value === "Finalizada" ? "Finalizada" : "Em andamento"
								}),
								children: STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: stage }, stage))
							})
						})
					] }, item.id);
				})
			})
		})
	});
}
//#endregion
export { NegotiationsPage as component };
