'use strict'

const assert = require('assert')
const hn = require('./index')
const eql = require('deep-eql')

const isIn = (obj, array) => {
	for(let o of array){
		if(eql(o, obj)) return true
	}
	return false
}

// German Wikipedia example
const deWikiVotes = {
	a: 216,
	b: 310,
	c: 22,
	d: 32
}
const deWikiSeats = 100
const deWiki = {
	a: 37,
	b: 53,
	c: 4,
	d: 6
}
assert.deepEqual(hn(deWikiVotes, deWikiSeats), deWiki, 'Testing: German Wikipedia example')

// English Wikipedia example
const enWikiVotes = {
	yellows: 47000,
	whites: 16000,
	reds: 15800,
	greens: 12000,
	blues: 6100,
	pinks: 3100
}
const enWikiSeats = 10
const enWiki = {
	yellows: 5,
	whites: 2,
	reds: 1,
	greens: 1,
	blues: 1,
	pinks: 0
}
assert.deepEqual(hn(enWikiVotes, enWikiSeats), enWiki, 'Testing: English Wikipedia example')

// draw testing
const drawVotes = {
	a: 700,
	b: 1600,
	c: 100,
	d: 250,
	e: 350
}
const drawSeats = 100
const noDraw = {
	a: 23.333333333333,
	b: 53.333333333333,
	c: 3.333333333333,
	d: 8.333333333333,
	e: 12
}
const draws = [
	{
		a: 24,
		b: 53,
		c: 3,
		d: 8,
		e: 12
	},
	{
		a: 23,
		b: 54,
		c: 3,
		d: 8,
		e: 12
	},
	{
		a: 23,
		b: 53,
		c: 4,
		d: 8,
		e: 12
	},
	{
		a: 23,
		b: 53,
		c: 3,
		d: 9,
		e: 12
	}
]
assert.deepEqual(hn(drawVotes, drawSeats, false), noDraw, 'Testing: Not drawing')
assert(isIn(hn(drawVotes, drawSeats), draws), 'Testing: Drawing')

// Berlin election
const berlinVotes = {
	spd: 216,
	cdu: 176,
	linke: 156,
	gruene: 152,
	afd: 142,
	fdp: 67
}
const berlinSeats = 160
const berlin = {
	spd: 38,
	cdu: 31,
	linke: 27,
	gruene: 27,
	afd: 25,
	fdp: 12
}
assert.deepEqual(hn(berlinVotes, berlinSeats), berlin, 'Testing: Berlin election')
