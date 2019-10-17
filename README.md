# Welcome to fcal 👋

[![version](https://img.shields.io/badge/version-0.2.0-blue.svg?cacheSeconds=2592000)](https://github.com/5anthosh/fcal#readme)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/5anthosh/fcal/wiki)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/5anthosh/fcal/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/5anthosh/fcal/graphs/commit-activity)
[![fcal](https://data.jsdelivr.com/v1/package/npm/fcal/badge)](https://www.jsdelivr.com/package/npm/fcal)

> Formula evaluation engine

<div align="center">
  <img src="../assets/example.svg" />
</div>

### 🏠 [Homepage](https://github.com/5anthosh/fcal/wiki)

You can perform basic arithmetic, percentage operations with precision.

## Features

- Units
- Variables
- Functions

> Playground [Codepen](https://codepen.io/5anthosh/pen/XWWdyMg) , [CLI](https://github.com/5anthosh/fcal-cli) 

## Install

### Browser

the library is the single JavaScript file fcal.js (or minified, fcal.min.js).

```html
<script src=https://cdn.jsdelivr.net/npm/fcal/dist/fcal.js"></script>
```

### With [NPM](https://www.npmjs.com/)

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

console.log(value.print()); // 11750400 Seconds
```

### Percentage

```js
var value = fcal.evaluate('27% of 230 cm');
console.log(value.print()); // 62.1 Centimeters
```

You can perform general percentage operation with `+` , `-`

```js
var value = fcal.evaluate('1024 m + 6.1%');
console.log(value.print()); // 1086.464 Meters
```

### Using expression

You can change state of expression , re evaluate it

```js
const { Fcal } = require('fcal');

const exp = new Fcal().expression('PI * radius cm ^ 2');

exp.setValues({ radius: 8 });

console.log(exp.evaluate().print()); // 201.06192982974676726 Centimeters

exp.setValues({ radius: 10 });

console.log(exp.evaluate().print()); // 314.15926535897932385 Centimeters
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/5anthosh/fcal/issues).

To contribute

```sh
$ git clone https://github.com/5anthosh/fcal
```

```sh
$ npm install
```

### Run tests

```sh
npm test
```

## Show your support

Give a ⭐️ if this project helped you!

## Author

👤 **Santhosh Kumar**

- Github: [@5anthosh](https://github.com/5anthosh)

## 📝 License

Copyright © 2019 [Santhosh Kumar](https://github.com/5anthosh).<br />
This project is [MIT](https://github.com/5anthosh/fcal/blob/master/LICENSE) licensed.
