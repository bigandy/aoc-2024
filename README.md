# Advent of Code 2024

To create a new day,

`cp -R _template/ day-4`

then in package.json, add a new script e.g. for the fourth day:

```
jq '.scripts.four = "node --watch day-4"' package.json > package.json.tmp && mv package.json.tmp package.json
```

or combine into one script:

```
cp -R _template/ day-4 && jq '.scripts.4 = "node --watch day-4"' package.json > package.json.tmp && mv package.json.tmp package.json
```

then run with `npm run 4`
