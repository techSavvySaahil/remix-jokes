import React, { useEffect, useState, useReducer, useRef } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import JokesList from "~/components/JokesList";
import { ActionTypeList, type ActionObjType, type LeftPanelType } from "./types";
import type { FilterType } from "../../common/types";

const LeftPanel = ({ data }: LeftPanelType) => {
  const { jokeListItems: jokeList, allUsersData, user: userData, queryFilters } = data;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedJokeId, setSelectedJokeId] = useState("");

  useEffect(() => {
    // setting initial value for keyword input
    if (inputRef.current) inputRef.current.value = queryFilters.keyword;
  }, [])

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
      default:
        return state;
    }
  };

  const [selectedFilters, dispatchFilters] = useReducer(filtersReducer, queryFilters);

  const urlJokeId = useParams().jokeId;

  useEffect(() => {
    if (!urlJokeId) {
      let jokeId = "";
      const isJokePresent = jokeList.some(joke => joke.id === selectedJokeId);
      jokeId = isJokePresent ? selectedJokeId : jokeList[0]?.id;
      if (jokeId) {
        if (!isJokePresent) setSelectedJokeId(jokeId);
        navigateTo(jokeId);
      }
    } else setSelectedJokeId(urlJokeId);
  }, [allUsersData]);

  const navigateTo = (jokeId: string) => {
    const { user, keyword, sortKey } = queryFilters;
    const queryParams = `?user=${user}&keyword=${keyword}&sortKey=${sortKey}`;
    navigate(`${jokeId}${queryParams}`);
  }

  const selectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id = "" } = e.target;
    dispatchFilters({
      type: ActionTypeList.USER_UPDATED,
      value: id
    });
  }

  const sortJokes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: sortKey = "name" } = e.target;
    if (sortKey === "name" || sortKey === "createdAt") {
      dispatchFilters({
        type: ActionTypeList.SORT_UPDATED,
        value: sortKey
      });
    }
  }

  const keywordHandler = () => {
    // apply debouncing
    dispatchFilters({
      type: ActionTypeList.KEYWORD_CHANGED,
      value: inputRef.current?.value || ""
    })
  }

  const applyFilters = () => {
    const { user, keyword, sortKey } = selectedFilters;
    const queryParams = `user=${user}&keyword=${keyword}&sortKey=${sortKey}`;
    const url = `/jokes?${queryParams}`;
    navigate(url);
  }

  /* for showing random jokes from the displayed list */
  const showRandomJoke = () => {
    if (jokeList.length < 2) return;
    const randomIdx = Math.round(Math.random() * (jokeList.length - 1));
    const pickedJokeId = jokeList[randomIdx].id;
    /* Calling the fn again if the new joke id and current joke id are same */
    if (pickedJokeId === selectedJokeId) showRandomJoke();
    else {
      changeSelectedJoke(pickedJokeId);
      navigateTo(pickedJokeId);
    }
  }

  const changeSelectedJoke = (id: string) => {
    setSelectedJokeId(id);
  }

  return (
    <div className="left-panel">
      <label><b>Select</b> <span className="small-desc"><i>(a user to see their jokes)</i></span>:
        <select className="user-dropdown" name="selectedUser" defaultValue={selectedFilters.user} onChange={selectUser}>
          <option key="all" value="all">All</option>
          {Object.keys(allUsersData)?.map(user => {
            const { id, username } = allUsersData[user] || {};
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
        <select className="sort-dropdown" name="jokeSorter" defaultValue={selectedFilters.sortKey} onChange={sortJokes}>
          <option key="name" value="name">Name</option>
          <option key="date" value="createdAt">Date</option>
        </select>
      </label>
      <button className="button" onClick={applyFilters}>Apply</button>
      <p className="click-to-read">Click on a joke to read it:</p>
      <JokesList jokes={jokeList} active={selectedJokeId} queryFilters={queryFilters} changeSelectedJoke={changeSelectedJoke} />
      <button className="button" onClick={showRandomJoke}>See a random joke</button>
    </div>
  )
}

export default LeftPanel;