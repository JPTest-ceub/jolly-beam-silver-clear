import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, h as shortProperty, p as money } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, f as Stat, l as RequireRole, p as Table, r as Badge, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/financeiro-DTDg5dVD.js
var import_jsx_runtime = require_jsx_runtime();
function FinancePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finance, {})
	});
}
function Finance() {
	const revenues = useStore((state) => state.revenues);
	const properties = useStore((state) => state.properties);
	const total = revenues.reduce((sum, item) => sum + item.amount, 0);
	const homes = new Set(revenues.map((item) => item.propertyId)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Informações financeiras",
		subtitle: "Consulte receitas e desempenho financeiro da operação.",
		crumb: "Financeiro",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/admin/receitas",
			children: "Registrar receita"
		}),
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
					label: "Competência",
					value: "Nov/2026"
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
				children: revenues.map((item) => {
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
export { FinancePage as component };
