'use strict'

const shuffle = require('shuffle-array')
const roundTo = require('round-to')
const round = (n) => roundTo(n, 12)

const sum = (votes) => {
	let res = 0
	for(let key in votes) res+=votes[key]
	return res
}

const calculateShares = (votes, seats) => {
	const allVotes = sum(votes)
	const shares = {}
	for(let party in votes){
		shares[party] = round((votes[party]*seats)/allVotes)
	}
	return shares
}

const collectRemainders = (shares) => {
	const remainders = []
	for(let party in shares){
		remainders.push(round(shares[party]-Math.floor(shares[party])))
	}
	remainders.sort()
	remainders.reverse()
	return remainders
}

const partiesByRemainder = (remainder, shares) => {
	const parties = []
	for(let party in shares){
		if(round(shares[party]-Math.floor(shares[party]))==remainder) parties.push(party)
	}
	return parties
}

const roundShares = (shares, seats) => {
	// calculate minimum seats per party
	const parliament = {}
	for(let party in shares){
		parliament[party] = Math.floor(shares[party])
	}

	// distribute remaining seats
	const remainingSeats = seats - sum(parliament)
	if(remainingSeats>0){
		const remainders = collectRemainders(shares)

		let parties
		const doneRemainders = []
		for(let remainder of remainders){
			parties = partiesByRemainder(remainder, shares)
			if(remainder>remainders[remainingSeats] && doneRemainders.indexOf(remainder)<0){
				for(let party of parties){
					parliament[party]+=1
				}
			}
			if(remainder==remainders[remainingSeats-1]&&remainder==remainders[remainingSeats]&&doneRemainders.indexOf(remainder)<0){
				for(let party of parties){
					parliament[party] = shares[party]
				}
			}
			doneRemainders.push(remainder)
		}
	}
	return parliament
}

const distribute = (votes, seats, draw=true) => {
	const shares = calculateShares(votes, seats)
	const parliament = roundShares(shares, seats)
	if(draw){
		const parties = []
		for(let party in parliament){
			if(parliament[party]-Math.floor(parliament[party])!=0) parties.push(party)
			parliament[party]=Math.floor(parliament[party])
		}
		shuffle(parties)
		for(let i=0; i<(seats-sum(parliament)); i++){
			parliament[parties[i]]+=1
		}
	}
	return parliament
}

module.exports = distribute
