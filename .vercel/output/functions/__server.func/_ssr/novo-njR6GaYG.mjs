import { i as __toESM } from "../_runtime.mjs";
import { C as useNavigate, T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as DOC_STATUSES, d as useStore } from "./router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, d as SelectInput, i as Button, l as RequireRole, m as TextInput, s as Field, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/novo-njR6GaYG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewDocumentPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewDocument, {})
	});
}
function NewDocument() {
	const requests = useStore((state) => state.requests);
	const addDocument = useStore((state) => state.addDocument);
	const navigate = useNavigate();
	const [protocol, setProtocol] = (0, import_react.useState)(requests[0]?.id ?? "");
	const [person, setPerson] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Identificação");
	const [status, setStatus] = (0, import_react.useState)("Pendente");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	function save() {
		if (!protocol || !person.trim() || !type.trim()) {
			setError("Selecione o protocolo e informe a pessoa e o tipo de documento.");
			return;
		}
		addDocument({
			protocol,
			person: person.trim(),
			type: fileName ? `${type.trim()} · ${fileName}` : type.trim(),
			status
		});
		toast.success("Documento registrado.");
		navigate({ to: "/admin/documentos" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Registrar documento",
		subtitle: "Registre um documento relacionado à solicitação de aluguel.",
		crumb: "Registrar documento",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Informações do documento",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Solicitação relacionada",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: protocol,
							onChange: (event) => setProtocol(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione o protocolo"
							}), requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: request.id,
								children: [
									request.id,
									" · ",
									request.name
								]
							}, request.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pessoa relacionada",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: person,
							placeholder: "Locador ou locatário",
							onChange: (event) => setPerson(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tipo de documento",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: type,
							onChange: (event) => setType(event.target.value),
							children: [
								"Identificação",
								"Comprovante de renda",
								"Comprovante de residência",
								"Procuração"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Acompanhamento",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: status,
							onChange: (event) => setStatus(event.target.value),
							children: DOC_STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Anexar arquivo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								className: "block w-full text-sm text-muted file:mr-4 file:h-10 file:rounded-lg file:border-0 file:bg-blue-light file:px-4 file:font-semibold file:text-blue",
								onChange: (event) => setFileName(event.target.files?.[0]?.name ?? "")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Área ilustrativa para representar o envio do arquivo. O nome fica registrado na ficha."
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
							children: "Salvar documento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/admin/documentos",
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
export { NewDocumentPage as component };
