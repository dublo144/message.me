import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    signUp(UserInput: $input) {
      username
    }
  }
`;

export const queries = {
  SIGN_UP: SIGN_UP
};
