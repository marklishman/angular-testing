import { RxjsErrors } from './rxjs-error';

describe('RxjsErrors', () => {

  let rxjsErrors;

  beforeEach(() => {
    rxjsErrors = new RxjsErrors();
  });

  it('should receive errors', () => {
    for (let i = 0; i < 10; i++) {
      rxjsErrors.withErrorCallback();
    }
  });

  it('should not receive errors', () => {
    for (let i = 0; i < 10; i++) {
      rxjsErrors.withoutErrorCallback();
    }
  });

});
