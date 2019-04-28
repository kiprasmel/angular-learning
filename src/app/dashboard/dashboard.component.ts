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
	@Input() howManyHeroes: number;
	private howManyHeroesKeyInLS = "howManyHeroesStr";

	constructor(private heroService: HeroService) {}

	ngOnInit() {
		this.howManyHeroes = this.getHowManyHeroes();
		this.getHeroes();
	}

	getHowManyHeroes() {
		let howManyHeroesStr: string = localStorage.getItem(this.howManyHeroesKeyInLS);

		/** default case, if the localStorage method didn't get anything */
		if (howManyHeroesStr === null || !isString(howManyHeroesStr) || howManyHeroesStr === "") {
			howManyHeroesStr = "4"; // give default value & act the same as localStorage (return strings)
		}

		return Number(howManyHeroesStr);
	}

	getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes) => {
			this.originalHeroes = heroes;
			this.updateHowManyHeroesAreShowed();
		});
	}

	updateHowManyHeroesAreShowed(): void {
		if (!isNumber(this.howManyHeroes)) {
			return;
		}

		this.shownHeroes = this.originalHeroes.slice(0, this.howManyHeroes);
		localStorage.setItem(this.howManyHeroesKeyInLS, this.howManyHeroes.toString());
	}
}
