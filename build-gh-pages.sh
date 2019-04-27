printf "\nCommit message (or blank): "
read commit_message
ng build --prod --output-path docs --base-href "https://sarpik.github.io/angular-learning/"
ngh --dir=docs --message "${commit_message:-'Updating build for gh-pages'}"
