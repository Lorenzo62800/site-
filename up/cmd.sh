mkdir -p up/site && cd up/site
curl -sSL https://ghostshopi.lovable.app/ -o index.html
for js in $(grep -oE '/assets/[^"]+\.js' index.html | sort -u); do curl -sSL "https://ghostshopi.lovable.app$js" -o "$(basename $js)"; done
ls -la
