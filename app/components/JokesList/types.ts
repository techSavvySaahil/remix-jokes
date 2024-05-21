import type { FilterType, JokeMain } from "../../common/types";

export type JokeListType = {
  jokes: JokeMain[],
  active: string | undefined,
  changeSelectedJoke: (id: string) => void,
  queryFilters: FilterType
}