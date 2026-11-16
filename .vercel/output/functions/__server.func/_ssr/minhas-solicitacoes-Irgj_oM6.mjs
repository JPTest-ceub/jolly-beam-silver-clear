import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, f as formatDate, h as shortProperty } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, l as RequireRole, p as Table, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/minhas-solicitacoes-Irgj_oM6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MinePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locatario"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mine, {})
	});
}
function Mine() {
	const requests = useStore((state) => state.requests);
	const properties = useStore((state) => state.properties);
	const mine = (0, import_react.useMemo)(() => requests.filter((item) => item.mine), [requests]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Minhas solicitações",
		subtitle: "Acompanhe os registros de interesse enviados por você.",
		crumb: "Minhas solicitações",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/catalogo",
			variant: "secondary",
			children: "Consultar imóveis"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Registros e informações",
			children: mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-10 text-sm text-muted",
				children: "Você ainda não registrou interesse em um imóvel."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Data",
					"Acompanhamento"
				],
				children: mine.map((request) => {
					const property = properties.find((item) => item.id === request.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: property ? shortProperty(property) : request.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 text-muted",
							children: formatDate(request.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: request.status })
						})
					] }, request.id);
				})
			})
		})
	});
}
//#endregion
export { MinePage as component };
