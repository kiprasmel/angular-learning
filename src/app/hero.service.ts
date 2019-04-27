import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { Observable, of, OperatorFunction } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class HeroService {
	constructor(private messageService: MessageService, private http: HttpClient) {}

	// comes from `InMemoryDataService.createDb`s return value
	private heroesDbAccessUrl = "api/heroes";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	private log(message: string): void {
		this.messageService.add(`HeroService: ${message}`);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	handleError<T>(operation = "operation", result?: T) {
		// provide a callback to the `catchError` rxjs operator

		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.log(error);

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

	handleErrorV2<T>(operation = "operation", result?: T): OperatorFunction<T, T> {
		// provide a callback to the `catchError` rxjs operator
		return catchError(
			(error: any): Observable<T> => {
				// TODO: send the error to remote logging infrastructure
				console.log(error);

				// TODO: better job of transforming error for user consumption
				this.log(`${operation} failed: ${error.message}`);

				return of(result as T);
			}
		);
	}

	getHero(id: number): Observable<Hero> {
		const url = this.heroesDbAccessUrl + "/" + id;
		return this.http.get<Hero>(url).pipe(
			tap((_) => this.log(`fetched hero ${id}`)),
			catchError(this.handleError<Hero>(`getHero (id = ${id})`))
			// this.handleErrorV2<Hero>(`getHero (id = ${id})`)
		);
	}

	getHeroes(): Observable<Hero[]> {
		// todo send after fetch
		// this.messageService.add("HeroService: fetched heroes");
		// return this.http.get<Hero[]>(this.heroesDbAccessUrl); // returns an Observable of ...

		return this.http.get<Hero[]>(this.heroesDbAccessUrl).pipe(
			tap((_) => this.log("fetched heroes")), // will tap into the observables & add the "fetched heroes" message
			catchError(this.handleError<Hero[]>("getHeroes", [])) // will handle errors with our custom function
		);
	}

	updateHero(hero: Hero): Observable<Hero> {
		return this.http.put(this.heroesDbAccessUrl, hero, this.httpOptions).pipe(
			tap((_) => this.log(`updated hero (id = ${hero.id})`)),
			catchError(this.handleError<any>(`updateHero (id = ${hero.id})`))
		);
	}

	createNewHero(name: string): Observable<Hero> {
		name = name.trim();
		if (!name) {
			return;
		}

		return this.http.post<Hero>(this.heroesDbAccessUrl, { name } as Hero, this.httpOptions).pipe(
			tap((newHero: Hero) => this.log(`created new Hero w/ id ${newHero.id}`)),
			catchError(this.handleError<Hero>("createNewHero"))
		);
	}

	deleteHero(id: number): Observable<Hero> {
		const url = this.heroesDbAccessUrl + "/" + id;

		return this.http.delete(url, this.httpOptions).pipe(
			tap((_) => this.log(`deleted hero ${id}`)),
			this.handleErrorV2<Hero>("deleteHero")
		);
	}
}
