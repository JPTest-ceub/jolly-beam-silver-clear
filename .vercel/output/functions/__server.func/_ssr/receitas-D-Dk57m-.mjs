import { i as __toESM } from "../_runtime.mjs";
import { C as useNavigate, T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as useStore, h as shortProperty } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, i as Button, l as RequireRole, m as TextInput, s as Field, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receitas-D-Dk57m-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RevenuePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueForm, {})
	});
}
function RevenueForm() {
	const properties = useStore((state) => state.properties);
	const addRevenue = useStore((state) => state.addRevenue);
	const navigate = useNavigate();
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [competence, setCompetence] = (0, import_react.useState)("Nov/2026");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	function save() {
		if (!propertyId || !competence.trim() || !amount) {
			setError("Selecione o imóvel e informe competência e valor.");
			return;
		}
		addRevenue({
			propertyId,
			competence: competence.trim(),
			amount: Number(amount),
			note: note.trim() || "Receita registrada"
		});
		toast.success("Receita registrada.");
		navigate({ to: "/admin/financeiro" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Registro de receitas",
		subtitle: "Registre receitas mensais dos imóveis alugados.",
		crumb: "Receitas",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Nova receita",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Imóvel alugado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: propertyId,
							onChange: (event) => setPropertyId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione um imóvel"
							}), properties.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: property.id,
								children: shortProperty(property)
							}, property.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Competência",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: competence,
							placeholder: "Mês / ano",
							onChange: (event) => setCompetence(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Valor da receita",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							inputMode: "numeric",
							value: amount,
							placeholder: "0",
							onChange: (event) => setAmount(event.target.value.replace(/\D/g, ""))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Observação",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: note,
							placeholder: "Informação complementar",
							onChange: (event) => setNote(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted sm:col-span-2",
						children: "Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo."
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger sm:col-span-2",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Salvar receita"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/admin",
							variant: "secondary",
							children: "Cancelar"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { RevenuePage as component };
