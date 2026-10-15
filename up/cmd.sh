npm i -s playwright@1.47.2 >/dev/null 2>&1 && npx playwright install --with-deps chromium >/dev/null 2>&1
node up/tk.js > up/tk.log 2>&1
curl -sIL 'https://www.tiktok.com/@ghostshopi0?_r=1&_t=ZN-9AYxPveUCZy' | grep -iE '^(HTTP|location)' > up/tk_curl.txt
curl -sIL 'https://snapchat.com/t/BrcFgVXa' | grep -iE '^(HTTP|location)' >> up/tk_curl.txt
# 9
