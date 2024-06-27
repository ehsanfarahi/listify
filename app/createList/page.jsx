"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Context API
const CreateListContext = createContext();

// Components
import Button from "../_components/Button";

// Use Reducer
const initialState = {
  shoppingCenter: "",
  listItem: "",
  makeList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "shoppingCenter":
      return {
        ...state,
        shoppingCenter: action.payload,
      };
    case "listItem":
      return {
        ...state,
        listItem: action.payload,
      };
    case "addItem":
      return {
        ...state,
        makeList: action.payload.makeList,
        listItem: action.payload.listItem,
      };
    case "createAnotherList":
      return {
        ...state,
        makeList: action.payload.makeList,
        listItem: action.payload.listItem,
        shoppingCenter: action.payload.shoppingCenter,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function Page() {
  const [{ shoppingCenter, listItem, makeList }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="py-2 px-6">
      <h3 className="text-center font-semibold text-blue-400 text-lg">
        Create a new list
      </h3>

      <CreateListContext.Provider
        value={{
          dispatch,
          makeList,
          listItem,
          shoppingCenter,
        }}
      >
        <FormControl />
        <FormControlItem />
        <DisplayList />
      </CreateListContext.Provider>
    </div>
  );
}

function FormControl() {
  const { dispatch } = useContext(CreateListContext);

  return (
    <div className="mt-4 flex flex-col">
      <label className="font-semibold text-slate-700 mb-2">
        Shopping Center
      </label>
      <input
        onChange={(e) =>
          dispatch({ type: "shoppingCenter", payload: e.target.value })
        }
        type="text"
        placeholder="Add shop's name"
        className="border-2 p-2 border-green-100 rounded outline-green-200"
      />
    </div>
  );
}

function randomId() {
  const id = Math.floor(Math.random() * 100000);
  return id;
}

function date() {
  const date = new Date();
  const getDay = date.getDate();
  const getMonth = date.getMonth() + 1;
  const getYear = date.getFullYear();
  return `${getDay}.${getMonth}.${getYear}`;
}

const getLocal =
  typeof window !== "undefined" && localStorage.getItem("listify");
const getL =
  typeof window !== "undefined" && localStorage.getItem("listify")
    ? JSON.parse(getLocal)
    : "";

const shopList = [...getL];
let createList = {
  id: null,
  date: null,
  shoppingCenter: null,
  list: [],
};

function FormControlItem() {
  const { dispatch, makeList, listItem, shoppingCenter } =
    useContext(CreateListContext);

  function addItem() {
    if (listItem === "" || listItem.length < 3) return;

    dispatch({
      type: "addItem",
      payload: { makeList: [...makeList, listItem], listItem: "" },
    });

    createList = {
      id: createList?.id ? createList?.id : randomId(),
      date: createList?.date ? createList?.date : date(),
      shoppingCenter: createList?.shoppingCenter
        ? createList?.shoppingCenter
        : shoppingCenter,
      list: createList?.list ? [...createList?.list, listItem] : [listItem],
    };
  }

  function createAnotherList() {
    dispatch({
      type: "createAnotherList",
      payload: { makeList: [], listItem: "", shoppingCenter: "" },
    });

    shopList.push(createList);
    localStorage.setItem("listify", JSON.stringify(shopList));
    createList = {
      list: [],
    };
  }

  return (
    <div className="mt-4 flex flex-col">
      <label className="font-semibold text-slate-700 mb-2">Item</label>
      <div className="w-full flex">
        <input
          value={listItem}
          onChange={(e) =>
            dispatch({ type: "listItem", payload: e.target.value })
          }
          type="text"
          placeholder="Add shopping item"
          className="border-2 p-2 w-full border-green-100 rounded outline-green-200"
        />
        <Button
          onClick={addItem}
          customStyle="border-2 border-blue-200 ml-1 rounded p-2 font-semibold"
        >
          Add
        </Button>
      </div>
      <Button
        onClick={createAnotherList}
        customStyle="bg-blue-200 mt-4 rounded py-1 text-green-600 font-semibold"
      >
        Create list
      </Button>
    </div>
  );
}

function DisplayList() {
  const { shoppingCenter, makeList } = useContext(CreateListContext);

  return (
    <div className="mt-10 border-t-2 border-dashed border-blue-200">
      <div className="flex items-center pt-4">
        <h4 className="border-b-4 font-semibold border-blue-400 w-fit">
          {shoppingCenter}
        </h4>{" "}
        <span className="pl-2 text-sm">
          {makeList.length > 0 &&
            `(${makeList.length} item${makeList.length > 1 ? "s" : ""})`}
        </span>
      </div>
      {makeList?.map((item, i) => (
        <p key={i} className="mt-2">
          {" "}
          - {item}
        </p>
      ))}
    </div>
  );
}
