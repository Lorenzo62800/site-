const { chromium } = require('playwright'); const fs=require('fs');
(async () => { const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1400,height:1400}});
 await p.goto('https://ghostshopi.lovable.app/boutique?categorie=alimentation&sous=riz',{waitUntil:'networkidle',timeout:60000});
 await p.evaluate(()=>window.scrollTo(0,600)); await p.waitForTimeout(3000); await p.evaluate(()=>window.scrollTo(0,1200)); await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>[...document.querySelectorAll('a[href^="/produit/"]')].map(a=>({h:a.getAttribute('href'),img:a.querySelector('img')?.currentSrc||a.querySelector('img')?.src,t:a.innerText})));
 fs.writeFileSync('up/riz2.json',JSON.stringify(r));
 const grid=await p.$('main'); await p.screenshot({path:'up/riz2.png',fullPage:true});
 await b.close(); })();
