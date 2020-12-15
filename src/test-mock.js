export const ContextDataWithUserInformation = {
  currentUser: {
    accessToken: 'testToken',
    id: 'testId',
    name: 'testName',
    email: 'test@gmail.com',
  },
  setCurrentUser: jest.fn(),
};

export const ContextDataWithOutUserInformation = {
  currentUser: {},
  setCurrentUser: jest.fn(),
};
