import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = props => {
  const  [page, setPage] = useState('dashboard');

  return (
    <AppContext.Provider
      value={{page, setPage}}
    >
      {props.children}
    </AppContext.Provider>
  );
}