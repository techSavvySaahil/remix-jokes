import type { User } from "@prisma/client";

export type JokeMain = {
  name: string,
  id: string,
  createdAt: Date | string
}

export type FilterType = {
  user: string,
  keyword: string,
  sortKey: "name" | "createdAt"
}

export type UserMain = Pick<User, "id" | "username">;

export interface UserJokeType extends UserMain {
  jokes: JokeMain[]
}