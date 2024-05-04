import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, Link, useLocation } from "@remix-run/react";
import stylesUrl from "~/styles/jokes.css";
import { getUser, getAllUsers } from "~/utils/session.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import LeftPanel from "~/components/LeftPanel";
import type { UserMain, JokeMain, UserJokeType } from "../common/types";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderArgs) => {
  const activeUser: UserMain | null = await getUser(request);

  const userList: UserJokeType[] | [] = activeUser ? await getAllUsers(request) : [];

  /* Mapping all users' data with their ids */
  let allUsersData: { [x: string]: UserJokeType } | null = null;
  if (activeUser) {
    userList.forEach((user: UserJokeType) => {
      if (!allUsersData) allUsersData = { [user.id]: user };
      else allUsersData[user.id] = user;
    });

    const jokeListItems: JokeMain[] = activeUser && allUsersData ? allUsersData[activeUser["id"]]["jokes"] : [];

    return json({ jokeListItems, user: activeUser, allUsersData });
  }
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
