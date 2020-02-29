#!/usr/bin/env sh

# abort on errors
set -e

# build
echo Building.
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'example.com' > CNAME

echo Deploying
git init
git remote add origin https://github.com/AndrewJamesTurner/github-user-search.git
git add -A
git commit -m 'deploy'

# deploy
git push -f origin master:gh-pages

cd -