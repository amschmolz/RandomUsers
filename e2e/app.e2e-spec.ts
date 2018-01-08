import { DisplayUsersPage } from './app.po';

describe('display-users App', () => {
  let page: DisplayUsersPage;

  beforeEach(() => {
    page = new DisplayUsersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
