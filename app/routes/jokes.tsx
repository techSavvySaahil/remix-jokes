import React from "react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import stylesUrl from "~/styles/jokes.css";
import { getUser, getAllUsers } from "~/utils/session.server";
import JokesList from "../components/JokesList";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderArgs) => {
  const activeUser = await getUser(request);

  const userList = await getAllUsers(request);

  /* Mapping all users' data with their ids */
  const allUsersData = userList.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const jokeListItems = allUsersData[activeUser.id].jokes;

  return json({ jokeListItems, user: activeUser, allUsersData });
};


export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();
  const [jokeList, setJokeList] = React.useState(data.jokeListItems);
  const navigate = useNavigate();

  /* updating the list of jokes after
   * after we select another user from the list
  */
  const showJokes = e => {
    const { value: id } = e.target;
    let updatedList = [];
    if (id !== "all") {
      updatedList = data.allUsersData[id].jokes;
    } else {
      Object.values(data.allUsersData).forEach(userInfo => {
        updatedList.push(...userInfo.jokes);
      });
    }
    setJokeList(updatedList);
    navigate(`${updatedList[0].id}`);
  }

  /* for showing random jokes
   * choosing a random joke from the displayed list
  */
  const showRandomJoke = () => {
    const randomIdx = Math.floor(Math.random() * (jokeList.length - 1));
    navigate(`${jokeList[randomIdx].id}`);
  }

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <label>Select a user to see their jokes:
              <select name="selectedUser" defaultValue={data.user.id} onChange={showJokes}>
                <option key="all" value="all">All</option>
                {Object.keys(data.allUsersData)?.map(user => {
                  const { id, username } = data.allUsersData[user];
                  const text = id === data.user.id ? `(You) ${username}` : username;
                  return (
                    <option key={id} value={id}>
                      {text}
                    </option>
                  )
                })}
              </select>
            </label>
            <button onClick={showRandomJoke}>Get a random joke</button>
            <p>Click on a joke to read it:</p>
            <JokesList jokes={jokeList} />
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="jokes-footer">
        <div className="container">
          <Link reloadDocument to="/jokes.rss">
            RSS
          </Link>
        </div>
      </footer>
    </div>
  );
}
