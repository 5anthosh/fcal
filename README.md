![iamg](https://raw.githubusercontent.com/5anthosh/fcal/assets/logo.png)

[![Version](https://badgen.net/npm/v/fcal)](https://www.npmjs.com/package/fcal)
[![License: MIT](https://badgen.net/npm/license/fcal)](https://github.com/5anthosh/fcal/blob/master/LICENSE)
[![Hits](https://data.jsdelivr.com/v1/package/npm/fcal/badge)](https://www.jsdelivr.com/package/npm/fcal)
[![Downloads](https://badgen.net/npm/dt/fcal)](https://www.npmjs.com/package/fcal)

> Math expression evaluator

### 🏠 [Homepage](https://github.com/5anthosh/fcal/wiki)

You can perform basic arithmetic, percentage operations with precision.

## Features

- Units
- Variables
- Functions

> Playground [Codepen](https://codepen.io/5anthosh/pen/XWWdyMg) , [CLI](https://github.com/5anthosh/fcal-cli)

## Example

```js
const fcal = new Fcal();
// New variable
fcal.evaluate('radius : 23 m'); // 23 Meters

fcal.evaluate('PI * radius ^ 2'); // 1661.9025137490006231 Meters

fcal.evaluate('PI2 * radius'); // 144.51326206514 Meters

// Predefined functions
fcal.evaluate('log(23)'); // 1.3617278360175928789

// Percentage
fcal.evaluate('23 % of 1023'); // 235.29

fcal.evaluate('200 sec + 120 %'); // 440 Seconds

// Unit convertion
fcal.evaluate('20 min + 34 day in sec'); // 2938800 Seconds

fcal.evaluate('sin(PI)'); // -1.6167204971158028306e-24

// Constants
fcal.evaluate('E'); // 2.718281828459045235360287

// Predefined units
fcal.evaluate('speed = 20 kph'); // 20 km/h

fcal.evaluate('speed in mps'); // 5.5555555555555555556 m/s

fcal.evaluate('23 C add 123 F'); // 196.40000000000004 °F

fcal.evaluate('1.2 nsec + 3 week in sec'); // 1814400.0000000012 Seconds

// Various number system
fcal.evaluate('0b1010011 day + 45'); // 128 Days
```

## Install

### Browser

the library is the single JavaScript file fcal.js (or minified, fcal.min.js).

```html
<script src="https://cdn.jsdelivr.net/npm/fcal/dist/fcal.js"></script>
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

console.log(value); // 11750400 Seconds
```

### Percentage

```js
var value = fcal.evaluate('27% of 230 cm');
console.log(value); // 62.1 Centimeters
```

You can perform general percentage operation with `+` , `-`

```js
var value = fcal.evaluate('1024 m + 6.1%');
console.log(value); // 1086.464 Meters
```

### Using expression

You can change state of expression , re evaluate it

```js
const { Fcal } = require('fcal');

const exp = new Fcal().expression('PI * radius cm ^ 2');

exp.setValues({ radius: 8 });

console.log(exp.evaluate()); // 201.06192982974676726 Centimeters

exp.setValues({ radius: 10 });

console.log(exp.evaluate()); // 314.15926535897932385 Centimeters

exp.setValues({ radius: Infinity });

console.log(exp.evaluate()); // Infinity Centimeters
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
$ npm test
```

## Author

👤 **Santhosh Kumar**

- Github: [@5anthosh](https://github.com/5anthosh)

## 📝 License

Copyright © 2019 [Santhosh Kumar](https://github.com/5anthosh).<br />
This project is [MIT](https://github.com/5anthosh/fcal/blob/master/LICENSE) licensed.
