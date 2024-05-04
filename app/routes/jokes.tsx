import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { User, Joke } from "@prisma/client";
import { Outlet, useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/jokes.css";
import { getUser, getAllUsers } from "~/utils/session.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import LeftPanel from "~/components/LeftPanel";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
type JokeMain = Pick<Joke, "name" | "id" | "createdAt">;
type UserMain = Pick<User, "id" | "username">;
interface UserJokeType extends UserMain {
  jokes: JokeMain[]
}

export const loader = async ({ request }: LoaderArgs) => {
  const activeUser: UserMain | null = await getUser(request);

  const userList: UserJokeType[] | [] = activeUser ? await getAllUsers(request) : [];

  /* Mapping all users' data with their ids */
  const allUsersData: { [key: string]: User } = activeUser ? userList.reduce((acc, user: User) => {
    acc[user.id] = user;
    return acc;
  }, {}) : null;

  const jokeListItems: JokeMain[] = activeUser ? allUsersData[activeUser.id].jokes : [];

  return json({ jokeListItems, user: activeUser, allUsersData });
};


export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="jokes-layout">
      <Header userData={data.user} />
      <main className="jokes-main">
        <div className="container">
          {data.user?.id && <LeftPanel data={data} />}
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
