import React from 'react';
import { useLazyQuery } from '@apollo/client';

const ChannelStateContext = React.createContext();
const ChannelDispatchContext = React.createContext();

const initialState = {
  channels: [],
  selectedChannel: null,
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    case 'GET_CHANNELS_SUCCESS': {
      return {
        ...state,
        channels: action.payload.channels
      };
    }
    case 'GET_CHANNELS_ERROR': {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case 'SELECT_CHANNEL_SUCCESS': {
      return {
        ...state,
        selectedChannel: action.payload.selectedChannel
      };
    }
    case 'SELECT_CHANNEL_ERROR': {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const ChannelProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <ChannelDispatchContext.Provider value={dispatch}>
      <ChannelStateContext.Provider value={state}>
        {children}
      </ChannelStateContext.Provider>
    </ChannelDispatchContext.Provider>
  );
};

const useChannelState = () => {
  const context = React.useContext(ChannelStateContext);
  if (context === undefined) {
    throw new Error('useChannelState must be used within a ChannelProvider');
  }
  return context;
};

const useChannelDispatch = () => {
  const context = React.useContext(ChannelDispatchContext);
  if (context === undefined) {
    throw new Error('useChannelDispatch must be used within a ChannelProvider');
  }
  return context;
};

export { ChannelProvider, useChannelState, useChannelDispatch };
