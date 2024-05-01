import { Link } from "@remix-run/react";
import type { Joke } from "@prisma/client";

type JokeListType = {
  jokes: Joke[]
}

const JokesList = ({ jokes }: JokeListType) => (
  <ul>
    {jokes.length > 0 ? (
      jokes.map(({ id, name }: { id: string, name: string }) => (
        <li key={id}>
          <Link prefetch="intent" to={id}>
            {name}
          </Link>
        </li>
      ))
    ) : (
      <li>No jokes found</li>
    )}
  </ul>
);

export default JokesList;