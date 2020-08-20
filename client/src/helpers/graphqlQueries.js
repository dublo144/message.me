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

export const queries = {
  SIGN_IN: SIGN_IN,
  SIGN_UP: SIGN_UP
};
