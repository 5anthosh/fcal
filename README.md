<h1 align="center">Welcome to fcal 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
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

### 🏠 [Homepage](https://github.com/5anthosh/fcal#readme)

📝 [TODO](https://github.com/5anthosh/fcal/blob/master/TODO.md)

## Basic Arithmetic operation

| Operation      | Operator | Phrases                     | Example                         |
| -------------- | -------- | --------------------------- | ------------------------------- |
| Addition       | +        | PLUS, AND, WITH, ADD        | `1 + 24`, `1 plus 3 plus 5`     |
| Subtraction    | -        | MINUS, SUBTRACT, WITHOUT    | `0.234 - 3.14`, `23 without 10` |
| Multiplication | \*       | TIMES, x, MULTIPLIEDBY, MUL | `1234 * 100`, `6665.01 MUL 001` |
| Division       | /        | DIVIDE, DIVIDEBY            | `(1+23)/(0.01)`                 |
| Power          | ^        | POW                         | `2 ^ 2 ^ 2 pow 23`              |
| Modulus        | mod      |                             | `134 mod 13`                    |
| Percentage     | of       |                             | `25% of 1024`, `10 of 234`      |

### Percentage operation

For general percentage operations like adding or subtracting percent of value, you can do
`12 + 24%`, `1230 - 23.23%`

## Variables

You can declare variables using `=` or `:` operator, you can also reassign them

> please note that you can not use variable name which is used in for phrases in operation and units

```sh
radius : 20
PI*radius^2
```

## Units

you can convert one unit into another. Fcal will automatically convert units to perform operations if it's needed during conversion.

```sh
23day in sec
100min + 34sec + 1day + 10% of 100 day
```

you can find supported units here [Units](https://github.com/5anthosh/fcal/blob/master/UNITS.md)

## Install

```sh
npm install
```

## Run Fcal

```sh
npm run main

fcal > (-2)^2.5
-5.6568542494923801952
```

## Run tests

```sh
npm run test
```

## Author

👤 **Santhosh Kumar**

- Github: [@5anthosh](https://github.com/5anthosh)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/5anthosh/fcal/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Santhosh Kumar](https://github.com/5anthosh).<br />
This project is [MIT](https://github.com/5anthosh/fcal/blob/master/LICENSE) licensed.
