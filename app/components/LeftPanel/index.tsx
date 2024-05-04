import React, { useEffect, useState, useReducer, useRef } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import type { Joke } from "@prisma/client";
import JokesList from "~/components/JokesList";
import { ActionTypeList, type FilterType, type ActionObjType, type LeftPanelType } from "./types";

const LeftPanel = ({ data }: LeftPanelType) => {
  const { user: userData, allUsersData, jokeListItems } = data;
  const [jokeList, setJokeList] = useState<Joke[]>(jokeListItems);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectedJokeId = useParams().jokeId;

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
        return {
          ...state,
          user: action.value
        }
      /* updating the list of jokes after
       * after a new "Sort by" is selected
      */
      case ActionTypeList.SORT_UPDATED:
        return {
          ...state,
          sortKey: action.value
        }
    }
  };

  const initialFilters: FilterType = {
    user: userData.id,
    keyword: "",
    sortKey: "name"
  };
  const [selectedFilters, dispatchFilters] = useReducer(filtersReducer, initialFilters);

  const selectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id = "" } = e.target;
    dispatchFilters({
      type: ActionTypeList.USER_UPDATED,
      value: id
    });
  }

  const sortJokes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: sortKey = "" } = e.target;
    dispatchFilters({
      type: ActionTypeList.SORT_UPDATED,
      value: sortKey
    });
  }

  const keywordHandler = () => {
    // apply debouncing
    dispatchFilters({
      type: ActionTypeList.KEYWORD_CHANGED,
      value: inputRef.current?.value
    })
  }

  useEffect(() => {
    const { user, keyword, sortKey } = selectedFilters;
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
    updatedList = updatedList.sort((a: Joke, b: Joke) => {
      return a[sortKey] < b[sortKey] ? -1 : 1;
    });

    setJokeList([...updatedList]);
  }, [selectedFilters, allUsersData]);

  /* for showing random jokes from the displayed list */
  const showRandomJoke = () => {
    if (jokeList.length < 2) return;
    const randomIdx = Math.round(Math.random() * (jokeList.length - 1));
    const pickedJokeId = jokeList[randomIdx].id;
    /* Calling the fn again if the new joke id and current joke id are same */
    if (pickedJokeId === selectedJokeId) showRandomJoke();
    else {
      navigate(`${pickedJokeId}`);
    }
  }

  return (
    <div className="left-panel">
      <label><b>Select</b> <span className="small-desc"><i>(a user to see their jokes)</i></span>:
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
      <label><b>Search</b> <span className="small-desc"><i>(a keyword)</i></span>:
        <input type="text" ref={inputRef} placeholder="Search a joke" onChange={keywordHandler} />
      </label>
      <label><b>Sort</b> <span className="small-desc"><i>(by name or date)</i></span>:
        <select className="sort-dropdown" name="jokeSorter" onChange={sortJokes}>
          <option key="name" value="name">Name</option>
          <option key="date" value="createdAt">Date</option>
        </select>
      </label>
      <p className="click-to-read">Click on a joke to read it:</p>
      <JokesList jokes={jokeList} active={selectedJokeId} changeJoke={(id) => { navigate(id) }} />
      <button className="button" onClick={showRandomJoke}>See a random joke</button>
    </div>
  )
}

export default LeftPanel;