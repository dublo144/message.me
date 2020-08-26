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

const USER_DATA = gql`
  query {
    userData {
      channels {
        id
        name
      }
      conversations {
        id
        name
      }
    }
  }
`;

const CHANNEL_DETAILS = gql`
  query ChannelDetails($input: String!) {
    channelDetails(channelId: $input) {
      id
      name
      description
      channelMessages {
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

const CONVERSATIONS = gql`
  query Conversations {
    conversations {
      id
      name
    }
  }
`;

const CONVERSATION_DETAILS = gql`
  query ConversationDetails($input: ID!) {
    conversationDetails(conversationId: $input) {
      id
      name
      description
      messages {
        id
        user {
          firstName
          lastName
          username
        }
        content
        date
      }
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
  SIGN_IN,
  SIGN_UP,
  USER_DATA,
  CHANNEL_DETAILS,
  CHANNELS,
  CONVERSATIONS,
  CONVERSATION_DETAILS,
  MESSAGE
};
