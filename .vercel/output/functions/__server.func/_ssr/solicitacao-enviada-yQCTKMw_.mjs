import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Check } from "../_libs/lucide-react.mjs";
import { a as ButtonLink, l as RequireRole, t as AppShell } from "./shell-6Ak67mHG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solicitacao-enviada-yQCTKMw_.js
var import_jsx_runtime = require_jsx_runtime();
function SuccessPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["locatario"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
			title: "Solicitação enviada",
			subtitle: "Confirmação do registro da solicitação.",
			crumb: "Solicitação enviada",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl rounded-xl border border-line bg-card px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-16 items-center justify-center rounded-full bg-green-light text-green",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-2xl font-bold",
						children: "Solicitação registrada com sucesso!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Você poderá acompanhar o andamento em Minhas solicitações."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/minhas-solicitacoes",
						className: "mt-6",
						children: "Acompanhar solicitação"
					})
				]
			})
		})
	});
}
//#endregion
export { SuccessPage as component };
