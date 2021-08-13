# danger-plugin-conventional-commitlint-gitlab-mr

[![Build Status](https://travis-ci.org/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr.svg?branch=master)](https://travis-ci.org/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr)
[![npm version](https://badge.fury.io/js/danger-plugin-conventional-commitlint-gitlab-mr.svg)](https://badge.fury.io/js/danger-plugin-conventional-commitlint-gitlab-mr)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> This plugin checks MR &amp; commit titles following the conventional commit lint rules. 

If MR sqash flag is true & multiple commits - title must be correct

If MR sqash flag is false & multiple commits - at least one commit must be correct

if single commit - first commit line must be correct

## Usage

Install (with yarn or npm):

```sh
yarn add danger-plugin-conventional-commitlint-gitlab-mr --dev
```

At a glance:

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
## Changelog

See the GitHub [release history](https://github.com/AnderwanSAM/danger-plugin-conventional-commitlint-gitlab-mr/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
