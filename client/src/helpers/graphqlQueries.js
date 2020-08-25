import { gql } from '@apollo/client';

const SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      userId
      username
      token
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    signUp(UserInput: $input) {
      username
    }
  }
`;

const CHANNEL_DETAILS = gql`
  query ChannelDetails($input: String!) {
    channelDetails(channelId: $input) {
      id
      name
      description
      messages {
        id
        user {
          username
        }
        content
        date
        likes
        dislikes
      }
    }
  }
`;

const CHANNELS = gql`
  query Channels {
    channels {
      id
      name
    }
  }
`;

const MESSAGE = gql`
  mutation Message($input: MessageInput!) {
    message(MessageInput: $input) {
      id
    }
  }
`;

export const queries = {
  SIGN_IN: SIGN_IN,
  SIGN_UP: SIGN_UP,
  CHANNEL_DETAILS: CHANNEL_DETAILS,
  CHANNELS: CHANNELS,
  MESSAGE: MESSAGE
};
