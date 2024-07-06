export const appName = "Listify";
export const appDescription = "List making app";
export const menuData = [
  {
    menuList: "Home",
    menuNavigation: "/",
  },
  {
    menuList: "Lists",
    menuNavigation: "/lists",
  },
  {
    menuList: "Create List",
    menuNavigation: "/createList",
  },
];

// Local Storage Data
export const getListify =
  typeof window !== "undefined" && localStorage.getItem("listify");
