# danger-plugin-conventional-commitlint-gitlab-mr

[![Build Status](https://travis-ci.org/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr.svg?branch=master)](https://travis-ci.org/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr)
[![npm version](https://badge.fury.io/js/danger-plugin-conventional-commitlint-gitlab-mr.svg)](https://badge.fury.io/js/danger-plugin-conventional-commitlint-gitlab-mr)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> This plugin checks a MR properties &amp; It ensures that the MR title and the commmit messages follow the conventional commit lint rules..

Here are the conditions  :  

If MR sqash flag is true & multiple commits - title must be correct

If MR sqash flag is false & multiple commits - at least one commit must be correct

if single commit - first commit line must be correct

[Rules](https://github.com/conventional-changelog/commitlint)

## Usage

**This plugin has been created especially for GITLAB and is supposed to be integrated in a CI job. It will not work for GitHub**__

Install (with yarn or npm):

```sh
npm install --save-dev  danger-plugin-conventional-commitlint-gitlab-mr 
```

At a glance:

If you dangerfile is located in a module-like folder, it will look like this : 

```js
// dangerfile.js
import check from 'danger-plugin-conventional-commitlint-gitlab-mr'

import configConventional from '@commitlint/config-conventional';

(async function dangerReport() {

  const commitlintConfig = {
    severity: 'warn'
  };
  await check(configConventional.rules, commitlintConfig);
})();

```

If you get an isssue related to the import statement, try this:  

In your project root folder  :  

- Create a sub folder
- Create a dangerfile.js inside of it

```js
const commitlint = require('danger-plugin-conventional-commitlint-gitlab-mr')
const configConventional = require('@commitlint/config-conventional')

;(async function dangerReport() {
  const commitlintConfig = {
    severity: 'fail',
  }
  await commitlint.default(configConventional.rules, commitlintConfig)
})()

```

-- You will need to install a few dependencies for the plugin to work :  

```sh
 run npm init
```

- [commitlint/lint @8.3.5] (https://github.com/conventional-changelog/commitlint)

```sh
npm i commitlint/lint@8.3.5
```

- [@commitlint/config-conventional @13.1.0](https://npmjs.com/package/@commitlint/config-conventional)

```sh  
npm i commitlint/config-conventional@13.1.0
```

- install the [plugin](https://npmjs.com/package/danger-plugin-conventional-commitlint-gitlab-mr) :  

```sh
npm install --save-dev  danger-plugin-conventional-commitlint-gitlab-mr 
```



## Changelog

See the GitHub [release history](https://github.com/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
