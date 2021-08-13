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
    for (const commit of danger.gitlab.commits) {
      await lintCommitMessage(commit.message, rules, config.severity);
    }

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
