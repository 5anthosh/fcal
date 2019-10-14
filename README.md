<h1 align="center">Welcome to fcal 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/5anthosh/fcal#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/5anthosh/fcal/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/5anthosh/fcal/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> formula evaluation engine

### 🏠 [Homepage](https://github.com/5anthosh/fcal/wiki)

You can perform basic arithmetic, percentage operations with precision.

## Features

- Units
- Variables
- Functions

## Install

With npm

```sh
$ npm install --save fcal
```

```js
const { Fcal } = require('fcal');
```

## Use

```js
const { Fcal } = require('fcal');

const fcal = new Fcal();
var value = fcal.evaluate('102 day in min + abs(-34 day) in sec');

console.log(value.print()); // 11750400 second(s)
```

### Percentage

```js
var value = fcal.evaluate('27% of 230 cm');
console.log(value.print()); // 62.1 cm
```

You can perform general percentage operation with `+` , '-'

```js
var value = fcal.evaluate('1024 m + 6.1%');
console.log(value.print()); // 1086.464 m
```

### Using expression

You can change state of expression , reevaluate it

```js
const { Fcal } = require('fcal');

const exp = new Fcal().expression('PI*radius^2 ');

exp.setValues({ radius: 8 });

console.log(exp.evaluate().print()); // 201.06192982974676726

exp.setValues({ radius: 10 });

console.log(exp.evaluate().print()); // 314.15926535897932385
```

## 🤝 Contributing

📝 [TODO](https://github.com/5anthosh/fcal/blob/master/TODO.md)

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/5anthosh/fcal/issues).

To constribute

```sh
$ git clone https://github.com/5anthosh/fcal
```

```sh
$ npm install
```

### Run tests

```sh
npm run test
```

## Show your support

Give a ⭐️ if this project helped you!

## Author

👤 **Santhosh Kumar**

- Github: [@5anthosh](https://github.com/5anthosh)

## 📝 License

Copyright © 2019 [Santhosh Kumar](https://github.com/5anthosh).<br />
This project is [MIT](https://github.com/5anthosh/fcal/blob/master/LICENSE) licensed.
