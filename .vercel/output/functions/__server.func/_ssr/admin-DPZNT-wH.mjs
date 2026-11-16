import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as RequireRole } from "./shell-6Ak67mHG.mjs";
import { t as Overview } from "./overview-6XU-5hrz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DPZNT-wH.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
			title: "Visão geral administrativa",
			subtitle: "Acompanhe os principais módulos e a atividade recente.",
			crumb: "Visão geral",
			panel: "Atividade recente"
		})
	});
}
//#endregion
export { AdminHome as component };
