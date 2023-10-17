const { createContext } = require("react");

export const UserDataContext = createContext({
  userData: {},
  setUserData: () => {},
});
