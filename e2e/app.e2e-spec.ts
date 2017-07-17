import { PROJECTNAMEPage } from './app.po';

describe('quickswitch-client App', () => {
  let page: PROJECTNAMEPage;

  beforeEach(() => {
    page = new PROJECTNAMEPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
