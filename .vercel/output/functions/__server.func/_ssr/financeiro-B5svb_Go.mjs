import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, h as shortProperty, o as DEMO_LANDLORD, p as money } from "./router-fdyyI6In.mjs";
import { c as Panel, f as Stat, l as RequireRole, p as Table, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/financeiro-B5svb_Go.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandlordFinancePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locador"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandlordFinance, {})
	});
}
function LandlordFinance() {
	const properties = useStore((state) => state.properties);
	const revenues = useStore((state) => state.revenues);
	const mine = (0, import_react.useMemo)(() => properties.filter((item) => item.landlord === DEMO_LANDLORD), [properties]);
	const income = (0, import_react.useMemo)(() => revenues.filter((item) => mine.some((property) => property.id === item.propertyId)), [mine, revenues]);
	const total = income.reduce((sum, item) => sum + item.amount, 0);
	const homes = new Set(income.map((item) => item.propertyId)).size;
	const latest = income[0]?.competence ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Financeiro do locador",
		subtitle: "Consulte receitas e desempenho financeiro dos seus imóveis.",
		crumb: "Financeiro",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Receitas registradas",
					value: money(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Imóveis com receita",
					value: String(homes).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Último registro",
					value: latest
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Atividade recente",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Imóvel",
					"Competência",
					"Receita",
					"Registro"
				],
				children: income.map((item) => {
					const property = properties.find((property) => property.id === item.propertyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-medium",
							children: property ? shortProperty(property) : item.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: item.competence
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: money(item.amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: "Registrada" })
						})
					] }, item.id);
				})
			})
		})]
	});
}
//#endregion
export { LandlordFinancePage as component };
