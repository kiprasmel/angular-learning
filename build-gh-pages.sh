#!/bin/sh
# build-gh-pages.sh

project_name="angular-learning"
git_repo_url="https://sarpik.github.io/angular-learning/"

! $(command -v ng >/dev/null 2>&1) && printf "Error! 'ng' not found. \nInstall it using 'npm i -g @angular/cli'\nExiting\n" && exit 1
! $(command -v npx >/dev/null 2>&1) && printf "Error! 'npx' not found. \nInstall it by installing NodeJS.\nExiting\n" && exit 1

# build & publish
ng build --prod --output-path dist/"$project_name" --base-href "$git_repo_url"

npx angular-cli-ghpages --dir=dist/"$project_name" "$@"
