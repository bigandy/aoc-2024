# Advent of Code 2024

Attempting #aoc2024 again this year. Using javascript and will see how long I can get this year!

## Instructions

To create a new day,

`cp -R _template/ day-8`

then in package.json, add a new script e.g. for the fourth day:

```
jq '.scripts.eight = "ts-node-dev --respawn --transpile-only day-8"' package.json > package.json.tmp && mv package.json.tmp package.json
```

or combine into one script:

```
cp -R _template/ day-8 && jq '.scripts.eight = "ts-node-dev --respawn --transpile-only day-8"' package.json > package.json.tmp && mv package.json.tmp package.json
```

then run with `npm run four`
