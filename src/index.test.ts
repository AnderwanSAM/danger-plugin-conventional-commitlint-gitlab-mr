
import { rules } from '@commitlint/config-conventional';
import check from './index';

declare const global: any;

describe('commitlint', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.message = undefined;
    global.fail = undefined;
    global.markdown = undefined;
    global.danger = undefined;
  });

  describe('single message', () => {
    describe('when the commit message is good', () => {
      beforeEach(() => {
        global.danger = {
           gitlab: { 
             commits: [{ message: 'chore: foo' }], 
             mr : {
               title: 'Draft: Resolve "Add argus to artifactory" ',
               squash: false
             }
             } 
          };
      });
      it('should do nothing', async () => {
        await check(rules);
        expect(global.fail).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the commit message is bad', () => {
      beforeEach(() => {
        global.danger = {
           gitlab: { 
             commits: [{ message: 'foo' }] ,
             mr : {
              title: 'foo',
              squash: false
            }
            }
       };
      });
      describe('with default config', () => {
        it('should generate a message and fail', async () => {
          await check(rules);
          expect(global.fail).toHaveBeenCalledTimes(1);
          expect(global.warn).toHaveBeenCalledTimes(0);
          expect(global.fail).toHaveBeenCalledWith(
            'There is a problem with the commit message\n> foo\n- subject may not be empty\n- type may not be empty'
          );
        });
      });
      describe('with warn configured', () => {
        it('should generate a message and fail', async () => {
          await check(rules, { severity: 'warn' });
          expect(global.fail).toHaveBeenCalledTimes(0);
          expect(global.warn).toHaveBeenCalledTimes(1);
          expect(global.warn).toHaveBeenCalledWith(
            'There is a problem with the commit message\n> foo\n- subject may not be empty\n- type may not be empty'
          );
        });
      });
    });
  });

  describe('multiple messages with squash false', () => {
    describe('when the commit message is good', () => {
      beforeEach(() => {
        global.danger = {
          gitlab: {
            commits: [{ message: 'chore: foo' }, { message: 'feat bar' }],
            mr : {
              title: 'chore: foo',
              squash: false
            }
          }
        };
      });
      it('should do nothing', async () => {
        await check(rules);
        expect(global.fail).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the commit message is bad', () => {
      beforeEach(() => {
        global.danger = {
          gitlab: {
             commits: [{ message: 'foo' }, { message: 'bar' }] ,
             mr : {
              title: 'chore: foo',
              squash: false
            }
        }
        };
      });

      describe('with default config', () => {
        it('should generate a message and fail', async () => {
          await check(rules);
          expect(global.fail).toHaveBeenCalledTimes(1);
          // expect(global.fail).toHaveBeenCalledWith(
          //   //'At least one commit message should be good. The commit messages have to be squashed for the checks to only be performed on the MR title'
          //  'There is a problem with the commit message\n> foo\n- subject may not be empty\n- type may not be empty'
          // );
          expect(global.fail).toHaveBeenCalledWith(
           // s'There is a problem with the commit message\n> bar\n- subject may not be empty\n- type may not be empty'
           'At least one commit message should be good. The commit messages have to be squashed for the checks to only be performed on the MR title'
          );
        });
      });
    });
  });
  describe('multiple messages with squash true', () => {
    describe('when the title is  good', () => {
      beforeEach(() => {
        global.danger = {
          gitlab: {
            commits: [{ message: 'chore foo' }, { message: 'feat bar' }],
            mr : {
              title: 'chore: foo',
              squash: true 
            }
          }
        };
      });
      it('should do nothing', async () => {
        await check(rules);
        expect(global.fail).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the title  is bad', () => {
      beforeEach(() => {
        global.danger = {
          gitlab: {
             commits: [{ message: 'foo' }, { message: 'bar' }] ,
             mr : {
              title: 'foo',
              squash: true
            }
        }
        };
      });

      describe('with default config', () => {
        it('should generate a message and fail', async () => {
          await check(rules);
          expect(global.fail).toHaveBeenCalledTimes(1);
          expect(global.fail).toHaveBeenCalledWith(
            'There is a problem with the commit message\n> foo\n- subject may not be empty\n- type may not be empty'
          );
        });
      });
    });
  });

});