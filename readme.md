# hare-niemeyer

An implementation of the **[Hare-Niemeyer](https://en.wikipedia.org/wiki/Largest_remainder_method)** (also known as **Hamilton** or **largest remainder**) method. Parliament seat allocation algorithm used in multiple countries around the world.

*Attention: Since some countries use a modification of the algorithm instead of this vanilla version, you should check your country's electoral legislature. Furthermore, I don't take any responsibility for the accuracy of the calculated numbers, even though I'm pretty confident with my implementation.*

[![npm version](https://img.shields.io/npm/v/hare-niemeyer.svg)](https://www.npmjs.com/package/hare-niemeyer)
[![License](https://img.shields.io/github/license/juliuste/hare-niemeyer.svg?style=flat)](license)
[![Contact me](https://img.shields.io/badge/contact-email-turquoise)](mailto:mail@juliustens.eu)

## Installation

```shell
npm install hare-niemeyer
```

## Usage

**This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**

```js
import hareNiemeyer from 'hare-niemeyer'

const electionResults = { // number of votes per party
	socialists: 130755,
	conservatives: 102068,
	liberals: 34012,
	greens: 31090,
	crazypeople: 11111
}
const seats = 420 // number of seats to be distributed

const parliament = hareNiemeyer(electionResults, seats, draw=true)
```

The `parliament` variable will look like this:

```json
{
	"socialists": 178,
	"conservatives": 139,
	"liberals": 46,
	"greens": 42,
	"crazypeople": 15
}
```

The `draw` option changes the behaviour of the algorithm in case of equal quota remainders for multiple parties. Usually, in this case the elections administrator would draw by lot which party gets the remaining seat. The script does this for you if the `draw` option is `true` or not set at all (default behaviour). If you change the option to `false`, the script will return the raw quotas for the involved parties instead:

```js
const electionResults = { // number of votes per party
	socialists: 10,
	conservatives: 15,
	liberals: 1,
	greens: 4
}
const seats = 100 // number of seats to be distributed

const parliament = hareNiemeyer(electionResults, seats, false)
```

In this case, the `parliament` variable looks like this:

```json
{
	"socialists": 33.333333333333,
	"conservatives": 50,
	"liberals": 3.333333333333,
	"greens": 13.333333333333
}
```

## Similar Projects

- [sainte-lague](https://github.com/juliuste/sainte-lague) - Sainte-Laguë / Webster / Schepers method
- [DHondt](https://github.com/economia/DHondt) – D'Hondt method

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/hare-niemeyer/issues).
