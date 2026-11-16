import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as DOC_STATUSES, d as useStore } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, l as RequireRole, p as Table, t as AppShell, u as SearchField } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documentos-J5BK-NTT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DocumentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Documents, {})
	});
}
function Documents() {
	const documents = useStore((state) => state.documents);
	const updateDocument = useStore((state) => state.updateDocument);
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		return documents.filter((item) => `${item.protocol} ${item.person} ${item.type}`.toLowerCase().includes(term));
	}, [documents, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Gestão de documentação",
		subtitle: "Registre e acompanhe documentos da ficha de locação.",
		crumb: "Documentação",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/admin/documentos/novo",
			children: "Registrar documento"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Registros e informações",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: query,
				onChange: setQuery,
				placeholder: "Buscar documento"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Protocolo",
					"Envolvido",
					"Documento",
					"Acompanhamento"
				],
				children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4 font-medium",
						children: item.protocol
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: item.person
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: item.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							className: "h-9 max-w-44",
							value: item.status,
							onChange: (event) => updateDocument(item.id, event.target.value),
							children: DOC_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: status }, status))
						})
					})
				] }, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-4 text-sm text-muted",
				children: "Os tipos de documento, campos contratuais e estados são exemplos do protótipo."
			})]
		})
	});
}
//#endregion
export { DocumentsPage as component };
