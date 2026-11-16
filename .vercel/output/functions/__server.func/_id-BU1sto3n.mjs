import { T as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as useStore, i as Route$11, m as moneyMonth } from "./_ssr/router-fdyyI6In.mjs";
import { a as ButtonLink, l as RequireRole, r as Badge, t as AppShell } from "./_ssr/shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BU1sto3n.js
var import_jsx_runtime = require_jsx_runtime();
function DetailPage() {
	const { id } = Route$11.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: [
			"locatario",
			"locador",
			"admin"
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, { id })
	});
}
function Detail({ id }) {
	const property = useStore((state) => state.properties.find((item) => item.id === id));
	const role = useStore((state) => state.role);
	if (!property) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Imóvel não encontrado",
		subtitle: "Esse registro não está no catálogo.",
		crumb: "Detalhes do imóvel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/catalogo",
			variant: "secondary",
			children: "Voltar ao catálogo"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Detalhes do imóvel",
		subtitle: "Consulte as informações do imóvel selecionado.",
		crumb: "Detalhes do imóvel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: property.image,
					alt: `${property.type} em ${property.neighborhood}`,
					className: "h-80 w-full rounded-xl object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-6 text-2xl font-bold",
					children: [
						property.type,
						" · ",
						property.neighborhood
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-2xl font-bold text-navy",
					children: moneyMonth(property.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						property.beds,
						" quartos · ",
						property.parking,
						" vaga",
						property.parking === 1 ? "" : "s",
						" · ",
						property.area,
						" m²"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-8 text-lg font-semibold",
					children: "Descrição do imóvel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-6 text-muted",
					children: property.description
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-xl border border-line bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Resumo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: "Código"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: property.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Localização"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: [
							property.neighborhood,
							" · ",
							property.city
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Locador"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: property.landlord
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Disponibilidade"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: property.status })
					}),
					role === "locatario" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/solicitar/$id",
						params: { id: property.id },
						className: "mt-6 w-full",
						children: "Tenho interesse neste imóvel"
					}) : null,
					role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/admin/imoveis/$id",
						params: { id: property.id },
						className: "mt-6 w-full",
						variant: "secondary",
						children: "Editar cadastro"
					}) : null
				]
			})]
		})
	});
}
//#endregion
export { DetailPage as component };
