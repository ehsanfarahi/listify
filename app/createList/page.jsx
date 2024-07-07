"use client";

import { createContext, useContext, useReducer } from "react";

import { useRouter } from "next/navigation";

// Context API
const CreateListContext = createContext();

// Functions
import { randomId, date } from "../_functions";

// Constants
import { getListify } from "../_constants";

// React Icons
import { FaCheckCircle } from "../_reactIcons";

// Components
import Button from "../_components/Button";

// Use Reducer
const initialState = {
  shoppingCenter: "",
  listItem: "",
  makeList: [],
  displayMessage: false,
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
        displayMessage: action.payload.displayMessage,
      };
    case "displayMessage":
      return {
        ...state,
        displayMessage: action.payload.displayMessage,
        shoppingCenter: action.payload.shoppingCenter,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function Page() {
  return (
    <div>
      <CreateListForm />
    </div>
  );
}

function CreateListForm() {
  const [{ shoppingCenter, listItem, makeList, displayMessage }, dispatch] =
    useReducer(reducer, initialState);

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
          displayMessage,
        }}
      >
        <FormControl>Shopping Center</FormControl>
        <FormControlItem>Item</FormControlItem>
        <DisplayList />
        {displayMessage && <ListCreateMessage />}
      </CreateListContext.Provider>
    </div>
  );
}

function FormControl({ children }) {
  const { dispatch, shoppingCenter } = useContext(CreateListContext);

  return (
    <div className="mt-4 flex flex-col">
      <label
        htmlFor="shoppingCenter"
        className="font-semibold text-slate-700 mb-2"
      >
        {children}
      </label>
      <input
        onChange={(e) =>
          dispatch({ type: "shoppingCenter", payload: e.target.value })
        }
        type="text"
        id="shoppingCenter"
        value={shoppingCenter}
        placeholder="Add shop's name"
        className="border-2 p-2 border-green-100 rounded outline-green-200"
      />
    </div>
  );
}

const getL =
  typeof window !== "undefined" && localStorage.getItem("listify")
    ? JSON.parse(getListify)
    : "";

const shopList = [...getL];

let createList = {
  id: null,
  date: null,
  shoppingCenter: null,
  list: [],
};

function FormControlItem({ children }) {
  const { dispatch, makeList, listItem, shoppingCenter } =
    useContext(CreateListContext);

  function addItem() {
    if (listItem === "" || listItem?.length < 3) return;

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
    if (makeList?.length < 1) return;

    dispatch({
      type: "createAnotherList",
      payload: {
        makeList: [],
        listItem: "",
        shoppingCenter: "",
        displayMessage: true,
      },
    });

    shopList.push(createList);
    localStorage.setItem("listify", JSON.stringify(shopList));
    createList = {
      list: [],
    };
  }

  return (
    <div className="mt-4 flex flex-col">
      <label htmlFor="listItem" className="font-semibold text-slate-700 mb-2">
        {children}
      </label>
      <div className="w-full flex">
        <input
          value={listItem}
          onChange={(e) =>
            dispatch({ type: "listItem", payload: e.target.value })
          }
          type="text"
          id="listItem"
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
        customStyle="bg-blue-300 mt-4 rounded py-2 text-green-600 font-semibold"
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
          {makeList?.length > 0 &&
            `(${makeList?.length} item${makeList?.length > 1 ? "s" : ""})`}
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

function ListCreateMessage() {
  const navigate = useRouter();

  const { dispatch } = useContext(CreateListContext);

  function createNewList() {
    dispatch({
      type: "displayMessage",
      payload: {
        displayMessage: false,
        shoppingCenter: "",
      },
    });
  }

  function goToHomePage() {
    dispatch({ type: "displayMessage", payload: false });

    navigate.push("/");
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-35" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[75%] rounded p-4 bg-white">
        <p className="font-semibold text-sm flex items-center">
          <FaCheckCircle className="text-green-500 text-lg mr-2" /> List created
          successfully!
        </p>
        <div className="flex flex-col gap-2 mt-6">
          <Button
            onClick={goToHomePage}
            customStyle="bg-orange-300 font-semibold rounded p-1 w-full"
          >
            Home page
          </Button>
          <Button
            onClick={createNewList}
            customStyle="bg-green-300 font-semibold rounded p-1 w-full"
          >
            Create new
          </Button>
        </div>
      </div>
    </div>
  );
}
