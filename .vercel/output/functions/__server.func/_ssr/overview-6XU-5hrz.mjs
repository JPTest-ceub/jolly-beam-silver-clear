import { T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, p as money } from "./router-fdyyI6In.mjs";
import { c as Panel, f as Stat, p as Table, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overview-6XU-5hrz.js
var import_jsx_runtime = require_jsx_runtime();
var MODULES = [
	{
		label: "Imóveis",
		to: "/admin/imoveis",
		note: "Cadastro e disponibilidade",
		count: "properties"
	},
	{
		label: "Solicitações",
		to: "/admin/solicitacoes",
		note: "Interesses registrados",
		count: "requests"
	},
	{
		label: "Negociações",
		to: "/admin/negociacoes",
		note: "Acompanhamento",
		count: "negotiations"
	},
	{
		label: "Contratos",
		to: "/admin/contratos",
		note: "Registro e acompanhamento",
		count: "contracts"
	}
];
function Overview({ title, subtitle, crumb, panel }) {
	const properties = useStore((state) => state.properties);
	const requests = useStore((state) => state.requests);
	const negotiations = useStore((state) => state.negotiations);
	const contracts = useStore((state) => state.contracts);
	const month = useStore((state) => state.revenues).filter((item) => item.competence === "Nov/2026").reduce((sum, item) => sum + item.amount, 0);
	const open = requests.filter((item) => item.status === "Em análise" || item.status === "Em negociação").length;
	const active = negotiations.filter((item) => item.status === "Em andamento").length;
	const counts = {
		properties: properties.length,
		requests: requests.length,
		negotiations: active,
		contracts: contracts.length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title,
		subtitle,
		crumb,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Imóveis cadastrados",
					value: String(properties.length).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Solicitações abertas",
					value: String(open).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Negociações ativas",
					value: String(active).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Receitas no mês",
					value: money(month)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: panel,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
				columns: [
					"Módulo",
					"Registros",
					"Acompanhamento"
				],
				children: MODULES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4 font-medium",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "text-blue",
							children: item.label
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: String(counts[item.count]).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4 text-muted",
						children: item.note
					})
				] }, item.label))
			})
		})]
	});
}
//#endregion
export { Overview as t };
