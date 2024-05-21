import type { UserMain, JokeMain, UserJokeType, FilterType } from "../../common/types";

export enum ActionTypeList {
  KEYWORD_CHANGED = "KEYWORD_CHANGED",
  USER_UPDATED = "USER_UPDATED",
  SORT_UPDATED = "SORT_UPDATED"
}

export type KeyUserObjType = {
  type: ActionTypeList.KEYWORD_CHANGED | ActionTypeList.USER_UPDATED,
  value: string
}

export type SortActionObjType = {
  type: ActionTypeList.SORT_UPDATED,
  value: "name" | "createdAt"
}

export type ActionObjType = KeyUserObjType | SortActionObjType;

export type LeftPanelType = {
  data: {
    user: UserMain,
    jokeListItems: JokeMain[],
    allUsersData: {
      [x: string]: UserJokeType | null
    },
    queryFilters: FilterType
  }
}

