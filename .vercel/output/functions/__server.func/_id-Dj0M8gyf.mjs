import { T as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./_ssr/router-fdyyI6In.mjs";
import { l as RequireRole, t as AppShell } from "./_ssr/shell-6Ak67mHG.mjs";
import { t as PropertyForm } from "./_ssr/property-form-DheUYO39.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-Dj0M8gyf.js
var import_jsx_runtime = require_jsx_runtime();
function EditPropertyPage() {
	const { id } = Route$1.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		allow: ["admin"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
			title: "Cadastro de imóvel",
			subtitle: "Atualize as informações do imóvel.",
			crumb: "Cadastro de imóvel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyForm, { propertyId: id })
		})
	});
}
//#endregion
export { EditPropertyPage as component };
