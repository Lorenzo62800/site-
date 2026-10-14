npm i -s playwright@1.47.2 >/dev/null 2>&1 && npx playwright install --with-deps chromium >/dev/null 2>&1
node up/scrape.js > up/scrape.log 2>&1
