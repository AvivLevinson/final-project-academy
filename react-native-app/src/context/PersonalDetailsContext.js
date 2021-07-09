import React, { useState, useEffect, useContext, useReducer } from 'react';

export const TYPES = {
  SET_INFO: 'SET_INFO',
  SET_LOCATION: 'SET_LOCATION',
  SET_IMAGE: 'SET_IMAGE',
  SET_LOGIN_DATA: 'SET_LOGIN_DATA',
};

const PersonalDetailsContext = React.createContext();

const detailsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOGIN_DATA: {
      return { ...state, id: action.payload.id, phone: action.payload.phoneNumber };
    }
    case TYPES.SET_INFO: {
      return { ...state, info: action.payload.info };
    }
    case TYPES.SET_LOCATION: {
      return { ...state, location: action.payload.location };
    }
    case TYPES.SET_IMAGE: {
      return { ...state, image: action.payload.image };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const PersonalDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(detailsReducer, {});

  return (
    <PersonalDetailsContext.Provider
      value={{
        dispatch,
        state,
      }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};

export const usePresonalDetails = () => useContext(PersonalDetailsContext);
