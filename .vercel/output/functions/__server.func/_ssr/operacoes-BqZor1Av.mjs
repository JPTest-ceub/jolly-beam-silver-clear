import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as RequireRole } from "./shell-6Ak67mHG.mjs";
import { t as Overview } from "./overview-6XU-5hrz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/operacoes-BqZor1Av.js
var import_jsx_runtime = require_jsx_runtime();
function OperationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
			title: "Operações da imobiliária",
			subtitle: "Acompanhe informações gerais sobre a operação.",
			crumb: "Operações",
			panel: "Visão consolidada dos módulos"
		})
	});
}
//#endregion
export { OperationsPage as component };
