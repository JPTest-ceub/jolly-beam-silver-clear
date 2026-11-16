import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as RequireRole, t as AppShell } from "./shell-6Ak67mHG.mjs";
import { t as PropertyForm } from "./property-form-DheUYO39.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/novo-CshAu26t.js
var import_jsx_runtime = require_jsx_runtime();
function NewPropertyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
			title: "Cadastro de imóvel",
			subtitle: "Registre as informações do imóvel.",
			crumb: "Cadastro de imóvel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyForm, {})
		})
	});
}
//#endregion
export { NewPropertyPage as component };
