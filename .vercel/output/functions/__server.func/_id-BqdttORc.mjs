import { i as __toESM } from "./_runtime.mjs";
import { C as useNavigate, T as require_jsx_runtime, Z as require_react } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { d as useStore, r as Route$7, s as DEMO_TENANT } from "./_ssr/router-fdyyI6In.mjs";
import { a as ButtonLink, c as Panel, i as Button, l as RequireRole, m as TextInput, n as AreaInput, s as Field, t as AppShell } from "./_ssr/shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BqdttORc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequestPage() {
	const { id } = Route$7.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locatario"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestForm, { propertyId: id })
	});
}
function RequestForm({ propertyId }) {
	const property = useStore((state) => state.properties.find((item) => item.id === propertyId));
	const submitRequest = useStore((state) => state.submitRequest);
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)(DEMO_TENANT.name);
	const [email, setEmail] = (0, import_react.useState)(DEMO_TENANT.email);
	const [phone, setPhone] = (0, import_react.useState)(DEMO_TENANT.phone);
	const [message, setMessage] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	if (!property) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Imóvel não encontrado",
		subtitle: "Não foi possível abrir a solicitação.",
		crumb: "Solicitação de aluguel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/catalogo",
			variant: "secondary",
			children: "Voltar ao catálogo"
		})
	});
	function send() {
		const next = {};
		if (name.trim().length < 3) next.name = "Informe o nome completo.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
		if (phone.trim().length < 8) next.phone = "Informe um telefone para contato.";
		setErrors(next);
		if (Object.keys(next).length) return;
		submitRequest({
			propertyId,
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			message: message.trim()
		});
		toast.success("Solicitação registrada.");
		navigate({ to: "/solicitacao-enviada" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Solicitação de aluguel",
		subtitle: `Registre seu interesse em ${property.type.toLowerCase()} · ${property.neighborhood}.`,
		crumb: "Solicitação de aluguel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Solicitação de aluguel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome do interessado *",
						error: errors.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: name,
							placeholder: "Seu nome completo",
							onChange: (event) => setName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "E-mail para contato *",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: email,
							placeholder: "seuemail@exemplo.com",
							onChange: (event) => setEmail(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Telefone *",
						error: errors.phone,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: phone,
							placeholder: "(61) 99999-0000",
							onChange: (event) => setPhone(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mensagem",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaInput, {
								value: message,
								placeholder: "Descreva seu interesse",
								onChange: (event) => setMessage(event.target.value)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted sm:col-span-2",
						children: "Os campos, obrigatoriedades e validações seguem o fluxo demonstrativo do protótipo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: send,
							children: "Enviar solicitação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/imovel/$id",
							params: { id: property.id },
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
export { RequestPage as component };
