// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import * as lint from '@commitlint/lint'
import { DangerDSLType } from '../node_modules/danger/distribution/dsl/DangerDSL';
declare var danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
// export declare function markdown(message: string): void



export interface CommitlintPluginConfig {
  severity?: 'fail' | 'warn' | 'message' | 'disable';
}

interface Rules {
  'body-leading-blank': Array<number | string>;
  'footer-leading-blank': Array<number | string>;
  'header-max-length': Array<number | string>;
  'scope-case': Array<number | string>;
  'subject-case': Array<string[] | number | string>;
  'subject-empty': Array<number | string>;
  'subject-full-stop': Array<number | string>;
  'type-case': Array<number | string>;
  'type-empty': Array<number | string>;
  'type-enum': Array<string[] | number | string>;
}

const defaultConfig = { severity: 'fail' };

export default async function check(rules: Rules,
  userConfig?: CommitlintPluginConfig) {
  
  const config = { ...defaultConfig, ...userConfig };
  
  // check MR squash flag and number of commits 
  const squashFlag = danger.gitlab.mr.squash 
  const commitsArrayLenght = danger.gitlab.commits.length 

  if (squashFlag === true && commitsArrayLenght > 1){
    // If MR sqash flag is true & multiple commits - title must be correct
     await lintCommitMessage(danger.gitlab.mr.title, rules, config.severity)

  } else if (squashFlag=== false && commitsArrayLenght > 1){
    // If MR sqash flag is false & multiple commits - at least one commit must be correct
   await  evalMessages(danger.gitlab.commits, rules, config.severity)
   // await  messageLint(danger.gitlab.commits, rules, config.severity)
  } else {
      await lintCommitMessage(danger.gitlab.commits[0].message, rules, config.severity)
  }

 
}

async function lintCommitMessage(commitMessage, rules, severity) {
  return lint.default(commitMessage, rules).then(report => {
    if (!report.valid) {
      let failureMessage = `There is a problem with the commit message\n> ${commitMessage}`;
      report.errors.forEach(error => {
        failureMessage = `${failureMessage}\n- ${error.message}`;
      });
      switch (severity) {
        case 'fail':
          fail(failureMessage);
          break;
        case 'warn':
          warn(failureMessage);
          break;
        case 'message':
          message(failureMessage);
          break;
        case 'disable':
          break;
      }
    }
  });
}

async function messageFailed(commitMessage, rules) {
  console.info('lint')
  console.info(lint)
  console.info('lint default')
  console.info(lint.default)
  console.info('lint type')
  console.info(typeof lint)
  console.info('lint.default type')
  console.info(typeof lint.default)
  return lint.default(commitMessage, rules).then(report => {
    if (!report.valid) {
      let failureMessage = `There is a problem with the commit message\n> ${commitMessage}`;
      report.errors.forEach(error => {
        failureMessage = `${failureMessage}\n- ${error.message}`;
      });
      return true
    } else {return false}
   })
}

function isTrue(currentValue){
  return currentValue === true 
}

async function evalMessages(commits, rules, severity){

  let tab : boolean [] = []
  for (let i = 0 ; i < commits.length; i++){
      const apromise = messageFailed(commits[i].message,rules);
      await apromise.then((res)=>{
          tab.push(res)
      })
  }
  if(tab.every(isTrue)){
      const failureMessage ='At least one commit message should be good. The commit messages have to be squashed for the checks to only be performed on the MR title'
      switch (severity) {
          case 'fail':
            fail(failureMessage);
            break;
          case 'warn':
            warn(failureMessage);
            break;
          case 'message':
            message(failureMessage);
            break;
          case 'disable':
            break;
        }
  } else {
    
  }
  
}


async function messageLint(messages,rules,severity){
  let tab : boolean [] = []
  for (let i = 0 ; i < messages.length ; i ++){
      const apromise = await lint.default(messages[i],rules).then((report)=>{
          tab.push(report.valid)
      })
      
  }
  if(tab.every(isTrue)){
      const failureMessage = 'At least one commit message must be good. The commit messages have to be squashed for the checks to only be performed on the MR title'
      switch (severity) {
          case 'fail':
            fail(failureMessage);
            break;
          case 'warn':
            warn(failureMessage);
            break;
          case 'message':
            message(failureMessage);
            break;
          case 'disable':
            break;
        }
  } else {
      console.log('Ya')
  }
}


