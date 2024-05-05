import type { JokeMain } from "../../common/types";

export type JokeListType = {
  jokes: JokeMain[],
  active: string | undefined,
  changeJoke: (id: string) => void
}