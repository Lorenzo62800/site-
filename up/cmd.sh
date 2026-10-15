npm i -s playwright@1.47.2 lighthouse@12.2.1 >/dev/null 2>&1 && npx playwright install --with-deps chromium >/dev/null 2>&1
node up/post.js > up/post.log 2>&1
export CHROME_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())")
for u in "/" "/boutique?categorie=alimentation" "/produit/epice-dor-anis-entier-1"; do n=$(echo "$u" | tr -c 'a-z0-9' '_'); for f in mobile desktop; do
  if [ $f = desktop ]; then P="--preset=desktop"; else P=""; fi
  npx lighthouse "https://ghostshopi.lovable.app$u" $P --quiet --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=up/lh_${f}${n}.json >/dev/null 2>&1
  node -e "const j=require('./up/lh_${f}${n}.json');const c=j.categories;console.log('$f $u',Object.keys(c).map(k=>k+':'+Math.round(c[k].score*100)).join(' '),'LCP',j.audits['largest-contentful-paint'].displayValue,'CLS',j.audits['cumulative-layout-shift'].displayValue,'TBT',j.audits['total-blocking-time'].displayValue);const f=Object.values(j.audits).filter(a=>a.score!==null&&a.score<0.9&&a.scoreDisplayMode!=='informative'&&a.scoreDisplayMode!=='notApplicable').map(a=>'  - '+a.id+': '+(a.displayValue||'')).slice(0,25);console.log(f.join('\n'))" >> up/lh_summary.txt 2>&1
  rm -f up/lh_${f}${n}.json
done; done
# 11
