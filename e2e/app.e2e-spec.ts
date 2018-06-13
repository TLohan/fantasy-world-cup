import { GolazoPage } from './app.po';

describe('golazo App', function() {
  let page: GolazoPage;

  beforeEach(() => {
    page = new GolazoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
