#!/bin/sh
# build-gh-pages.sh
# use `-m <message>` to provide a custom commit message

! $(command -v npx >/dev/null 2>&1) && printf "Error! 'npx' not found. \nPlease install it. Exiting\n" && exit 1

while getopts ":m:" option; do
	case "${option}" in
		m)
			commit_message="${OPTARG}"
	esac
done

# default case
[ -z "$commit_message" ] && commit_message="Updating build for gh-pages"

# build & publish
ng build --prod --output-path docs --base-href "https://sarpik.github.io/angular-learning/"

npx angular-cli-ghpages --dir=docs --message "$commit_message"
