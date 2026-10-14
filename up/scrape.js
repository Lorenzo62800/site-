const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1400,height:1000}});
  await p.goto('https://ghostshopi.lovable.app/boutique', {waitUntil:'networkidle', timeout:90000});
  for (let i=0;i<200;i++){ 
    const more = await p.$('button:has-text("Voir plus"), button:has-text("Charger"), button:has-text("Afficher plus")');
    if (more) { await more.click().catch(()=>{}); await p.waitForTimeout(800); }
    await p.mouse.wheel(0, 4000); await p.waitForTimeout(400);
  }
  await p.screenshot({path:'up/shot.png'});
  require('fs').writeFileSync('up/rendered.html', await p.content());
  const items = await p.$$eval('a[href*="/produit"], a[href*="/products"], article', els => els.map(e=>({href:e.getAttribute('href'), text:e.innerText.slice(0,200), imgs:[...e.querySelectorAll('img')].map(i=>i.currentSrc||i.src)})));
  require('fs').writeFileSync('up/items.json', JSON.stringify(items));
  console.log(items.length);
  await b.close();
})();
