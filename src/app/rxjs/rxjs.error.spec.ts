import { RxjsErrors } from './rxjs-error';

/*

  testing-rxjs-errors

  Examples of testing errors with RxJS

 */

describe('RxjsErrors', () => {

  let rxjsErrors;

  beforeEach(() => {
    rxjsErrors = new RxjsErrors();
  });


  it('should ...', () => {
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
    rxjsErrors.main();
  });

  it('should ...', () => {
    rxjsErrors.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('ok'),
      () => fail('error not expected')
    );
  });

});
