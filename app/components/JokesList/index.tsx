import { Link } from "@remix-run/react";
import type { Joke } from "@prisma/client";

type JokeListType = {
  jokes: Joke[],
  active: string,
  changeJoke: (id: string) => void
}

const JokesList = ({ jokes, active, changeJoke }: JokeListType) => (
  <ul className="jokes-list">
    {jokes.length > 0 ? (
      jokes.map(({ id, name }: { id: string, name: string }) => {
        const className = active === id ? "active-joke" : "";
        return (
          <li key={id}>
            <Link className={className} prefetch="intent" to={id} onClick={() => { changeJoke(id) }}>
              {name}
            </Link>
          </li>
        )
      })
    ) : (
      <li>No jokes found</li>
    )}
  </ul>
);

export default JokesList;