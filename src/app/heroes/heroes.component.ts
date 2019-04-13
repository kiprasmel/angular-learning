import { Component, OnInit } from "@angular/core";
import { Hero } from "./../hero";
import { HEROES } from "../mock-heroes";
import { HeroService } from "../hero.service";

@Component({
	selector: "app-heroes",
	templateUrl: "./heroes.component.html",
	styleUrls: ["./heroes.component.scss"],
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];

	selectedHero: Hero;
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
	// {
	// 	id: 0,
	// 	name: "The CHAD RMD",
	// };

	constructor(private heroService: HeroService) {}

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
	}
}
