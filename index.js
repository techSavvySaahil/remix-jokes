var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), isbotModule = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/global-large.css
var global_large_default = "/build/_assets/global-large-QRYATTZA.css";

// app/styles/global-medium.css
var global_medium_default = "/build/_assets/global-medium-Y44SOM2R.css";

// app/styles/global.css
var global_default = "/build/_assets/global-JGZ6SQUF.css";

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), links = () => [
  { rel: "stylesheet", href: global_default },
  {
    rel: "stylesheet",
    href: global_medium_default,
    media: "print, (min-width: 640px)"
  },
  {
    rel: "stylesheet",
    href: global_large_default,
    media: "screen and (min-width: 1024px)"
  }
], meta = () => {
  let description = "Learn Remix and laugh at the same time!";
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix: So great, it's funny!" }
  ];
};
function Document({ children, title }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "keywords", content: "Remix,jokes" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "meta",
        {
          name: "twitter:image",
          content: "https://remix-jokes.lol/social.png"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:creator", content: "@remix_run" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:site", content: "@remix_run" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:title", content: "Remix Jokes" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      title ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("title", { children: title }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Document, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}) });
}
function ErrorBoundary() {
  let error = (0, import_react2.useRouteError)();
  if ((0, import_react2.isRouteErrorResponse)(error))
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Document, { title: `${error.status} ${error.statusText}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "error-container", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", { children: [
      error.status,
      " ",
      error.statusText
    ] }) }) });
  let errorMessage = error instanceof Error ? error.message : "Unknown error";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Document, { title: "Uh-oh!", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "error-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "App Error" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { children: errorMessage })
  ] }) });
}

// app/routes/jokes.$jokeId.tsx
var jokes_jokeId_exports = {};
__export(jokes_jokeId_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action,
  default: () => JokeRoute,
  loader: () => loader,
  meta: () => meta2
});
var import_node3 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/common/utils.ts
var sortKeyMapCheck = (key) => {
  switch (key) {
    case "name":
      return key;
    case "createdAt":
    default:
      return "createdAt";
  }
};

// app/components/Joke/index.tsx
var import_react3 = require("@remix-run/react"), import_jsx_runtime3 = require("react/jsx-runtime");
function JokeDisplay({
  canDelete = !0,
  isOwner,
  joke
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "joke-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
      '"',
      joke.name,
      '"'
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: joke.content }),
    isOwner ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        className: "button",
        disabled: !canDelete,
        name: "intent",
        type: "submit",
        value: "delete",
        children: "Delete"
      }
    ) }) : null
  ] });
}

// app/utils/db.server.ts
var import_client = require("@prisma/client");

// app/utils/singleton.server.ts
var singleton = (name, valueFactory) => {
  let g = global;
  return g.__singletons ??= {}, g.__singletons[name] ??= valueFactory(), g.__singletons[name];
};

// app/utils/db.server.ts
var db = singleton("prisma", () => new import_client.PrismaClient());

// app/utils/session.server.ts
var import_node2 = require("@remix-run/node"), import_bcryptjs = __toESM(require("bcryptjs"));
async function register({ password, username }) {
  let passwordHash = await import_bcryptjs.default.hash(password, 10);
  return { id: (await db.user.create({
    data: { passwordHash, username }
  })).id, username };
}
async function login({ password, username }) {
  let user = await db.user.findUnique({
    where: { username }
  });
  return !user || !await import_bcryptjs.default.compare(password, user.passwordHash) ? null : { id: user.id, username };
}
var sessionSecret = "remixrulz";
if (!sessionSecret)
  throw new Error("SESSION_SECRET must be set");
var storage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: !0,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: !0
  }
});
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
async function getUserId(request) {
  let userId = (await getUserSession(request)).get("userId");
  return !userId || typeof userId != "string" ? null : userId;
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = (await getUserSession(request)).get("userId");
  if (!userId || typeof userId != "string") {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (typeof userId != "string")
    return null;
  let user = await db.user.findUnique({
    select: { id: !0, username: !0 },
    where: { id: userId }
  });
  if (!user)
    throw await logout(request);
  return user;
}
async function getAllUsers(request) {
  if (typeof await getUserId(request) != "string")
    return [];
  let users = await db.user.findMany({
    select: { id: !0, username: !0, jokes: { select: { name: !0, id: !0, createdAt: !0 } } }
  });
  if (!users.length)
    throw await logout(request);
  return users;
}
async function logout(request) {
  let session = await getUserSession(request);
  return (0, import_node2.redirect)("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
async function createUserSession(userId, redirectTo) {
  let session = await storage.getSession();
  return session.set("userId", userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}

// app/routes/jokes.$jokeId.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), meta2 = ({ data }) => {
  let { description, title } = data ? {
    description: `Enjoy the "${data.joke.name}" joke and much more`,
    title: `"${data.joke.name}" joke`
  } : { description: "No joke found", title: "No joke" };
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title }
  ];
}, loader = async ({ params, request }) => {
  let userId = await getUserId(request), joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke)
    throw new Response("What a joke! Not found.", { status: 404 });
  return (0, import_node3.json)({
    isOwner: userId === joke.jokesterId,
    joke
  });
}, action = async ({ params, request }) => {
  let form = await request.formData();
  if (form.get("intent") !== "delete")
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400
    });
  let userId = await requireUserId(request), joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke)
    throw new Response("Can't delete what does not exist", { status: 404 });
  if (joke.jokesterId !== userId)
    throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  await db.joke.delete({ where: { id: params.jokeId } });
  let { searchParams } = new URL(request.url), key = searchParams.get("sortKey") || "", sortKey = sortKeyMapCheck(key), user = searchParams.get("user") || userId, keyword = searchParams.get("keyword") || "", queryParams = `?user=${user}&keyword=${keyword}&sortKey=${sortKey}`;
  return (0, import_node3.redirect)(`/jokes${queryParams}`);
};
function JokeRoute() {
  let data = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(JokeDisplay, { isOwner: data.isOwner, joke: data.joke });
}
function ErrorBoundary2() {
  let { jokeId } = (0, import_react4.useParams)(), error = (0, import_react4.useRouteError)();
  if ((0, import_react4.isRouteErrorResponse)(error)) {
    if (error.status === 400)
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "error-container", children: "What you're trying to do is not allowed." });
    if (error.status === 403)
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "error-container", children: [
        'Sorry, but "',
        jokeId,
        '" is not your joke.'
      ] });
    if (error.status === 404)
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "error-container", children: [
        'Huh? What the heck is "',
        jokeId,
        '"?'
      ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "error-container", children: [
    "There was an error loading joke by the id $",
    jokeId,
    ". Sorry."
  ] });
}

// app/routes/jokes._index.tsx
var jokes_index_exports = {};
__export(jokes_index_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  default: () => JokesIndexRoute
});
var import_react5 = require("@remix-run/react"), import_jsx_runtime5 = require("react/jsx-runtime");
function JokesIndexRoute() {
  let { jokeId } = (0, import_react5.useParams)();
  if (!jokeId)
    throw new Response("No jokes", { status: 404 });
  return null;
}
function ErrorBoundary3() {
  return (0, import_react5.useRouteError)().status === 404 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "error-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
      "There are no jokes to display. Click on a joke from the list on the left side.",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
      "You can change filters to see more jokes if there are none in the list.",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
      "Also, you can add a joke and make people laugh.",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.Link, { to: "new", children: "Add your own" })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "error-container", children: "I did a whoopsies." });
}

// app/routes/jokes[.]rss.tsx
var jokes_rss_exports = {};
__export(jokes_rss_exports, {
  loader: () => loader2
});
function escapeCdata(s) {
  return s.replace(/\]\]>/g, "]]]]><![CDATA[>");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
var loader2 = async ({ request }) => {
  let userId = await getUserId(request), jokes = userId ? await db.joke.findMany({
    include: { jokester: { select: { username: !0 } } },
    orderBy: { createdAt: "desc" },
    take: 100,
    where: { jokesterId: userId }
  }) : [], host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host)
    throw new Error("Could not determine domain URL.");
  let jokesUrl = `${`${host.includes("localhost") ? "http" : "https"}://${host}`}/jokes`, rssString = `
    <rss xmlns:blogChannel="${jokesUrl}" version="2.0">
      <channel>
        <title>Remix Jokes</title>
        <link>${jokesUrl}</link>
        <description>Some funny jokes</description>
        <language>en-us</language>
        <generator>Kody the Koala</generator>
        <ttl>40</ttl>
        ${jokes.map(
    (joke) => `
            <item>
              <title><![CDATA[${escapeCdata(joke.name)}]]></title>
              <description><![CDATA[A funny joke called ${escapeHtml(
      joke.name
    )}]]></description>
              <author><![CDATA[${escapeCdata(
      joke.jokester.username
    )}]]></author>
              <pubDate>${joke.createdAt.toUTCString()}</pubDate>
              <link>${jokesUrl}/${joke.id}</link>
              <guid>${jokesUrl}/${joke.id}</guid>
            </item>
          `.trim()
  ).join(`
`)}
      </channel>
    </rss>
  `.trim();
  return new Response(rssString, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(rssString))
    }
  });
};

// app/routes/jokes.new.tsx
var jokes_new_exports = {};
__export(jokes_new_exports, {
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action2,
  default: () => NewJokeRoute,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node"), import_react6 = require("@remix-run/react");

// app/utils/request.server.ts
var import_node4 = require("@remix-run/node"), badRequest = (data) => (0, import_node4.json)(data, { status: 400 });

// app/routes/jokes.new.tsx
var import_jsx_runtime6 = require("react/jsx-runtime"), loader3 = async ({ request }) => {
  if (!await getUserId(request))
    throw new Response("Unauthorized", { status: 401 });
  return (0, import_node5.json)({});
};
function validateJokeContent(content) {
  if (content.length < 10)
    return "That joke is too short";
}
function validateJokeName(name) {
  if (name.length < 3)
    return "That joke's name is too short";
}
var action2 = async ({ request }) => {
  let userId = await requireUserId(request), form = await request.formData(), content = form.get("content"), name = form.get("name");
  if (typeof content != "string" || typeof name != "string")
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly."
    });
  let fieldErrors = {
    content: validateJokeContent(content),
    name: validateJokeName(name)
  }, fields = { content, name };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    });
  let joke = await db.joke.create({
    data: { ...fields, jokesterId: userId }
  });
  return (0, import_node5.redirect)(`/jokes/${joke.id}`);
};
function NewJokeRoute() {
  let actionData = (0, import_react6.useActionData)(), navigation = (0, import_react6.useNavigation)();
  if (navigation.formData) {
    let content = navigation.formData.get("content"), name = navigation.formData.get("name");
    if (typeof content == "string" && typeof name == "string" && !validateJokeContent(content) && !validateJokeName(name))
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        JokeDisplay,
        {
          canDelete: !1,
          isOwner: !0,
          joke: { name, content }
        }
      );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "new-joke-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "Add your own hilarious joke" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react6.Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
          "Name:",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "input",
            {
              defaultValue: actionData?.fields?.name,
              name: "name",
              type: "text",
              "aria-invalid": Boolean(actionData?.fieldErrors?.name),
              "aria-errormessage": actionData?.fieldErrors?.name ? "name-error" : void 0
            }
          )
        ] }),
        actionData?.fieldErrors?.name ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "form-validation-error", id: "name-error", role: "alert", children: actionData.fieldErrors.name }) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
          "Content:",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "textarea",
            {
              defaultValue: actionData?.fields?.content,
              name: "content",
              "aria-invalid": Boolean(actionData?.fieldErrors?.content),
              "aria-errormessage": actionData?.fieldErrors?.content ? "content-error" : void 0
            }
          )
        ] }),
        actionData?.fieldErrors?.content ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "p",
          {
            className: "form-validation-error",
            id: "content-error",
            role: "alert",
            children: actionData.fieldErrors.content
          }
        ) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        actionData?.formError ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "form-validation-error", role: "alert", children: actionData.formError }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "submit", className: "button", children: "Add" })
      ] })
    ] })
  ] });
}
function ErrorBoundary4() {
  let error = (0, import_react6.useRouteError)();
  return (0, import_react6.isRouteErrorResponse)(error) && error.status === 401 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "error-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "You must be logged in to create a joke." }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react6.Link, { to: "/login", children: "Login" })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "error-container", children: "Something unexpected went wrong. Sorry about that." });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => IndexRoute,
  links: () => links2
});
var import_react7 = require("@remix-run/react");

// app/styles/index.css
var styles_default = "/build/_assets/index-BLLG25QW.css";

// app/routes/_index.tsx
var import_jsx_runtime7 = require("react/jsx-runtime"), links2 = () => [
  { rel: "stylesheet", href: styles_default }
];
function IndexRoute() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "content", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("h1", { children: [
      "Remix ",
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "Jokes!" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("nav", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react7.Link, { to: "jokes", children: "Read Jokes" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react7.Link, { reloadDocument: !0, to: "/jokes.rss", children: "RSS" }) })
    ] }) })
  ] }) });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader4
});
var import_node6 = require("@remix-run/node");
var action3 = async ({ request }) => logout(request), loader4 = async () => (0, import_node6.redirect)("/");

// app/routes/jokes.tsx
var jokes_exports = {};
__export(jokes_exports, {
  ErrorBoundary: () => ErrorBoundary5,
  default: () => JokesRoute,
  links: () => links3,
  loader: () => loader5
});
var import_node7 = require("@remix-run/node"), import_react13 = require("@remix-run/react");

// app/styles/jokes.css
var jokes_default = "/build/_assets/jokes-QQRKXSHZ.css";

// app/components/Header/index.tsx
var import_react8 = require("@remix-run/react"), import_jsx_runtime8 = require("react/jsx-runtime"), Header = ({ userData }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("header", { className: "jokes-header", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "container", children: [
  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { className: "home-link", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react8.Link, { to: "/", title: "Remix Jokes", "aria-label": "Remix Jokes", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "logo", children: "\u{1F92A}" }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "logo-medium", children: "J\u{1F92A}KES" })
  ] }) }),
  userData ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "user-info", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: `Hi ${userData.username}` }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react8.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "submit", className: "button", children: "Logout" }) })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react8.Link, { to: "/login", children: "Login" })
] }) }), Header_default = Header;

// app/components/Footer/index.tsx
var import_react9 = require("@remix-run/react"), import_jsx_runtime9 = require("react/jsx-runtime"), Footer = () => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("footer", { className: "jokes-footer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react9.Link, { reloadDocument: !0, to: "/jokes.rss", children: "RSS" }) }) }), Footer_default = Footer;

// app/components/LeftPanel/index.tsx
var import_react11 = require("react"), import_react12 = require("@remix-run/react");

// app/components/JokesList/index.tsx
var import_react10 = require("@remix-run/react"), import_jsx_runtime10 = require("react/jsx-runtime"), JokesList = ({ jokes, active, queryFilters, changeSelectedJoke }) => {
  let { user, sortKey, keyword } = queryFilters, queryParams = `?user=${user}&keyword=${keyword}&sortKey=${sortKey}`;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: "jokes-list", children: jokes.length > 0 ? jokes.map(({ id, name }) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react10.Link, { className: active === id ? "active-joke" : "", prefetch: "intent", to: `${id}${queryParams}`, onClick: () => changeSelectedJoke(id), children: name }) }, id)) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: "No jokes found" }) });
}, JokesList_default = JokesList;

// app/components/LeftPanel/index.tsx
var import_jsx_runtime11 = require("react/jsx-runtime"), LeftPanel = ({ data }) => {
  let { jokeListItems: jokeList, allUsersData, user: userData, queryFilters } = data, navigate = (0, import_react12.useNavigate)(), inputRef = (0, import_react11.useRef)(null), [selectedJokeId, setSelectedJokeId] = (0, import_react11.useState)("");
  (0, import_react11.useEffect)(() => {
    inputRef.current && (inputRef.current.value = queryFilters.keyword);
  }, []);
  let filtersReducer = (state, action5) => {
    switch (action5.type) {
      case "KEYWORD_CHANGED" /* KEYWORD_CHANGED */:
        return {
          ...state,
          keyword: action5.value
        };
      case "USER_UPDATED" /* USER_UPDATED */:
        return {
          ...state,
          user: action5.value
        };
      case "SORT_UPDATED" /* SORT_UPDATED */:
        return {
          ...state,
          sortKey: action5.value
        };
      default:
        return state;
    }
  }, [selectedFilters, dispatchFilters] = (0, import_react11.useReducer)(filtersReducer, queryFilters), urlJokeId = (0, import_react12.useParams)().jokeId;
  (0, import_react11.useEffect)(() => {
    if (!(location.pathname === "/jokes/new"))
      if (urlJokeId)
        setSelectedJokeId(urlJokeId);
      else {
        let jokeId = "", isJokePresent = jokeList.some((joke) => joke.id === selectedJokeId);
        jokeId = isJokePresent ? selectedJokeId : jokeList[0]?.id, jokeId && (isJokePresent || setSelectedJokeId(jokeId), navigateTo(jokeId));
      }
  }, [allUsersData]);
  let navigateTo = (jokeId) => {
    let { user, keyword, sortKey } = queryFilters, queryParams = `?user=${user}&keyword=${keyword}&sortKey=${sortKey}`;
    navigate(`${jokeId}${queryParams}`);
  }, selectUser = (e) => {
    let { value: id = "" } = e.target;
    dispatchFilters({
      type: "USER_UPDATED" /* USER_UPDATED */,
      value: id
    });
  }, sortJokes = (e) => {
    let { value: sortKey = "name" } = e.target;
    (sortKey === "name" || sortKey === "createdAt") && dispatchFilters({
      type: "SORT_UPDATED" /* SORT_UPDATED */,
      value: sortKey
    });
  }, keywordHandler = () => {
    dispatchFilters({
      type: "KEYWORD_CHANGED" /* KEYWORD_CHANGED */,
      value: inputRef.current?.value || ""
    });
  }, applyFilters = () => {
    let { user, keyword, sortKey } = selectedFilters, url = `/jokes?${`user=${user}&keyword=${keyword}&sortKey=${sortKey}`}`;
    navigate(url);
  }, showRandomJoke = () => {
    if (jokeList.length < 2)
      return;
    let randomIdx = Math.round(Math.random() * (jokeList.length - 1)), pickedJokeId = jokeList[randomIdx].id;
    pickedJokeId === selectedJokeId ? showRandomJoke() : (changeSelectedJoke(pickedJokeId), navigateTo(pickedJokeId));
  }, changeSelectedJoke = (id) => {
    setSelectedJokeId(id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "left-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { children: "Select" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "small-desc", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("i", { children: "(a user to see their jokes)" }) }),
      ":",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("select", { className: "user-dropdown", name: "selectedUser", defaultValue: selectedFilters.user, onChange: selectUser, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "all", children: "All" }, "all"),
        Object.keys(allUsersData)?.map((user) => {
          let { id, username } = allUsersData[user] || {}, text = id === userData.id ? `(You) ${username}` : username;
          return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: id, children: text }, id);
        })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { children: "Search" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "small-desc", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("i", { children: "(a keyword)" }) }),
      ":",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("input", { type: "text", ref: inputRef, placeholder: "Search a joke", onChange: keywordHandler })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { children: "Sort" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "small-desc", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("i", { children: "(by name or date)" }) }),
      ":",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("select", { className: "sort-dropdown", name: "jokeSorter", defaultValue: selectedFilters.sortKey, onChange: sortJokes, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "name", children: "Name" }, "name"),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "createdAt", children: "Date" }, "date")
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "button", onClick: applyFilters, children: "Apply" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "click-to-read", children: "Click on a joke to read it:" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(JokesList_default, { jokes: jokeList, active: selectedJokeId, queryFilters, changeSelectedJoke }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "button", onClick: showRandomJoke, children: "See a random joke" })
  ] });
}, LeftPanel_default = LeftPanel;

// app/routes/jokes.tsx
var import_jsx_runtime12 = require("react/jsx-runtime"), links3 = () => [
  { rel: "stylesheet", href: jokes_default }
], loader5 = async ({ request }) => {
  let activeUser = await getUser(request);
  if (!activeUser?.id)
    throw new Response("Unauthorized", { status: 401 });
  let userList = activeUser ? await getAllUsers(request) : [], allUsersData = {};
  if (activeUser) {
    userList.forEach((user2) => {
      allUsersData ? allUsersData[user2.id] = user2 : allUsersData = { [user2.id]: user2 };
    });
    let { searchParams } = new URL(request.url), key = searchParams.get("sortKey") || "createdAt", sortKey = sortKeyMapCheck(key), user = searchParams.get("user") || activeUser.id, keyword = searchParams.get("keyword") || "", queryFilters = { sortKey, user, keyword }, updatedList = [];
    return user !== "all" ? updatedList = allUsersData[user]?.jokes || [] : Object.values(allUsersData).forEach((userInfo) => {
      userInfo && updatedList.push(...userInfo.jokes);
    }), keyword !== "" && (updatedList = updatedList.filter((joke) => !!joke.name.toLowerCase().includes(keyword.toLowerCase()))), updatedList = updatedList.sort((a, b) => a[sortKey] < b[sortKey] ? -1 : 1), (0, import_node7.json)({ jokeListItems: updatedList || [], user: activeUser, allUsersData, queryFilters });
  }
  return null;
};
function JokesRoute() {
  let data = (0, import_react13.useLoaderData)(), isNewView = (0, import_react13.useLocation)().pathname === "/jokes/new";
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "jokes-layout", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Header_default, { userData: data?.user }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("main", { className: "jokes-main", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "container", children: [
      data?.user?.id && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LeftPanel_default, { data }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "content-container", children: [
        !isNewView && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react13.Link, { to: "new", className: "button", children: "Add your own" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "jokes-outlet", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react13.Outlet, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Footer_default, {})
  ] });
}
function ErrorBoundary5() {
  let error = (0, import_react13.useRouteError)();
  return (0, import_react13.isRouteErrorResponse)(error) && error.status === 401 ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "error-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "You must be logged in to view a joke." }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react13.Link, { to: "/login", children: "Login" })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "error-container", children: "Something unexpected went wrong. Sorry about that." });
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => Login,
  links: () => links4,
  meta: () => meta3
});
var import_react14 = require("@remix-run/react");

// app/styles/login.css
var login_default = "/build/_assets/login-RXC4QZMY.css";

// app/routes/login.tsx
var import_jsx_runtime13 = require("react/jsx-runtime"), links4 = () => [
  { rel: "stylesheet", href: login_default }
], meta3 = () => {
  let description = "Login to submit your own jokes to Remix Jokes!";
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix Jokes | Login" }
  ];
};
function validateUsername(username) {
  if (username.length < 3)
    return "Usernames must be at least 3 characters long";
}
function validatePassword(password) {
  if (password.length < 6)
    return "Passwords must be at least 6 characters long";
}
function validateUrl(url) {
  return ["/jokes", "/", "https://remix.run"].includes(url) ? url : "/jokes";
}
var action4 = async ({ request }) => {
  let form = await request.formData(), loginType = form.get("loginType"), password = form.get("password"), username = form.get("username"), redirectTo = validateUrl(
    form.get("redirectTo") || "/jokes"
  );
  if (typeof loginType != "string" || typeof password != "string" || typeof username != "string")
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly."
    });
  let fields = { loginType, password, username }, fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username)
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    });
  switch (loginType) {
    case "login": {
      let user = await login({ username, password });
      return user ? createUserSession(user.id, redirectTo) : badRequest({
        fieldErrors: null,
        fields,
        formError: "Username/Password combination is incorrect"
      });
    }
    case "register": {
      if (await db.user.findFirst({ where: { username } }))
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`
        });
      let user = await register({ username, password });
      return user ? createUserSession(user.id, redirectTo) : badRequest({
        fieldErrors: null,
        fields,
        formError: "Something went wrong trying to create a new user."
      });
    }
    default:
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid"
      });
  }
};
function Login() {
  let actionData = (0, import_react14.useActionData)(), [searchParams] = (0, import_react14.useSearchParams)();
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "content", "data-light": "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h1", { children: "Login" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react14.Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "input",
          {
            type: "hidden",
            name: "redirectTo",
            value: searchParams.get("redirectTo") ?? void 0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("fieldset", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("legend", { className: "sr-only", children: "Login or Register?" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "input",
              {
                type: "radio",
                name: "loginType",
                value: "login",
                defaultChecked: !actionData?.fields?.loginType || actionData?.fields?.loginType === "login"
              }
            ),
            " ",
            "Login"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "input",
              {
                type: "radio",
                name: "loginType",
                value: "register",
                defaultChecked: actionData?.fields?.loginType === "register"
              }
            ),
            " ",
            "Register"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("label", { htmlFor: "username-input", children: "Username" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "input",
            {
              type: "text",
              id: "username-input",
              name: "username",
              defaultValue: actionData?.fields?.username,
              "aria-invalid": Boolean(actionData?.fieldErrors?.username),
              "aria-errormessage": actionData?.fieldErrors?.username ? "username-error" : void 0
            }
          ),
          actionData?.fieldErrors?.username ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "p",
            {
              className: "form-validation-error",
              role: "alert",
              id: "username-error",
              children: actionData.fieldErrors.username
            }
          ) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("label", { htmlFor: "password-input", children: "Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "input",
            {
              id: "password-input",
              name: "password",
              type: "password",
              defaultValue: actionData?.fields?.password,
              "aria-invalid": Boolean(actionData?.fieldErrors?.password),
              "aria-errormessage": actionData?.fieldErrors?.password ? "password-error" : void 0
            }
          ),
          actionData?.fieldErrors?.password ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "p",
            {
              className: "form-validation-error",
              role: "alert",
              id: "password-error",
              children: actionData.fieldErrors.password
            }
          ) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { id: "form-error-message", children: actionData?.formError ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "form-validation-error", role: "alert", children: actionData.formError }) : null }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "submit", className: "button", children: "Submit" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "links", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react14.Link, { to: "/", children: "Home" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react14.Link, { to: "/jokes", children: "Jokes" }) })
    ] }) })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-KCT6DAY3.js", imports: ["/build/_shared/chunk-LDYMJPB6.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-GHQ6P3BE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-TGBGWLVC.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/jokes": { id: "routes/jokes", parentId: "root", path: "jokes", index: void 0, caseSensitive: void 0, module: "/build/routes/jokes-7O2YQZP3.js", imports: ["/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-QVTEGN3F.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/jokes.$jokeId": { id: "routes/jokes.$jokeId", parentId: "routes/jokes", path: ":jokeId", index: void 0, caseSensitive: void 0, module: "/build/routes/jokes.$jokeId-7XIULECB.js", imports: ["/build/_shared/chunk-6HUOVPLN.js", "/build/_shared/chunk-VAWQIAN7.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/jokes._index": { id: "routes/jokes._index", parentId: "routes/jokes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/jokes._index-JUUHH65B.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/jokes.new": { id: "routes/jokes.new", parentId: "routes/jokes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/jokes.new-VHI466LA.js", imports: ["/build/_shared/chunk-XYRB6XSM.js", "/build/_shared/chunk-6HUOVPLN.js", "/build/_shared/chunk-VAWQIAN7.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/jokes[.]rss": { id: "routes/jokes[.]rss", parentId: "root", path: "jokes.rss", index: void 0, caseSensitive: void 0, module: "/build/routes/jokes[.]rss-7KGE2CWI.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-ELFZSE2Q.js", imports: ["/build/_shared/chunk-XYRB6XSM.js", "/build/_shared/chunk-VAWQIAN7.js", "/build/_shared/chunk-QVTEGN3F.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GPTXG6BX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "2594e177", hmr: void 0, url: "/build/manifest-2594E177.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/jokes.$jokeId": {
    id: "routes/jokes.$jokeId",
    parentId: "routes/jokes",
    path: ":jokeId",
    index: void 0,
    caseSensitive: void 0,
    module: jokes_jokeId_exports
  },
  "routes/jokes._index": {
    id: "routes/jokes._index",
    parentId: "routes/jokes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: jokes_index_exports
  },
  "routes/jokes[.]rss": {
    id: "routes/jokes[.]rss",
    parentId: "root",
    path: "jokes.rss",
    index: void 0,
    caseSensitive: void 0,
    module: jokes_rss_exports
  },
  "routes/jokes.new": {
    id: "routes/jokes.new",
    parentId: "routes/jokes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: jokes_new_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/jokes": {
    id: "routes/jokes",
    parentId: "root",
    path: "jokes",
    index: void 0,
    caseSensitive: void 0,
    module: jokes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
});
