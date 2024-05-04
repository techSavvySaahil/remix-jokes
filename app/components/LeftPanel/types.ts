import type { User, Joke } from "@prisma/client";

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
    user: User,
    jokeListItems: Joke[],
    allUsersData: {
      [key: string]: User
    }
  }
}

