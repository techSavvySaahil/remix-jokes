import type { Joke } from "@prisma/client";

export type JokeListType = {
  jokes: Joke[],
  active: string | undefined,
  changeJoke: (id: string) => void
}