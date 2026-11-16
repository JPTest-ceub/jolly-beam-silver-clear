import { i as __toESM } from "../_runtime.mjs";
import { C as useNavigate, T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as CONTRACT_STATUSES, d as useStore, h as shortProperty } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, i as Button, l as RequireRole, m as TextInput, s as Field, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/novo-XP1ZINEN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewContractPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewContract, {})
	});
}
function NewContract() {
	const properties = useStore((state) => state.properties);
	const addContract = useStore((state) => state.addContract);
	const navigate = useNavigate();
	const [propertyId, setPropertyId] = (0, import_react.useState)(properties[0]?.id ?? "");
	const [landlord, setLandlord] = (0, import_react.useState)(properties[0]?.landlord ?? "");
	const [tenant, setTenant] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Rascunho");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	function save() {
		if (!propertyId || !landlord.trim() || !tenant.trim()) {
			setError("Selecione o imóvel e informe locador e locatário.");
			return;
		}
		addContract({
			propertyId,
			landlord: landlord.trim(),
			tenant: fileName ? `${tenant.trim()}` : tenant.trim(),
			status
		});
		toast.success("Contrato registrado.");
		navigate({ to: "/admin/contratos" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Registrar contrato",
		subtitle: "Registre e acompanhe um contrato de aluguel.",
		crumb: "Registrar contrato",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Dados do contrato",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Imóvel relacionado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: propertyId,
							onChange: (event) => {
								const next = event.target.value;
								setPropertyId(next);
								const property = properties.find((item) => item.id === next);
								if (property) setLandlord(property.landlord);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione o imóvel"
							}), properties.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: property.id,
								children: [
									property.id,
									" · ",
									shortProperty(property)
								]
							}, property.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Locador",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: landlord,
							placeholder: "Selecione o locador",
							onChange: (event) => setLandlord(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Locatário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: tenant,
							placeholder: "Selecione o locatário",
							onChange: (event) => setTenant(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Acompanhamento",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: status,
							onChange: (event) => setStatus(event.target.value),
							children: CONTRACT_STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Anexar contrato",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								className: "block w-full text-sm text-muted file:mr-4 file:h-10 file:rounded-lg file:border-0 file:bg-blue-light file:px-4 file:font-semibold file:text-blue",
								onChange: (event) => setFileName(event.target.files?.[0]?.name ?? "")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [fileName ? `Arquivo indicado: ${fileName}. ` : "", "Campos e regras contratuais devem ser confirmados fora deste protótipo."]
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger sm:col-span-2",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Salvar contrato"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/admin/contratos",
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
export { NewContractPage as component };
