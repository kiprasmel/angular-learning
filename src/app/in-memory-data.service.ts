// basically a fake data server
import { Injectable } from "@angular/core";

import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "./hero";

@Injectable({
	providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
	constructor() {}

	createDb() {
		const heroes = [
			{ id: 11, name: "Mr. Nice" },
			{ id: 12, name: "Narco" },
			{ id: 13, name: "Bombasto" },
			{ id: 14, name: "Celeritas" },
			{ id: 15, name: "Magneta" },
			{ id: 16, name: "RubberMan" },
			{ id: 17, name: "Dynama" },
			{ id: 18, name: "Dr IQ" },
			{ id: 19, name: "Magma" },
			{ id: 20, name: "Tornado" },
		];

		// the fetching url is apparently "api/howYouNamedTheThing",
		// in our case - "api/heroes"
		// or, if you want to fetch a single resource:
		// "api/howYouNamedTheThing/:id",
		// for example, "api/heroes/11"
		//
		// literally unreadable
		return { heroes };
	}

	// If the heroes array is empty,
	// the method below returns the initial number (11).
	// if the heroes array is not empty, the method below returns the highest
	// hero id + 1.
	//
	// please read this before modifying:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	getBiggestId(heroes: Hero[]): number {
		// the first solution works fine if the array is not too big,
		// but will fail if it's too big.

		// return Math.max(...heroes.map((hero) => hero.id));

		// this second solution does not have such a problem.

		return heroes.length
			? heroes.map((hero) => hero.id).reduce((previous, current) => Math.max(previous, current))
			: 0;
	}

	// Overrides the genId method to ensure that a hero always has an id.
	genId(heroes: Hero[]): number {
		return this.getBiggestId(heroes) + 1;
	}
}
