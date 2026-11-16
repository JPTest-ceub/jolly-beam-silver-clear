import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, h as shortProperty, o as DEMO_LANDLORD, p as money } from "./router-fdyyI6In.mjs";
import { c as Panel, f as Stat, l as RequireRole, p as Table, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locador-CJzl2uJC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandlordPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locador"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandlordHome, {})
	});
}
function LandlordHome() {
	const properties = useStore((state) => state.properties);
	const negotiations = useStore((state) => state.negotiations);
	const revenues = useStore((state) => state.revenues);
	const mine = (0, import_react.useMemo)(() => properties.filter((item) => item.landlord === DEMO_LANDLORD), [properties]);
	const deals = (0, import_react.useMemo)(() => negotiations.filter((item) => item.landlord === DEMO_LANDLORD), [negotiations]);
	const total = (0, import_react.useMemo)(() => revenues.filter((item) => mine.some((property) => property.id === item.propertyId)), [mine, revenues]).reduce((sum, item) => sum + item.amount, 0);
	const active = deals.filter((item) => item.status === "Em andamento").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Painel do locador",
		subtitle: "Visão geral das negociações e receitas dos seus imóveis.",
		crumb: "Painel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Imóveis vinculados",
					value: String(mine.length).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Negociações em andamento",
					value: String(active).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Receita registrada",
					value: money(total)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Atividade recente",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Interessado",
					"Etapa"
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: item.stage })
						})
					] }, item.id);
				})
			})
		})]
	});
}
//#endregion
export { LandlordPage as component };
