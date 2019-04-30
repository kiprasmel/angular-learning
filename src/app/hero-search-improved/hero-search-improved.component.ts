import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { Hero } from "../hero";

@Component({
	selector: "app-hero-search-improved",
	templateUrl: "./hero-search-improved.component.html",
	styleUrls: ["./hero-search-improved.component.scss"],
})
export class HeroSearchImprovedComponent implements OnInit, OnChanges {
	// tslint:disable-next-line: no-input-rename
	@Input("heroes") heroes: Hero[]; // prop from parent component
	// tslint:disable-next-line: no-input-rename
	@Input("showAllHeroesWhenEmpty") showAllHeroesWhenEmpty: boolean;
	// tslint:disable-next-line: no-inferrable-types
	showAllHeroesWhenEmptyKeyInLS: string = "showAllHeroesWhenEmpty";
	foundHeroes: Hero[];

	constructor() {}

	ngOnInit() {
		// if unset (first time), then set default to "false"
		const showAllHeroesWhenEmptyStr =
			localStorage.getItem(this.showAllHeroesWhenEmptyKeyInLS) || "false";
		this.showAllHeroesWhenEmpty = showAllHeroesWhenEmptyStr === "true";
	}

	//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
	ngOnChanges(changes: SimpleChanges): void {
		/**
		 * check if we received the `heroes` props and then update the search list
		 */
		if (changes.heroes.previousValue === undefined && changes.heroes.currentValue) {
			this.updateShowAll(this.showAllHeroesWhenEmpty, "");
		}
	}

	search(term: string) {
		term = term.trim();

		if (!term) {
			this.foundHeroes = this.showAllHeroesWhenEmpty ? this.heroes : [];
			return;
		}

		const termMatchingRegex = RegExp(term, "i");
		this.foundHeroes = this.heroes.filter((hero) => termMatchingRegex.test(hero.name));
	}

	updateShowAll(showAll: boolean, term: string): void {
		this.showAllHeroesWhenEmpty = showAll;
		localStorage.setItem(this.showAllHeroesWhenEmptyKeyInLS, showAll.toString());
		this.search(term);
	}
}
