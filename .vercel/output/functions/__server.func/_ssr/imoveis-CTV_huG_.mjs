import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, l as PROPERTY_STATUSES, p as money } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, l as RequireRole, p as Table, t as AppShell, u as SearchField } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imoveis-CTV_huG_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PropertiesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Properties, {})
	});
}
function Properties() {
	const properties = useStore((state) => state.properties);
	const updateProperty = useStore((state) => state.updateProperty);
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		if (!term) return properties;
		return properties.filter((property) => `${property.id} ${property.type} ${property.neighborhood} ${property.landlord}`.toLowerCase().includes(term));
	}, [properties, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Gestão de imóveis",
		subtitle: "Cadastre, consulte, edite e acompanhe a disponibilidade.",
		crumb: "Imóveis",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/admin/imoveis/novo",
			children: "Cadastrar imóvel"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Registros e informações",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: query,
				onChange: setQuery,
				placeholder: "Buscar imóvel"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Localização",
					"Valor",
					"Disponibilidade",
					""
				],
				children: visible.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-5 py-4 font-medium",
						children: [
							property.id,
							" · ",
							property.type
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: property.neighborhood
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: money(property.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							className: "h-9 max-w-44",
							value: property.status,
							onChange: (event) => updateProperty(property.id, { status: event.target.value }),
							children: PROPERTY_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: status }, status))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/admin/imoveis/$id",
							params: { id: property.id },
							variant: "ghost",
							children: "Editar"
						})
					})
				] }, property.id))
			}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-8 text-sm text-muted",
				children: "Nenhum imóvel encontrado."
			}) : null]
		})
	});
}
//#endregion
export { PropertiesPage as component };
