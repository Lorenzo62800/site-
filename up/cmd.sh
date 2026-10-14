mkdir -p up/js && cd up/js
curl -sSL https://ghostshopi.lovable.app/boutique -o boutique.html
for js in $(grep -aoE '/assets/[A-Za-z0-9_.-]+\.js' boutique.html ../site/index.html | sed 's/.*:\/assets/\/assets/' | sort -u); do curl -sSL "https://ghostshopi.lovable.app$js" -o "$(basename $js)"; done
for f in *.js; do for js in $(grep -aoE '"\./[A-Za-z0-9_.-]+\.js"|/assets/[A-Za-z0-9_.-]+\.js' $f | tr -d '"' | sed 's#^\./#/assets/#' | sort -u); do b=$(basename $js); [ -f $b ] || curl -sSL "https://ghostshopi.lovable.app/assets/$b" -o $b; done; done
ls | wc -l
