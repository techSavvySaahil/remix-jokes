import type { UserMain, JokeMain, UserJokeType } from "../../common/types";

export enum ActionTypeList {
  KEYWORD_CHANGED = "KEYWORD_CHANGED",
  USER_UPDATED = "USER_UPDATED",
  SORT_UPDATED = "SORT_UPDATED"
}

export type FilterType = {
  user: string,
  keyword: string,
  sortKey: string
}

export  type ActionObjType = {
  type: ActionTypeList,
  value: string
}

export type LeftPanelType = {
  data: {
    user: UserMain,
    jokeListItems: JokeMain[],
    allUsersData: {
      [x: string]: UserJokeType | null
    }
  }
}

