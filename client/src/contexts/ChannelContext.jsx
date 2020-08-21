import React from 'react';

const ChannelStateContext = React.createContext();
const ChannelDispatchContext = React.createContext();

const initialState = {
  selectedChannel: null,
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHANNEL': {
      return selectChannel(state, action);
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};
