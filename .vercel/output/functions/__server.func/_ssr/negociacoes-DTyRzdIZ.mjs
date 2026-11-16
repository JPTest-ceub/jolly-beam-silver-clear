import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, h as shortProperty, o as DEMO_LANDLORD } from "./router-fdyyI6In.mjs";
import { c as Panel, l as RequireRole, p as Table, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/negociacoes-DTyRzdIZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandlordNegotiationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locador"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandlordNegotiations, {})
	});
}
function LandlordNegotiations() {
	const negotiations = useStore((state) => state.negotiations);
	const properties = useStore((state) => state.properties);
	const deals = (0, import_react.useMemo)(() => negotiations.filter((item) => item.landlord === DEMO_LANDLORD), [negotiations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Negociações do locador",
		subtitle: "Acompanhe as tratativas relacionadas aos seus imóveis.",
		crumb: "Negociações",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Registros e informações",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Interessado",
					"Atualização",
					"Situação"
				],
				children: deals.map((item) => {
					const property = properties.find((property) => property.id === item.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: property ? shortProperty(property) : item.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: item.tenant
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: item.update
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: item.status })
						})
					] }, item.id);
				})
			})
		})
	});
}
//#endregion
export { LandlordNegotiationsPage as component };
