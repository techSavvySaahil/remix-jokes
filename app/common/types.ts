import type { User, Joke } from "@prisma/client";

export type JokeMain = Pick<Joke, "name" | "id" | "createdAt">;

export type UserMain = Pick<User, "id" | "username">;

export interface UserJokeType extends UserMain {
  jokes: JokeMain[]
}