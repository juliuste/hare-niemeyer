import roundTo from 'lodash/round.js'
import shuffle from 'lodash/shuffle.js'

const round = n => roundTo(n, 12)

const sum = (votes) => {
	let res = 0
	for (const key in votes) res += votes[key]
	return res
}

const calculateShares = (votes, seats) => {
	const allVotes = sum(votes)
	const shares = {}
	for (const party in votes) {
		shares[party] = round((votes[party] * seats) / allVotes)
	}
	return shares
}

const collectRemainders = (shares) => {
	const remainders = []
	for (const party in shares) {
		remainders.push(round(shares[party] - Math.floor(shares[party])))
	}
	remainders.sort()
	remainders.reverse()
	return remainders
}

const partiesByRemainder = (remainder, shares) => {
	const parties = []
	for (const party in shares) {
		if (round(shares[party] - Math.floor(shares[party])) === remainder) parties.push(party)
	}
	return parties
}

const roundShares = (shares, seats) => {
	// calculate minimum seats per party
	const parliament = {}
	for (const party in shares) {
		parliament[party] = Math.floor(shares[party])
	}

	// distribute remaining seats
	const remainingSeats = seats - sum(parliament)
	if (remainingSeats > 0) {
		const remainders = collectRemainders(shares)

		let parties
		const doneRemainders = []
		for (const remainder of remainders) {
			parties = partiesByRemainder(remainder, shares)
			if (remainder > remainders[remainingSeats] && doneRemainders.indexOf(remainder) < 0) {
				for (const party of parties) {
					parliament[party] += 1
				}
			}
			if (remainder === remainders[remainingSeats - 1] && remainder === remainders[remainingSeats] && doneRemainders.indexOf(remainder) < 0) {
				for (const party of parties) {
					parliament[party] = shares[party]
				}
			}
			doneRemainders.push(remainder)
		}
	}
	return parliament
}

export default (votes, seats, draw = true) => {
	const shares = calculateShares(votes, seats)
	const parliament = roundShares(shares, seats)
	if (draw) {
		let parties = []
		for (const party in parliament) {
			if (parliament[party] - Math.floor(parliament[party]) !== 0) parties.push(party)
			parliament[party] = Math.floor(parliament[party])
		}
		parties = shuffle(parties)
		for (let i = 0; i < (seats - sum(parliament)); i++) {
			parliament[parties[i]] += 1
		}
	}
	return parliament
}
