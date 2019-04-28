ng build --prod --output-path docs --base-href "https://sarpik.github.io/angular-learning/"
printf "\nCommit message (or blank): "
read commit_message
npx angular-cli-ghpages --dir=docs --message "${commit_message:-"Updating build for gh-pages"}"
