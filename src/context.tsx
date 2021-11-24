import React, { useState } from "react";

export type User = {
  sessionId: string;
  username: string;
}

type LoginContent = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
export const LoginContext = React.createContext<LoginContent>({} as LoginContent);

const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<User>();
  return (
    <LoginContext.Provider value={{ user: state!!, setUser: setState }}>{children}</LoginContext.Provider>
  );
};

export default UserProvider;
