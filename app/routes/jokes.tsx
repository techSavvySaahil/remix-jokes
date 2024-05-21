import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, Link, useLocation, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import stylesUrl from "~/styles/jokes.css";
import { getUser, getAllUsers } from "~/utils/session.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import LeftPanel from "~/components/LeftPanel";
import type { UserMain, JokeMain, UserJokeType, FilterType } from "../common/types";
import { sortKeyMapCheck } from "../common/utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const activeUser: UserMain | null = await getUser(request);


  if (!activeUser?.id) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userList: UserJokeType[] | [] = activeUser ? await getAllUsers(request) : [];

  /* Mapping all users' data with their ids */
  let allUsersData: { [x: string]: UserJokeType } = {};
  if (activeUser) {
    userList.forEach((user: UserJokeType) => {
      if (!allUsersData) allUsersData = { [user.id]: user };
      else allUsersData[user.id] = user;
    });

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('sortKey') || "createdAt";
    const sortKey = sortKeyMapCheck(key);
    const user = searchParams.get('user') || activeUser.id;
    const keyword = searchParams.get('keyword') || "";
    const queryFilters: FilterType = { sortKey, user, keyword };

    let updatedList: JokeMain[] = [];
    if (user !== "all") {
      updatedList = allUsersData[user]?.jokes || [];
    } else {
      Object.values(allUsersData).forEach(userInfo => {
        if (userInfo) updatedList.push(...userInfo.jokes);
      });
    }

    if (keyword !== "") {
      updatedList = updatedList.filter((joke: JokeMain) => {
        if (joke.name.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
        return false;
      });
    }

    updatedList = updatedList.sort((a: JokeMain, b: JokeMain) => {
      return a[sortKey] < b[sortKey] ? -1 : 1;
    });

    const jokeListItems: JokeMain[] = updatedList || [];

    return json({ jokeListItems, user: activeUser, allUsersData, queryFilters });
  }
  return null;
}

export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const isNewView = location.pathname === "/jokes/new";

  return (
    <div className="jokes-layout">
      <Header userData={data?.user} />
      <main className="jokes-main">
        <div className="container">
          {data?.user?.id && <LeftPanel data={data} />}
          <div className="content-container">
            {!isNewView && <Link to="new" className="button">
              Add your own
            </Link>}
            <div className="jokes-outlet">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <div className="error-container">
        <p>You must be logged in to view a joke.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
