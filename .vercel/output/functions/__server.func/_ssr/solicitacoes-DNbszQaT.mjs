import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, f as formatDate, h as shortProperty, u as REQUEST_STATUSES } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, l as RequireRole, p as Table, t as AppShell, u as SearchField } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solicitacoes-DNbszQaT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequestsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Requests, {})
	});
}
function Requests() {
	const requests = useStore((state) => state.requests);
	const properties = useStore((state) => state.properties);
	const updateRequestStatus = useStore((state) => state.updateRequestStatus);
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		return requests.filter((request) => {
			const property = properties.find((item) => item.id === request.propertyId);
			const label = `${request.id} ${request.name} ${property ? shortProperty(property) : ""}`.toLowerCase();
			return !term || label.includes(term);
		});
	}, [
		properties,
		query,
		requests
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Solicitações de aluguel",
		subtitle: "Consulte e acompanhe os interesses dos locatários.",
		crumb: "Solicitações",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/admin/negociacoes",
			variant: "secondary",
			children: "Acompanhar negociações"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Registros e informações",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: query,
				onChange: setQuery,
				placeholder: "Buscar solicitação"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Protocolo",
					"Interessado",
					"Imóvel",
					"Data",
					"Situação"
				],
				children: visible.map((request) => {
					const property = properties.find((item) => item.id === request.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: request.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: request.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: property ? shortProperty(property) : request.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 text-muted",
							children: formatDate(request.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								className: "h-9 max-w-48",
								value: request.status,
								onChange: (event) => updateRequestStatus(request.id, event.target.value),
								children: REQUEST_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: status }, status))
							})
						})
					] }, request.id);
				})
			})
		})
	});
}
//#endregion
export { RequestsPage as component };
