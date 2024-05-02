import React from "react";
import { Link, useNavigate } from "@remix-run/react";
import type { User, Joke } from "@prisma/client";
import JokesList from "~/components/JokesList";

type LeftPanelType = {
  data: {
    user: User,
    jokeListItems: Joke[],
    allUsersData: {
      [key: string]: User
    }
  }
}

const LeftPanel = ({ data }: LeftPanelType) => {
  const { user: userData, allUsersData, jokeListItems } = data;
  const [jokeList, setJokeList] = React.useState(jokeListItems);

  const navigate = useNavigate();

  /* updating the list of jokes after
   * after we select another user from the list
  */
  const showJokes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id = "" } = e.target;
    let updatedList = [];
    if (id !== "all") {
      updatedList = allUsersData[id].jokes;
    } else {
      Object.values(allUsersData).forEach(userInfo => {
        updatedList.push(...userInfo.jokes);
      });
    }
    setJokeList(updatedList);
    navigate(`${updatedList[0].id}`);
  }

  /* for showing random jokes
   * choosing a random joke from the displayed list
  */
  const showRandomJoke = () => {
    const randomIdx = Math.floor(Math.random() * (jokeList.length - 1));
    navigate(`${jokeList[randomIdx].id}`);
  }

  return (
    <div className="jokes-list">
      <label>Select a user to see their jokes:
        <select name="selectedUser" defaultValue={userData?.id} onChange={showJokes}>
          <option key="all" value="all">All</option>
          {Object.keys(allUsersData)?.map(user => {
            const { id, username } = allUsersData[user];
            const text = id === userData.id ? `(You) ${username}` : username;
            return (
              <option key={id} value={id}>
                {text}
              </option>
            )
          })}
        </select>
      </label>
      <button onClick={showRandomJoke}>Get a random joke</button>
      <p>Click on a joke to read it:</p>
      <JokesList jokes={jokeList} />
      <Link to="new" className="button">
        Add your own
      </Link>
    </div>
  )
}

export default LeftPanel;