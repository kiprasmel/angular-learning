# Angular Tutorial + more!

This is the [angular tutorial](https://angular.io/tutorial) I completed to learn the basics of angular.

Currently, it's got everything the original tutorial has, **plus**

* an improved search using native JavaScript features

	Instead of making a request every time the searching string is updated,
	it uses the already received `heroes` array, applies the `.filter` function and returns the matching heroes.

	This would be problematic if we had a huge array of heroes, because we'd need to fetch them ALL and that's no good.
	Also, filtering would take way longer than the server's filtering method.

	But in this case, the `heroes` array is small and we already have all of them fetched from the start,
	so why not use that instead? 😎

* a selection of *how many* top heroes to show

	It's really quite simple - by default, the top `4` heroes are displayed.
	But the user can change that to any value in range [`0`; `heroes.length`]

	The selection also gets saved to the `localStorage`,
	so that it's remembered even after a page refresh

* an [automatic build script](./build-gh-pages.sh) for [github pages](https://sarpik.github.io/angular-learning)

	nothing much to it - just a couple of commands
	crunched together to make the build process seamless

* other little bits & peaces

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
