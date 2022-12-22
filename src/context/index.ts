import { createContext } from "react";

export const UserContext:
    | {
          userInfo: {
              name: string;
              username: string;
              role: number;
              token: string;
          };
          setUserInfo: Function;
      }
    | any = createContext({});
