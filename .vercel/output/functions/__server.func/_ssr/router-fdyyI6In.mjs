import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, w as useRouter, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-fdyyI6In.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function money(value) {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0
	});
}
function moneyMonth(value) {
	return `${money(value)} / mês`;
}
function formatDate(iso) {
	const [year, month, day] = iso.split("-");
	if (!year || !month || !day) return iso;
	return `${day}/${month}/${year}`;
}
function todayISO() {
	const now = /* @__PURE__ */ new Date();
	return (/* @__PURE__ */ new Date(now.getTime() - now.getTimezoneOffset() * 6e4)).toISOString().slice(0, 10);
}
function shortProperty(property) {
	return `${property.type === "Apartamento" ? "Apto." : property.type} ${property.neighborhood}`;
}
function nextCode(prefix, ids) {
	const max = ids.reduce((acc, id) => {
		const value = Number(id.replace(/\D/g, ""));
		return Number.isFinite(value) ? Math.max(acc, value) : acc;
	}, 0);
	return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}
var green = /* @__PURE__ */ new Set([
	"Disponível",
	"Concluída",
	"Ativo",
	"Registrada",
	"Recebido",
	"Conferido",
	"Finalizada"
]);
var amber = /* @__PURE__ */ new Set([
	"Em análise",
	"Em negociação",
	"Em andamento",
	"Pendente",
	"Documentação",
	"Documentação solicitada",
	"Proposta recebida",
	"Rascunho"
]);
var blue = /* @__PURE__ */ new Set(["Em locação"]);
var red = /* @__PURE__ */ new Set([
	"Recusada",
	"Indisponível",
	"Encerrado"
]);
function toneFor(status) {
	if (green.has(status)) return "green";
	if (amber.has(status)) return "amber";
	if (blue.has(status)) return "blue";
	if (red.has(status)) return "red";
	return "muted";
}
var DEMO_LANDLORD = "Helena Duarte";
var DEMO_TENANT = {
	name: "Marina Costa",
	email: "marina.costa@email.com",
	phone: "(61) 99999-0000"
};
var memoryStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0,
	clear: () => void 0,
	key: () => null,
	length: 0
};
var seedProperties = [
	{
		id: "MI-001",
		type: "Apartamento",
		neighborhood: "Asa Norte",
		city: "Brasília/DF",
		price: 2400,
		beds: 2,
		parking: 1,
		area: 68,
		status: "Disponível",
		landlord: DEMO_LANDLORD,
		image: "/imoveis/mi-001.jpg",
		description: "Apartamento arejado na Asa Norte, com sala integrada, dois quartos e uma vaga. Próximo ao comércio local e com boa incidência de luz."
	},
	{
		id: "MI-002",
		type: "Casa",
		neighborhood: "Lago Sul",
		city: "Brasília/DF",
		price: 4800,
		beds: 3,
		parking: 2,
		area: 145,
		status: "Em locação",
		landlord: DEMO_LANDLORD,
		image: "/imoveis/mi-002.jpg",
		description: "Casa com jardim no Lago Sul, três quartos, duas vagas e área de estar voltada para o gramado. Indicada para famílias."
	},
	{
		id: "MI-003",
		type: "Studio",
		neighborhood: "Sudoeste",
		city: "Brasília/DF",
		price: 1200,
		beds: 1,
		parking: 1,
		area: 32,
		status: "Em locação",
		landlord: DEMO_LANDLORD,
		image: "/imoveis/mi-003.jpg",
		description: "Studio compacto no Sudoeste, com cozinha integrada e uma vaga. Boa opção para quem busca praticidade perto do centro."
	},
	{
		id: "MI-004",
		type: "Apartamento",
		neighborhood: "Águas Claras",
		city: "Brasília/DF",
		price: 1950,
		beds: 2,
		parking: 1,
		area: 58,
		status: "Disponível",
		landlord: "Paulo Neri",
		image: "/imoveis/mi-004.jpg",
		description: "Apartamento em Águas Claras com dois quartos, uma vaga e vista para a área residencial. Condomínio com portaria."
	},
	{
		id: "MI-005",
		type: "Apartamento",
		neighborhood: "Asa Sul",
		city: "Brasília/DF",
		price: 3100,
		beds: 3,
		parking: 1,
		area: 92,
		status: "Disponível",
		landlord: "Paulo Neri",
		image: "/imoveis/mi-005.jpg",
		description: "Apartamento na Asa Sul com três quartos e sala ampla. Região arborizada e acesso fácil ao eixo monumental."
	},
	{
		id: "MI-006",
		type: "Casa",
		neighborhood: "Park Way",
		city: "Brasília/DF",
		price: 6200,
		beds: 4,
		parking: 3,
		area: 210,
		status: "Disponível",
		landlord: DEMO_LANDLORD,
		image: "/imoveis/mi-006.jpg",
		description: "Casa ampla no Park Way, quatro quartos e três vagas, com jardim frontal e áreas sociais integradas."
	}
];
var seedRequests = [
	{
		id: "SOL-032",
		propertyId: "MI-001",
		name: DEMO_TENANT.name,
		email: DEMO_TENANT.email,
		phone: DEMO_TENANT.phone,
		message: "Tenho interesse em visitar o apartamento neste mês.",
		date: "2026-11-09",
		status: "Em análise",
		mine: true
	},
	{
		id: "SOL-031",
		propertyId: "MI-002",
		name: "Rafael Lima",
		email: "rafael.lima@email.com",
		phone: "(61) 98888-1010",
		message: "Gostaria de seguir com a proposta da casa.",
		date: "2026-11-02",
		status: "Em negociação",
		mine: false
	},
	{
		id: "SOL-030",
		propertyId: "MI-003",
		name: "Bruno Alves",
		email: "bruno.alves@email.com",
		phone: "(61) 97777-2020",
		message: "Contrato do studio já foi concluído.",
		date: "2026-10-18",
		status: "Concluída",
		mine: false
	},
	{
		id: "SOL-029",
		propertyId: "MI-002",
		name: DEMO_TENANT.name,
		email: DEMO_TENANT.email,
		phone: DEMO_TENANT.phone,
		message: "Interesse anterior, já encerrado.",
		date: "2026-11-02",
		status: "Concluída",
		mine: true
	}
];
var seedNegotiations = [
	{
		id: "NEG-001",
		propertyId: "MI-001",
		requestId: "SOL-032",
		tenant: DEMO_TENANT.name,
		landlord: DEMO_LANDLORD,
		stage: "Em análise",
		update: "Documentação solicitada",
		status: "Em andamento"
	},
	{
		id: "NEG-002",
		propertyId: "MI-002",
		requestId: "SOL-031",
		tenant: "Rafael Lima",
		landlord: DEMO_LANDLORD,
		stage: "Em negociação",
		update: "Proposta recebida",
		status: "Em andamento"
	},
	{
		id: "NEG-003",
		propertyId: "MI-003",
		requestId: "SOL-030",
		tenant: "Bruno Alves",
		landlord: DEMO_LANDLORD,
		stage: "Finalizada",
		update: "Contrato assinado",
		status: "Finalizada"
	}
];
var seedDocuments = [{
	id: "DOC-001",
	protocol: "SOL-032",
	person: DEMO_TENANT.name,
	type: "Identificação",
	status: "Pendente"
}, {
	id: "DOC-002",
	protocol: "SOL-031",
	person: "Rafael Lima",
	type: "Comprovante",
	status: "Recebido"
}];
var seedContracts = [
	{
		id: "CTR-014",
		propertyId: "MI-001",
		landlord: DEMO_LANDLORD,
		tenant: DEMO_TENANT.name,
		status: "Rascunho"
	},
	{
		id: "CTR-013",
		propertyId: "MI-002",
		landlord: DEMO_LANDLORD,
		tenant: "Rafael Lima",
		status: "Ativo"
	},
	{
		id: "CTR-012",
		propertyId: "MI-003",
		landlord: DEMO_LANDLORD,
		tenant: "Bruno Alves",
		status: "Ativo"
	}
];
var seedRevenues = [
	{
		id: "REC-001",
		propertyId: "MI-001",
		competence: "Nov/2026",
		amount: 2400,
		note: "Aluguel de novembro"
	},
	{
		id: "REC-002",
		propertyId: "MI-002",
		competence: "Nov/2026",
		amount: 4800,
		note: "Aluguel de novembro"
	},
	{
		id: "REC-003",
		propertyId: "MI-003",
		competence: "Nov/2026",
		amount: 1200,
		note: "Aluguel de novembro"
	},
	{
		id: "REC-004",
		propertyId: "MI-004",
		competence: "Nov/2026",
		amount: 1950,
		note: "Aluguel de novembro"
	},
	{
		id: "REC-005",
		propertyId: "MI-005",
		competence: "Nov/2026",
		amount: 3100,
		note: "Aluguel de novembro"
	}
];
var imageFor = (type) => type === "Casa" ? "/imoveis/mi-002.jpg" : type === "Studio" ? "/imoveis/mi-003.jpg" : "/imoveis/mi-001.jpg";
var seedSlice = {
	properties: seedProperties,
	requests: seedRequests,
	negotiations: seedNegotiations,
	documents: seedDocuments,
	contracts: seedContracts,
	revenues: seedRevenues,
	lastRequestId: "SOL-032"
};
var useStore = create()(persist((set, get) => ({
	role: null,
	...seedSlice,
	setRole: (role) => set({ role }),
	addProperty: (input) => {
		const id = nextCode("MI", get().properties.map((item) => item.id));
		const property = {
			...input,
			id,
			city: input.city ?? "Brasília/DF",
			image: input.image ?? imageFor(input.type)
		};
		set((state) => ({ properties: [property, ...state.properties] }));
		return id;
	},
	updateProperty: (id, patch) => set((state) => ({ properties: state.properties.map((item) => item.id === id ? {
		...item,
		...patch
	} : item) })),
	submitRequest: (input) => {
		const id = nextCode("SOL", get().requests.map((item) => item.id));
		const request = {
			...input,
			id,
			date: todayISO(),
			status: "Em análise",
			mine: true
		};
		set((state) => ({
			requests: [request, ...state.requests],
			lastRequestId: id
		}));
		return id;
	},
	updateRequestStatus: (id, status) => set((state) => {
		const requests = state.requests.map((item) => item.id === id ? {
			...item,
			status
		} : item);
		const request = requests.find((item) => item.id === id);
		if (!request) return { requests };
		const property = state.properties.find((item) => item.id === request.propertyId);
		let negotiations = state.negotiations;
		let properties = state.properties;
		const stage = status === "Concluída" ? "Finalizada" : status;
		const progress = status === "Concluída" || status === "Recusada" ? "Finalizada" : "Em andamento";
		if (negotiations.find((item) => item.requestId === id)) negotiations = negotiations.map((item) => item.requestId === id ? {
			...item,
			stage,
			status: progress,
			update: stage
		} : item);
		else if (property && status !== "Recusada") negotiations = [{
			id: nextCode("NEG", negotiations.map((item) => item.id)),
			propertyId: property.id,
			requestId: id,
			tenant: request.name,
			landlord: property.landlord,
			stage,
			update: "Situação atualizada",
			status: progress
		}, ...negotiations];
		if (status === "Concluída" && property) properties = properties.map((item) => item.id === property.id ? {
			...item,
			status: "Em locação"
		} : item);
		return {
			requests,
			negotiations,
			properties
		};
	}),
	updateNegotiation: (id, patch) => set((state) => ({ negotiations: state.negotiations.map((item) => item.id === id ? {
		...item,
		...patch
	} : item) })),
	addDocument: (input) => set((state) => ({ documents: [{
		...input,
		id: nextCode("DOC", state.documents.map((item) => item.id))
	}, ...state.documents] })),
	updateDocument: (id, status) => set((state) => ({ documents: state.documents.map((item) => item.id === id ? {
		...item,
		status
	} : item) })),
	addContract: (input) => set((state) => ({ contracts: [{
		...input,
		id: nextCode("CTR", state.contracts.map((item) => item.id))
	}, ...state.contracts] })),
	updateContract: (id, status) => set((state) => ({ contracts: state.contracts.map((item) => item.id === id ? {
		...item,
		status
	} : item) })),
	addRevenue: (input) => set((state) => ({ revenues: [{
		...input,
		id: nextCode("REC", state.revenues.map((item) => item.id))
	}, ...state.revenues] })),
	resetDemo: () => set({
		role: null,
		...seedSlice
	})
}), {
	name: "meuimovel",
	skipHydration: true,
	version: 1,
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (state) => ({
		role: state.role,
		properties: state.properties,
		requests: state.requests,
		negotiations: state.negotiations,
		documents: state.documents,
		contracts: state.contracts,
		revenues: state.revenues,
		lastRequestId: state.lastRequestId
	})
}));
var PROPERTY_STATUSES = [
	"Disponível",
	"Em locação",
	"Indisponível"
];
var REQUEST_STATUSES = [
	"Em análise",
	"Em negociação",
	"Concluída",
	"Recusada"
];
var DOC_STATUSES = [
	"Pendente",
	"Recebido",
	"Conferido"
];
var CONTRACT_STATUSES = [
	"Rascunho",
	"Ativo",
	"Encerrado"
];
var styles_default = "/assets/styles-DYGG4v4p.css";
var APP_NAME = "MeuImóvel";
var Route$22 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "MeuImóvel — sistema de gestão imobiliária para locatários, locadores e administradores."
			},
			{
				name: "theme-color",
				content: "#132541"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	(0, import_react.useEffect)(() => {
		useStore.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "top-center" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$21 = () => import("./routes-DpuQbMDF.mjs");
var Route$21 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./catalogo-DC20HAoo.mjs");
var Route$20 = createFileRoute("/catalogo")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./minhas-solicitacoes-Irgj_oM6.mjs");
var Route$19 = createFileRoute("/minhas-solicitacoes")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./solicitacao-enviada-yQCTKMw_.mjs");
var Route$18 = createFileRoute("/solicitacao-enviada")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./admin-DPZNT-wH.mjs");
var Route$17 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./financeiro-DTDg5dVD.mjs");
var Route$16 = createFileRoute("/admin/financeiro")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./negociacoes-Chtpus35.mjs");
var Route$15 = createFileRoute("/admin/negociacoes")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./operacoes-BqZor1Av.mjs");
var Route$14 = createFileRoute("/admin/operacoes")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./receitas-D-Dk57m-.mjs");
var Route$13 = createFileRoute("/admin/receitas")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./solicitacoes-DNbszQaT.mjs");
var Route$12 = createFileRoute("/admin/solicitacoes")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("../_id-BU1sto3n.mjs");
var Route$11 = createFileRoute("/imovel/$id")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./locador-CJzl2uJC.mjs");
var Route$10 = createFileRoute("/locador/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./financeiro-B5svb_Go.mjs");
var Route$9 = createFileRoute("/locador/financeiro")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./negociacoes-DTyRzdIZ.mjs");
var Route$8 = createFileRoute("/locador/negociacoes")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("../_id-BqdttORc.mjs");
var Route$7 = createFileRoute("/solicitar/$id")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./contratos-o2Edk-ZX.mjs");
var Route$6 = createFileRoute("/admin/contratos/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./novo-XP1ZINEN.mjs");
var Route$5 = createFileRoute("/admin/contratos/novo")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./documentos-J5BK-NTT.mjs");
var Route$4 = createFileRoute("/admin/documentos/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./novo-njR6GaYG.mjs");
var Route$3 = createFileRoute("/admin/documentos/novo")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./imoveis-CTV_huG_.mjs");
var Route$2 = createFileRoute("/admin/imoveis/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_id-Dj0M8gyf.mjs");
var Route$1 = createFileRoute("/admin/imoveis/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./novo-CshAu26t.mjs");
var Route = createFileRoute("/admin/imoveis/novo")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var CatalogoRoute = Route$20.update({
	id: "/catalogo",
	path: "/catalogo",
	getParentRoute: () => Route$22
});
var MinhasSolicitacoesRoute = Route$19.update({
	id: "/minhas-solicitacoes",
	path: "/minhas-solicitacoes",
	getParentRoute: () => Route$22
});
var SolicitacaoEnviadaRoute = Route$18.update({
	id: "/solicitacao-enviada",
	path: "/solicitacao-enviada",
	getParentRoute: () => Route$22
});
var AdminIndexRoute = Route$17.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$22
});
var AdminFinanceiroRoute = Route$16.update({
	id: "/admin/financeiro",
	path: "/admin/financeiro",
	getParentRoute: () => Route$22
});
var AdminNegociacoesRoute = Route$15.update({
	id: "/admin/negociacoes",
	path: "/admin/negociacoes",
	getParentRoute: () => Route$22
});
var AdminOperacoesRoute = Route$14.update({
	id: "/admin/operacoes",
	path: "/admin/operacoes",
	getParentRoute: () => Route$22
});
var AdminReceitasRoute = Route$13.update({
	id: "/admin/receitas",
	path: "/admin/receitas",
	getParentRoute: () => Route$22
});
var AdminSolicitacoesRoute = Route$12.update({
	id: "/admin/solicitacoes",
	path: "/admin/solicitacoes",
	getParentRoute: () => Route$22
});
var ImovelIdRoute = Route$11.update({
	id: "/imovel/$id",
	path: "/imovel/$id",
	getParentRoute: () => Route$22
});
var LocadorIndexRoute = Route$10.update({
	id: "/locador/",
	path: "/locador/",
	getParentRoute: () => Route$22
});
var LocadorFinanceiroRoute = Route$9.update({
	id: "/locador/financeiro",
	path: "/locador/financeiro",
	getParentRoute: () => Route$22
});
var LocadorNegociacoesRoute = Route$8.update({
	id: "/locador/negociacoes",
	path: "/locador/negociacoes",
	getParentRoute: () => Route$22
});
var SolicitarIdRoute = Route$7.update({
	id: "/solicitar/$id",
	path: "/solicitar/$id",
	getParentRoute: () => Route$22
});
var AdminContratosIndexRoute = Route$6.update({
	id: "/admin/contratos/",
	path: "/admin/contratos/",
	getParentRoute: () => Route$22
});
var AdminContratosNovoRoute = Route$5.update({
	id: "/admin/contratos/novo",
	path: "/admin/contratos/novo",
	getParentRoute: () => Route$22
});
var AdminDocumentosIndexRoute = Route$4.update({
	id: "/admin/documentos/",
	path: "/admin/documentos/",
	getParentRoute: () => Route$22
});
var AdminDocumentosNovoRoute = Route$3.update({
	id: "/admin/documentos/novo",
	path: "/admin/documentos/novo",
	getParentRoute: () => Route$22
});
var AdminImoveisIndexRoute = Route$2.update({
	id: "/admin/imoveis/",
	path: "/admin/imoveis/",
	getParentRoute: () => Route$22
});
var rootRouteChildren = {
	IndexRoute,
	CatalogoRoute,
	MinhasSolicitacoesRoute,
	SolicitacaoEnviadaRoute,
	AdminFinanceiroRoute,
	AdminNegociacoesRoute,
	AdminOperacoesRoute,
	AdminReceitasRoute,
	AdminSolicitacoesRoute,
	ImovelIdRoute,
	LocadorFinanceiroRoute,
	LocadorNegociacoesRoute,
	SolicitarIdRoute,
	AdminIndexRoute,
	LocadorIndexRoute,
	AdminContratosNovoRoute,
	AdminDocumentosNovoRoute,
	AdminImoveisIdRoute: Route$1.update({
		id: "/admin/imoveis/$id",
		path: "/admin/imoveis/$id",
		getParentRoute: () => Route$22
	}),
	AdminImoveisNovoRoute: Route.update({
		id: "/admin/imoveis/novo",
		path: "/admin/imoveis/novo",
		getParentRoute: () => Route$22
	}),
	AdminContratosIndexRoute,
	AdminDocumentosIndexRoute,
	AdminImoveisIndexRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { CONTRACT_STATUSES as a, DOC_STATUSES as c, useStore as d, formatDate as f, toneFor as g, shortProperty as h, Route$11 as i, PROPERTY_STATUSES as l, moneyMonth as m, Route$1 as n, DEMO_LANDLORD as o, money as p, Route$7 as r, DEMO_TENANT as s, router_exports as t, REQUEST_STATUSES as u };
