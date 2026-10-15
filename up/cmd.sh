npm i -s playwright@1.47.2 lighthouse@12.2.1 >/dev/null 2>&1 && npx playwright install --with-deps chromium >/dev/null 2>&1
export CHROME_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())")
for u in "/" "/boutique?categorie=alimentation" "/produit/epice-dor-anis-entier-1"; do n=$(echo "$u" | tr -c 'a-z0-9' '_'); for f in mobile desktop; do
  if [ $f = desktop ]; then P="--preset=desktop"; else P=""; fi
  npx lighthouse "https://ghostshopi.lovable.app$u" $P --quiet --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=up/lh.json >/dev/null 2>&1
  node -e "const j=require('./up/lh.json');const c=j.categories;console.log('$f $u',Object.keys(c).map(k=>k+':'+Math.round(c[k].score*100)).join(' '),'LCP',j.audits['largest-contentful-paint'].displayValue,'poids',j.audits['total-byte-weight'].displayValue,'| img-resp',j.audits['uses-responsive-images'].displayValue||'ok')" >> up/lh2.txt 2>&1
  rm -f up/lh.json
done; done
# 16
