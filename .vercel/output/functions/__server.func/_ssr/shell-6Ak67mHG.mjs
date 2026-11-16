import { i as __toESM } from "../_runtime.mjs";
import { S as Navigate, T as require_jsx_runtime, Z as require_react, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Activity, a as Search, c as LayoutDashboard, d as Handshake, f as FileText, g as BadgeDollarSign, h as Building2, n as Wallet, o as ScrollText, p as ClipboardList, s as Menu, t as X, u as House } from "../_libs/lucide-react.mjs";
import { d as useStore, g as toneFor } from "./router-fdyyI6In.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-6Ak67mHG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	primary: "bg-blue text-white hover:opacity-90",
	secondary: "border border-line bg-card text-ink hover:bg-canvas",
	ghost: "text-blue hover:bg-blue-light"
};
var buttonClass = "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
function Button({ variant = "primary", className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		className: cn(buttonClass, variants[variant], className),
		...props
	});
}
function ButtonLink({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		className: cn(buttonClass, variants[variant], className),
		...props
	});
}
function Badge({ status }) {
	const tone = toneFor(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", {
			green: "bg-green-light text-green",
			amber: "bg-amber-light text-amber",
			blue: "bg-blue-light text-blue",
			red: "bg-danger-light text-danger",
			muted: "bg-canvas text-muted"
		}[tone]),
		children: status
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-line bg-card px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-3xl font-bold tracking-tight text-ink",
			children: value
		})]
	});
}
function Panel({ title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-ink",
				children: title
			}), action]
		}), children]
	});
}
function Table({ columns, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[40rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-line text-xs font-semibold tracking-wide text-muted",
				children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-5 py-3 font-semibold",
					children: column
				}, column))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-line",
				children
			})]
		})
	});
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-sm font-medium text-ink",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-danger",
				children: error
			}) : null
		]
	});
}
var controlClass = "h-11 w-full rounded-lg border border-line bg-card px-3 text-sm text-ink outline-none ring-blue/30 placeholder:text-muted focus:ring-2";
function TextInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(controlClass, className),
		...props
	});
}
function AreaInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(controlClass, "h-28 py-2", className),
		...props
	});
}
function SelectInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(controlClass, className),
		...props
	});
}
function EmptyState({ title, text, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex size-16 items-center justify-center rounded-full bg-blue-light text-blue",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted",
				children: text
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
function SearchField({ value, onChange, placeholder = "Buscar" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		onChange: (event) => onChange(event.target.value),
		placeholder,
		className: "h-10 w-full max-w-xs rounded-lg border border-line bg-card px-3 text-sm outline-none ring-blue/30 focus:ring-2"
	});
}
var NAV = {
	locatario: [{
		to: "/catalogo",
		label: "Buscar imóveis",
		icon: Search
	}, {
		to: "/minhas-solicitacoes",
		label: "Minhas solicitações",
		icon: ClipboardList
	}],
	locador: [
		{
			to: "/locador",
			label: "Painel",
			icon: LayoutDashboard,
			exact: true
		},
		{
			to: "/locador/negociacoes",
			label: "Negociações",
			icon: Handshake
		},
		{
			to: "/locador/financeiro",
			label: "Financeiro",
			icon: Wallet
		}
	],
	admin: [
		{
			to: "/admin",
			label: "Visão geral",
			icon: LayoutDashboard,
			exact: true
		},
		{
			to: "/admin/imoveis",
			label: "Imóveis",
			icon: Building2
		},
		{
			to: "/admin/solicitacoes",
			label: "Solicitações",
			icon: ClipboardList
		},
		{
			to: "/admin/negociacoes",
			label: "Negociações",
			icon: Handshake
		},
		{
			to: "/admin/documentos",
			label: "Documentação",
			icon: FileText
		},
		{
			to: "/admin/contratos",
			label: "Contratos",
			icon: ScrollText
		},
		{
			to: "/admin/receitas",
			label: "Receitas",
			icon: BadgeDollarSign
		},
		{
			to: "/admin/financeiro",
			label: "Financeiro",
			icon: Wallet
		},
		{
			to: "/admin/operacoes",
			label: "Operações",
			icon: Activity
		}
	]
};
var ROLE_META = {
	locatario: {
		label: "LOCATÁRIO",
		initials: "LT"
	},
	locador: {
		label: "LOCADOR",
		initials: "LO"
	},
	admin: {
		label: "ADMINISTRADOR",
		initials: "AD"
	}
};
function active(path, to, exact) {
	if (exact) return path === to;
	return path === to || path.startsWith(`${to}/`);
}
function AppShell({ title, subtitle, crumb, action, children }) {
	const role = useStore((state) => state.role);
	const setRole = useStore((state) => state.setRole);
	const path = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const meta = role ? ROLE_META[role] : null;
	const items = role ? NAV[role] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas text-ink",
		children: [
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "fixed inset-0 z-30 bg-navy/50 lg:hidden",
				"aria-label": "Fechar menu",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between px-6 pb-2 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-lg bg-blue",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold",
							children: "MeuImóvel"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-semibold tracking-widest text-white/60",
						children: meta?.label
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-lg p-2 text-white lg:hidden",
						onClick: () => setOpen(false),
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-6 flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-6",
					children: items.map((item) => {
						const Icon = item.icon;
						const on = active(path, item.to, item.exact);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: cn("flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium", on ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.label]
						}, item.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-card px-4 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex size-11 items-center justify-center rounded-lg border border-line lg:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Abrir menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-ink",
								children: "MeuImóvel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", crumb] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => setRole(null),
						className: "flex size-10 items-center justify-center rounded-full bg-blue-light text-sm font-bold text-blue",
						"aria-label": "Trocar perfil",
						title: "Trocar perfil",
						children: meta?.initials ?? "MI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "px-4 py-6 sm:px-8 sm:py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight text-ink",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: subtitle
						})] }), action]
					}), children]
				})]
			})
		]
	});
}
function RequireRole({ allow, children }) {
	const role = useStore((state) => state.role);
	const [ready, setReady] = (0, import_react.useState)(() => useStore.persist.hasHydrated());
	(0, import_react.useEffect)(() => {
		if (useStore.persist.hasHydrated()) {
			setReady(true);
			return;
		}
		return useStore.persist.onFinishHydration(() => setReady(true));
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-canvas px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Carregando o MeuImóvel…"
		})
	});
	if (!role || !allow.includes(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return children;
}
//#endregion
export { ButtonLink as a, Panel as c, SelectInput as d, Stat as f, Button as i, RequireRole as l, TextInput as m, AreaInput as n, EmptyState as o, Table as p, Badge as r, Field as s, AppShell as t, SearchField as u };
