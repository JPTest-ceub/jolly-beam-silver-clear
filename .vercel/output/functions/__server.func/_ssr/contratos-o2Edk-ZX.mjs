import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CONTRACT_STATUSES, d as useStore, h as shortProperty } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, l as RequireRole, p as Table, t as AppShell, u as SearchField } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contratos-o2Edk-ZX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContractsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contracts, {})
	});
}
function Contracts() {
	const contracts = useStore((state) => state.contracts);
	const properties = useStore((state) => state.properties);
	const updateContract = useStore((state) => state.updateContract);
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		return contracts.filter((item) => `${item.id} ${item.tenant} ${item.landlord}`.toLowerCase().includes(term));
	}, [contracts, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Gestão de contratos",
		subtitle: "Registre e acompanhe contratos de aluguel.",
		crumb: "Contratos",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/admin/contratos/novo",
			children: "Registrar contrato"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Registros e informações",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: query,
				onChange: setQuery,
				placeholder: "Buscar contrato"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Contrato",
					"Imóvel",
					"Envolvidos",
					"Acompanhamento"
				],
				children: visible.map((item) => {
					const property = properties.find((property) => property.id === item.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: item.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: property ? shortProperty(property) : item.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-5 py-4",
							children: [item.tenant, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: item.landlord
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								className: "h-9 max-w-40",
								value: item.status,
								onChange: (event) => updateContract(item.id, event.target.value),
								children: CONTRACT_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: status }, status))
							})
						})
					] }, item.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-4 text-sm text-muted",
				children: "Campos e regras contratuais devem ser confirmados na operação real."
			})]
		})
	});
}
//#endregion
export { ContractsPage as component };
