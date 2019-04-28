# requires `angular-cli-ghpages` (installed via npm)
# `npm i angular-cli-ghpages`
# https://github.com/angular-schule/angular-cli-ghpages

printf "Checking if 'angular-cli-ghpages' is installed...\n"

if [ "$1" = "-f" ]; then
	printf "'-f' specified. Ignoring dependency check\n"
else
	if [ ! "$(npm list --depth=0 angular-cli-ghpages)" ] && [ ! "$(npm list --depth=0 angular-cli-ghpages --global)" ]; then
		printf "Error!
		You do NOT have 'angular-cli-ghpages'.
		Install them by using:\n
		npm i angular-cli-ghpages --save-dev
		\nOR\n
		npm i angular-cli-ghpages --global\n\n" && exit 1
	else
		printf "found it!\n"
	fi
fi

printf "\nCommit message (or blank): "
read commit_message
ng build --prod --output-path docs --base-href "https://sarpik.github.io/angular-learning/"
ngh --dir=docs --message "${commit_message:-'Updating build for gh-pages'}"
