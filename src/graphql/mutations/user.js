import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput!) {
    user: registerUser(input: $input) {
      id,
      email,
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    user: loginUser(input: $input) {
      id,
      avatars {
        main,
        storagePath
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser($input: LogoutUserInput!) {
    user: logoutUser(input: $input) {
      id
    }
  }
`;

export const SUBSCRIBE_TO_NEWSLETTER = gql`
  mutation subscribeToNewsletter($email: String!) {
    subscribeToNewsletter(email: $email) {
      id
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changeUserPassword($input: ChangeUserPasswordInput!) {
    changeUserPassword(input: $input) {
      id
    }
  }
`;
