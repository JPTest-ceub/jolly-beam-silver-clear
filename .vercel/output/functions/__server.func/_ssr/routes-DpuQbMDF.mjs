import { C as useNavigate, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Building2, i as Shield, l as KeyRound } from "../_libs/lucide-react.mjs";
import { d as useStore } from "./router-fdyyI6In.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpuQbMDF.js
var import_jsx_runtime = require_jsx_runtime();
var PROFILES = [
	{
		role: "locatario",
		to: "/catalogo",
		title: "Locatário",
		text: "Consulta imóveis e acompanha solicitações de aluguel.",
		action: "Entrar como Locatário",
		icon: KeyRound
	},
	{
		role: "locador",
		to: "/locador",
		title: "Locador",
		text: "Acompanha negociações e informações financeiras dos seus imóveis.",
		action: "Entrar como Locador",
		icon: Building2
	},
	{
		role: "admin",
		to: "/admin",
		title: "Administrador",
		text: "Gerencia a operação completa da imobiliária.",
		action: "Entrar como Administrador",
		icon: Shield
	}
];
function Access() {
	const setRole = useStore((state) => state.setRole);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-screen lg:grid-cols-[minmax(0,570px)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex flex-col justify-between overflow-hidden bg-navy px-8 py-12 text-white sm:px-16 sm:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-xl bg-blue",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-3xl font-bold",
						children: "MeuImóvel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-16 max-w-md text-3xl font-bold leading-tight",
					children: "Gestão imobiliária mais simples, organizada e rastreável."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-sm leading-6 text-white/75",
					children: "Centralize imóveis, solicitações, negociações, contratos e o financeiro da imobiliária."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 text-sm text-white/60",
				children: "Protótipo acadêmico · Dados ilustrativos"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col justify-center bg-canvas px-6 py-12 sm:px-12 lg:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-blue",
					children: "BEM-VINDO AO SISTEMA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-bold tracking-tight text-ink",
					children: "Acesse seu ambiente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Selecione o perfil para iniciar a demonstração."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex max-w-2xl flex-col gap-4",
					children: PROFILES.map((profile) => {
						const Icon = profile.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col gap-4 rounded-xl border border-line bg-card p-5 sm:flex-row sm:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: profile.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: profile.text
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "inline-flex h-11 items-center justify-center rounded-lg bg-blue px-4 text-sm font-semibold text-white",
									onClick: () => {
										setRole(profile.role);
										navigate({ to: profile.to });
									},
									children: profile.action
								})
							]
						}, profile.role);
					})
				})
			]
		})]
	});
}
//#endregion
export { Access as component };
