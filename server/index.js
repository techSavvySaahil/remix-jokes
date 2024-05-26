import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, Scripts, LiveReload, useRouteError, isRouteErrorResponse, Form, useLoaderData, useParams, Link, useActionData, useNavigation, useNavigate, useSearchParams } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { useState, useRef, useReducer, useEffect } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
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
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  const description = "Learn Remix and laugh at the same time!";
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix: So great, it's funny!" }
  ];
};
function Document({ children, title }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "Remix,jokes" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:image",
          content: "https://remix-jokes.lol/social.png"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: "@remix_run" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@remix_run" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Remix Jokes" }),
      /* @__PURE__ */ jsx(Meta, {}),
      title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function ErrorBoundary$3() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsx(Document, { title: `${error.status} ${error.statusText}`, children: /* @__PURE__ */ jsx("div", { className: "error-container", children: /* @__PURE__ */ jsxs("h1", { children: [
      error.status,
      " ",
      error.statusText
    ] }) }) });
  }
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return /* @__PURE__ */ jsx(Document, { title: "Uh-oh!", children: /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
    /* @__PURE__ */ jsx("h1", { children: "App Error" }),
    /* @__PURE__ */ jsx("pre", { children: errorMessage })
  ] }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$3,
  default: App,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function JokeDisplay({
  canDelete = true,
  isOwner,
  joke
}) {
  return /* @__PURE__ */ jsxs("div", { className: "joke-card", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      '"',
      joke.name,
      '"'
    ] }),
    /* @__PURE__ */ jsx("p", { children: joke.content }),
    isOwner ? /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsx(
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
const singleton = (name, valueFactory) => {
  var _a;
  const g = global;
  g.__singletons ?? (g.__singletons = {});
  (_a = g.__singletons)[name] ?? (_a[name] = valueFactory());
  return g.__singletons[name];
};
const db = singleton("prisma", () => new PrismaClient());
async function register({ password, username }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { passwordHash, username }
  });
  return { id: user.id, username };
}
async function login({ password, username }) {
  const user = await db.user.findUnique({
    where: { username }
  });
  if (!user) {
    return null;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return null;
  }
  return { id: user.id, username };
}
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}
const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}
async function getUser(request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  const user = await db.user.findUnique({
    select: { id: true, username: true },
    where: { id: userId }
  });
  if (!user) {
    throw await logout(request);
  }
  return user;
}
async function getAllUsers(request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  const users = await db.user.findMany({
    select: { id: true, username: true, jokes: { select: { name: true, id: true } } }
  });
  if (!users.length) {
    throw await logout(request);
  }
  return users;
}
async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}
const meta$1 = ({ data }) => {
  const { description, title } = data ? {
    description: `Enjoy the "${data.joke.name}" joke and much more`,
    title: `"${data.joke.name}" joke`
  } : { description: "No joke found", title: "No joke" };
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title }
  ];
};
const loader$5 = async ({ params, request }) => {
  const userId = await getUserId(request);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke) {
    throw new Response("What a joke! Not found.", { status: 404 });
  }
  return json({
    isOwner: userId === joke.jokesterId,
    joke
  });
};
const action$3 = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400
    });
  }
  const userId = await requireUserId(request);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke) {
    throw new Response("Can't delete what does not exist", { status: 404 });
  }
  if (joke.jokesterId !== userId) {
    throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  }
  await db.joke.delete({ where: { id: params.jokeId } });
  return redirect("/jokes");
};
function JokeRoute() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(JokeDisplay, { isOwner: data.isOwner, joke: data.joke });
}
function ErrorBoundary$2() {
  const { jokeId } = useParams();
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return /* @__PURE__ */ jsx("div", { className: "error-container", children: "What you're trying to do is not allowed." });
    }
    if (error.status === 403) {
      return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
        'Sorry, but "',
        jokeId,
        '" is not your joke.'
      ] });
    }
    if (error.status === 404) {
      return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
        'Huh? What the heck is "',
        jokeId,
        '"?'
      ] });
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
    "There was an error loading joke by the id $",
    jokeId,
    ". Sorry."
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$2,
  action: action$3,
  default: JokeRoute,
  loader: loader$5,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("No random joke found", { status: 404 });
  }
  const count = await db.joke.count({ where: { jokesterId: userId } });
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
    where: { jokesterId: userId }
  });
  if (!randomJoke) {
    throw new Response("No random joke found", { status: 404 });
  }
  return json({ randomJoke });
};
function JokesIndexRoute() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "joke-card", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      '"',
      data.randomJoke.name,
      '"'
    ] }),
    /* @__PURE__ */ jsx("p", { children: data.randomJoke.content })
  ] });
}
function ErrorBoundary$1() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error) && error.status === 404) {
    return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "There are no jokes to display. But we think you're funny. So, you can add a joke and make people laugh.",
        /* @__PURE__ */ jsx("br", {})
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "new", children: "Add your own" })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "error-container", children: "I did a whoopsies." });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  default: JokesIndexRoute,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function escapeCdata(s) {
  return s.replace(/\]\]>/g, "]]]]><![CDATA[>");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
const loader$3 = async ({ request }) => {
  const userId = await getUserId(request);
  const jokes = userId ? await db.joke.findMany({
    include: { jokester: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
    where: { jokesterId: userId }
  }) : [];
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;
  const jokesUrl = `${domain}/jokes`;
  const rssString = `
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
  ).join("\n")}
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const badRequest = (data) => json(data, { status: 400 });
const loader$2 = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return json({});
};
function validateJokeContent(content) {
  if (content.length < 10) {
    return "That joke is too short";
  }
}
function validateJokeName(name) {
  if (name.length < 3) {
    return "That joke's name is too short";
  }
}
const action$2 = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");
  if (typeof content !== "string" || typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly."
    });
  }
  const fieldErrors = {
    content: validateJokeContent(content),
    name: validateJokeName(name)
  };
  const fields = { content, name };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    });
  }
  const joke = await db.joke.create({
    data: { ...fields, jokesterId: userId }
  });
  return redirect(`/jokes/${joke.id}`);
};
function NewJokeRoute() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const actionData = useActionData();
  const navigation = useNavigation();
  if (navigation.formData) {
    const content = navigation.formData.get("content");
    const name = navigation.formData.get("name");
    if (typeof content === "string" && typeof name === "string" && !validateJokeContent(content) && !validateJokeName(name)) {
      return /* @__PURE__ */ jsx(
        JokeDisplay,
        {
          canDelete: false,
          isOwner: true,
          joke: { name, content }
        }
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { children: "Add your own hilarious joke" }),
    /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Name:",
          " ",
          /* @__PURE__ */ jsx(
            "input",
            {
              defaultValue: (_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.name,
              name: "name",
              type: "text",
              "aria-invalid": Boolean((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.name),
              "aria-errormessage": ((_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.name) ? "name-error" : void 0
            }
          )
        ] }),
        ((_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.name) ? /* @__PURE__ */ jsx("p", { className: "form-validation-error", id: "name-error", role: "alert", children: actionData.fieldErrors.name }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Content:",
          " ",
          /* @__PURE__ */ jsx(
            "textarea",
            {
              defaultValue: (_e = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _e.content,
              name: "content",
              "aria-invalid": Boolean((_f = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _f.content),
              "aria-errormessage": ((_g = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _g.content) ? "content-error" : void 0
            }
          )
        ] }),
        ((_h = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _h.content) ? /* @__PURE__ */ jsx(
          "p",
          {
            className: "form-validation-error",
            id: "content-error",
            role: "alert",
            children: actionData.fieldErrors.content
          }
        ) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        (actionData == null ? void 0 : actionData.formError) ? /* @__PURE__ */ jsx("p", { className: "form-validation-error", role: "alert", children: actionData.formError }) : null,
        /* @__PURE__ */ jsx("button", { type: "submit", className: "button", children: "Add" })
      ] })
    ] })
  ] });
}
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error) && error.status === 401) {
    return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
      /* @__PURE__ */ jsx("p", { children: "You must be logged in to create a joke." }),
      /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "error-container", children: "Something unexpected went wrong. Sorry about that." });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action: action$2,
  default: NewJokeRoute,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function IndexRoute() {
  return /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Remix ",
      /* @__PURE__ */ jsx("span", { children: "Jokes!" })
    ] }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "jokes", children: "Read Jokes" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { reloadDocument: true, to: "/jokes.rss", children: "RSS" }) })
    ] }) })
  ] }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IndexRoute
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({ request }) => logout(request);
const loader$1 = async () => redirect("/");
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const Header = ({ userData }) => {
  return /* @__PURE__ */ jsx("header", { className: "jokes-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h1", { className: "home-link", children: /* @__PURE__ */ jsxs(Link, { to: "/", title: "Remix Jokes", "aria-label": "Remix Jokes", children: [
      /* @__PURE__ */ jsx("span", { className: "logo", children: "🤪" }),
      /* @__PURE__ */ jsx("span", { className: "logo-medium", children: "J🤪KES" })
    ] }) }),
    userData ? /* @__PURE__ */ jsxs("div", { className: "user-info", children: [
      /* @__PURE__ */ jsx("span", { children: `Hi ${userData.username}` }),
      /* @__PURE__ */ jsx(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "button", children: "Logout" }) })
    ] }) : /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "jokes-footer", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(Link, { reloadDocument: true, to: "/jokes.rss", children: "RSS" }) }) });
};
const JokesList = ({ jokes, active, changeJoke }) => /* @__PURE__ */ jsx("ul", { className: "jokes-list", children: jokes.length > 0 ? jokes.map(({ id, name }) => {
  const className = active === id ? "active-joke" : "";
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className, prefetch: "intent", to: id, onClick: () => {
    changeJoke(id);
  }, children: name }) }, id);
}) : /* @__PURE__ */ jsx("li", { children: "No jokes found" }) });
const LeftPanel = ({ data }) => {
  var _a, _b;
  const { user: userData, allUsersData, jokeListItems } = data;
  const [jokeList, setJokeList] = useState(jokeListItems);
  const [selectedJokeId, setSelectedJokeId] = useState((_a = jokeListItems[0]) == null ? void 0 : _a.id);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const filtersReducer = (state, action2) => {
    switch (action2.type) {
      case "KEYWORD_CHANGED":
        return {
          ...state,
          keyword: action2.value
        };
      case "USER_UPDATED":
        if (inputRef && inputRef.current)
          inputRef.current.value = "";
        return {
          ...state,
          user: action2.value,
          keyword: ""
        };
    }
  };
  const initialFilters = {
    user: userData.id,
    keyword: ""
  };
  const [selectedFilters, dispatchFilters] = useReducer(filtersReducer, initialFilters);
  const selectUser = (e) => {
    const { value: id = "" } = e.target;
    dispatchFilters({
      type: "USER_UPDATED",
      value: id
    });
  };
  const keywordHandler = () => {
    var _a2;
    dispatchFilters({
      type: "KEYWORD_CHANGED",
      value: (_a2 = inputRef.current) == null ? void 0 : _a2.value
    });
  };
  useEffect(() => {
    var _a2;
    const { user, keyword } = selectedFilters;
    let updatedList = [];
    if (user !== "all") {
      updatedList = allUsersData[user].jokes;
    } else {
      Object.values(allUsersData).forEach((userInfo) => {
        updatedList.push(...userInfo.jokes);
      });
    }
    if (keyword !== "") {
      updatedList = updatedList.filter((joke) => {
        if (joke.name.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    setJokeList(updatedList);
    const newJokeId = (_a2 = updatedList[0]) == null ? void 0 : _a2.id;
    setSelectedJokeId(newJokeId);
    newJokeId ? navigate(`${newJokeId}`) : navigate("/jokes");
  }, [selectedFilters, allUsersData]);
  const showRandomJoke = () => {
    if (jokeList.length < 2)
      return;
    const randomIdx = Math.round(Math.random() * (jokeList.length - 1));
    const pickedJokeId = jokeList[randomIdx].id;
    if (pickedJokeId === selectedJokeId)
      showRandomJoke();
    else {
      setSelectedJokeId(pickedJokeId);
      navigate(`${pickedJokeId}`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "left-panel", children: [
    /* @__PURE__ */ jsxs("label", { children: [
      "Select a user to see their jokes:",
      /* @__PURE__ */ jsxs("select", { className: "user-dropdown", name: "selectedUser", defaultValue: userData == null ? void 0 : userData.id, onChange: selectUser, children: [
        /* @__PURE__ */ jsx("option", { value: "all", children: "All" }, "all"),
        (_b = Object.keys(allUsersData)) == null ? void 0 : _b.map((user) => {
          const { id, username } = allUsersData[user];
          const text = id === userData.id ? `(You) ${username}` : username;
          return /* @__PURE__ */ jsx("option", { value: id, children: text }, id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx("input", { type: "text", ref: inputRef, placeholder: "Search a joke", onChange: keywordHandler }),
    /* @__PURE__ */ jsx("p", { children: "Click on a joke to read it:" }),
    /* @__PURE__ */ jsx(JokesList, { jokes: jokeList, active: selectedJokeId, changeJoke: (id) => {
      setSelectedJokeId(id);
    } }),
    /* @__PURE__ */ jsx("button", { className: "button", onClick: showRandomJoke, children: "See a random joke" }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "(OR)" }) }),
    /* @__PURE__ */ jsx(Link, { to: "new", className: "button", children: "Add your own" })
  ] });
};
const loader = async ({ request }) => {
  const activeUser = await getUser(request);
  const userList = activeUser ? await getAllUsers(request) : null;
  const allUsersData = activeUser ? userList.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {}) : null;
  const jokeListItems = activeUser ? allUsersData[activeUser.id].jokes : [];
  return json({ jokeListItems, user: activeUser, allUsersData });
};
function JokesRoute() {
  var _a;
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "jokes-layout", children: [
    /* @__PURE__ */ jsx(Header, { userData: data.user }),
    /* @__PURE__ */ jsx("main", { className: "jokes-main", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      ((_a = data.user) == null ? void 0 : _a.id) && /* @__PURE__ */ jsx(LeftPanel, { data }),
      /* @__PURE__ */ jsx("div", { className: "jokes-outlet", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JokesRoute,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  const description = "Login to submit your own jokes to Remix Jokes!";
  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix Jokes | Login" }
  ];
};
function validateUsername(username) {
  if (username.length < 3) {
    return "Usernames must be at least 3 characters long";
  }
}
function validatePassword(password) {
  if (password.length < 6) {
    return "Passwords must be at least 6 characters long";
  }
}
function validateUrl(url) {
  const urls = ["/jokes", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/jokes";
}
const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const password = form.get("password");
  const username = form.get("username");
  const redirectTo = validateUrl(
    form.get("redirectTo") || "/jokes"
  );
  if (typeof loginType !== "string" || typeof password !== "string" || typeof username !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly."
    });
  }
  const fields = { loginType, password, username };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username)
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    });
  }
  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Username/Password combination is incorrect"
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({ where: { username } });
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Something went wrong trying to create a new user."
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid"
      });
    }
  }
};
function Login() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "content", "data-light": "", children: [
      /* @__PURE__ */ jsx("h1", { children: "Login" }),
      /* @__PURE__ */ jsxs(Form, { method: "post", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "hidden",
            name: "redirectTo",
            value: searchParams.get("redirectTo") ?? void 0
          }
        ),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "sr-only", children: "Login or Register?" }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "loginType",
                value: "login",
                defaultChecked: !((_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.loginType) || ((_b = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _b.loginType) === "login"
              }
            ),
            " ",
            "Login"
          ] }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "loginType",
                value: "register",
                defaultChecked: ((_c = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _c.loginType) === "register"
              }
            ),
            " ",
            "Register"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "username-input", children: "Username" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "username-input",
              name: "username",
              defaultValue: (_d = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _d.username,
              "aria-invalid": Boolean((_e = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _e.username),
              "aria-errormessage": ((_f = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _f.username) ? "username-error" : void 0
            }
          ),
          ((_g = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _g.username) ? /* @__PURE__ */ jsx(
            "p",
            {
              className: "form-validation-error",
              role: "alert",
              id: "username-error",
              children: actionData.fieldErrors.username
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password-input", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password-input",
              name: "password",
              type: "password",
              defaultValue: (_h = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _h.password,
              "aria-invalid": Boolean((_i = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _i.password),
              "aria-errormessage": ((_j = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _j.password) ? "password-error" : void 0
            }
          ),
          ((_k = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _k.password) ? /* @__PURE__ */ jsx(
            "p",
            {
              className: "form-validation-error",
              role: "alert",
              id: "password-error",
              children: actionData.fieldErrors.password
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsx("div", { id: "form-error-message", children: (actionData == null ? void 0 : actionData.formError) ? /* @__PURE__ */ jsx("p", { className: "form-validation-error", role: "alert", children: actionData.formError }) : null }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "button", children: "Submit" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "links", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/jokes", children: "Jokes" }) })
    ] }) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Login,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B17AvQBn.js", "imports": ["/assets/components-flXA8FWO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-_AQBG_yJ.js", "imports": ["/assets/components-flXA8FWO.js"], "css": ["/assets/root-DxnNb-qd.css"] }, "routes/jokes.$jokeId": { "id": "routes/jokes.$jokeId", "parentId": "routes/jokes", "path": ":jokeId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/jokes._jokeId-C71__-Wt.js", "imports": ["/assets/components-flXA8FWO.js", "/assets/joke-Czsrqcbc.js"], "css": [] }, "routes/jokes._index": { "id": "routes/jokes._index", "parentId": "routes/jokes", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/jokes._index-D7ZmDmN1.js", "imports": ["/assets/components-flXA8FWO.js"], "css": [] }, "routes/jokes[.]rss": { "id": "routes/jokes[.]rss", "parentId": "root", "path": "jokes.rss", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/jokes_._rss-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/jokes.new": { "id": "routes/jokes.new", "parentId": "routes/jokes", "path": "new", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/jokes.new-DmahWG-i.js", "imports": ["/assets/components-flXA8FWO.js", "/assets/joke-Czsrqcbc.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-qUbyrDMQ.js", "imports": ["/assets/components-flXA8FWO.js"], "css": ["/assets/_index-BuIapWBs.css"] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/jokes": { "id": "routes/jokes", "parentId": "root", "path": "jokes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/jokes-Cr2WMR_1.js", "imports": ["/assets/components-flXA8FWO.js"], "css": ["/assets/jokes--IEubVyj.css"] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-KZPbw4zA.js", "imports": ["/assets/components-flXA8FWO.js"], "css": ["/assets/login-n3e76q-H.css"] } }, "url": "/assets/manifest-98ef7a14.js", "version": "98ef7a14" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/jokes.$jokeId": {
    id: "routes/jokes.$jokeId",
    parentId: "routes/jokes",
    path: ":jokeId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/jokes._index": {
    id: "routes/jokes._index",
    parentId: "routes/jokes",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/jokes[.]rss": {
    id: "routes/jokes[.]rss",
    parentId: "root",
    path: "jokes.rss",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/jokes.new": {
    id: "routes/jokes.new",
    parentId: "routes/jokes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/jokes": {
    id: "routes/jokes",
    parentId: "root",
    path: "jokes",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
