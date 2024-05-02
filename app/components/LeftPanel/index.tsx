import React, { useEffect, useState, useReducer, useRef } from "react";
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

enum ActionTypeList {
  KEYWORD_CHANGED = "KEYWORD_CHANGED",
  USER_UPDATED = "USER_UPDATED"
}

type FilterType = {
  user: string,
  keyword: string
}

type ActionObjType = {
  type: ActionTypeList,
  value: string
}

const LeftPanel = ({ data }: LeftPanelType) => {
  const { user: userData, allUsersData, jokeListItems } = data;
  const [jokeList, setJokeList] = useState<Joke[]>(jokeListItems);
  const [selectedJokeId, setSelectedJokeId] = useState<string>(jokeListItems[0]?.id);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLElement | null>(null);

  const filtersReducer = (state: FilterType, action: ActionObjType) => {
    switch (action.type) {
      /* updating the list of jokes after
      * after a search query is entered
      */
      case ActionTypeList.KEYWORD_CHANGED:
        return {
          ...state,
          keyword: action.value
        }
      /* updating the list of jokes after
      * after we select another user from the list
      */
      case ActionTypeList.USER_UPDATED:
        if (inputRef && inputRef.current) inputRef.current.value = "";
        return {
          ...state,
          user: action.value,
          keyword: ""
        }
    }
  };

  const initialFilters: FilterType = {
    user: userData.id,
    keyword: ""
  };
  const [selectedFilters, dispatchFilters] = useReducer(filtersReducer, initialFilters);

  const selectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id = "" } = e.target;
    dispatchFilters({
      type: ActionTypeList.USER_UPDATED,
      value: id
    });
  }

  const keywordHandler = () => {
    // apply debouncing
    dispatchFilters({
      type: ActionTypeList.USER_UPDATED,
      value: inputRef.current?.value
    })
  }

  useEffect(() => {
    const { user, keyword } = selectedFilters;
    let updatedList = [];
    if (user !== "all") {
      updatedList = allUsersData[user].jokes;
    } else {
      Object.values(allUsersData).forEach(userInfo => {
        updatedList.push(...userInfo.jokes);
      });
    }
    if (keyword !== "") {
      updatedList = updatedList.filter((joke: Joke) => {
        if (joke.name.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    setJokeList(updatedList);
    const newJokeId = updatedList[0]?.id;
    setSelectedJokeId(newJokeId);
    navigate(`${newJokeId}`);
  }, [selectedFilters]);

  /* for showing random jokes from the displayed list */
  const showRandomJoke = () => {
    const randomIdx = Math.round(Math.random() * (jokeList.length - 1));
    const pickedJokeId = jokeList[randomIdx].id;
    /* Calling the fn again if the new joke id and current joke id are same */
    if (pickedJokeId === selectedJokeId) showRandomJoke();
    else {
      setSelectedJokeId(pickedJokeId);
      navigate(`${pickedJokeId}`);
    }
  }

  return (
    <div className="jokes-list">
      <label>Select a user to see their jokes:
        <select className="user-dropdown" name="selectedUser" defaultValue={userData?.id} onChange={selectUser}>
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
      <p>Click on a joke to read it:</p>
      <input ref={inputRef} placeholder="Search a joke" onChange={keywordHandler} />
      <JokesList jokes={jokeList} />
      <button className="button" onClick={showRandomJoke}>See a random joke</button>
      <p><b>(OR)</b></p>
      <Link to="new" className="button">
        Add your own
      </Link>
    </div>
  )
}

export default LeftPanel;