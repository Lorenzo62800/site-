const { chromium } = require('playwright'); const fs=require('fs');
(async () => { const b=await chromium.launch(); const p=await b.newPage(); const out={};
 for (const s of ['riz','fruits-secs']) { await p.goto('https://ghostshopi.lovable.app/boutique?categorie=alimentation&sous='+s+'&tri=marque',{waitUntil:'networkidle',timeout:60000});
   for(let i=0;i<30;i++){const m=await p.$('button:has-text("Voir plus"), button:has-text("Afficher plus"), button:has-text("Charger")'); if(m){await m.click().catch(()=>{});} await p.mouse.wheel(0,5000); await p.waitForTimeout(300);}
   out[s]=await p.$$eval('a[href^="/produit/"]', as=>[...new Set(as.map(a=>a.getAttribute('href')))]); }
 out.time=new Date().toISOString(); fs.writeFileSync('up/riz.json',JSON.stringify(out)); console.log('ok'); await b.close(); })();
