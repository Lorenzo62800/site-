const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1300,height:1000}});
  const cats=['alimentation','petit-dejeuner','snacks-confiseries','boissons','hygiene-beaute','maison-entretien','jouets-loisirs','bazar-quotidien'];
  const out={};
  for (const c of cats){
    await p.goto('https://ghostshopi.lovable.app/boutique?categorie='+c,{waitUntil:'networkidle',timeout:60000});
    const sous=await p.$$eval('a[href*="sous="]', as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
    out[c]={sous:{}};
    for (const h of sous){
      if(!h.includes('categorie='+c)) continue;
      await p.goto('https://ghostshopi.lovable.app'+h,{waitUntil:'networkidle',timeout:60000});
      for(let i=0;i<40;i++){ await p.mouse.wheel(0,5000); await p.waitForTimeout(250);} 
      const label=await p.$eval('h1',e=>e.innerText).catch(()=>''); 
      const prods=await p.$$eval('a[href^="/produit/"]', as=>[...new Set(as.map(a=>a.getAttribute('href').replace('/produit/','')))]);
      out[c].sous[h]={label,prods};
    }
  }
  await p.goto('https://ghostshopi.lovable.app/produit/la-cochura-riz-jaune-1-kg',{waitUntil:'networkidle'});
  out.rizjaune=await p.$eval('main',e=>e.innerText.slice(0,600)).catch(()=>'');
  fs.writeFileSync('up/sous.json',JSON.stringify(out)); console.log('ok'); await b.close();
})();
