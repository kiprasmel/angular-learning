import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { isNumber, isString } from "util";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	originalHeroes: Hero[];
	shownHeroes: Hero[];
	@Input() howManyHeroes: number = this.getHowManyHeroes();

	getHowManyHeroes(): number {
		let howManyHeroesStr: string = localStorage.getItem("howManyHeroesStr");

		/** default case, if the localStorage method didn't get anything */
		if (howManyHeroesStr === null || !isString(howManyHeroesStr) || howManyHeroesStr === "") {
			howManyHeroesStr = "4"; // give default value & act the same as localStorage (return strings)
		}

		return Number(howManyHeroesStr);
	}

	constructor(private heroService: HeroService) {}

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes) => {
			this.originalHeroes = heroes;
			// this.originalHeroes = []; // testing
			this.updateHowManyHeroesAreShowed();
		});
	}

	updateHowManyHeroesAreShowed(): void {
		console.log("Update Heroes", this.howManyHeroes);

		if (isNumber(this.howManyHeroes)) {
			this.shownHeroes = this.originalHeroes.slice(0, this.howManyHeroes);
			localStorage.setItem("howManyHeroes", this.howManyHeroes.toString());
		}
	}
}
