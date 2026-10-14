const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const slugs=fs.readFileSync('up/slugs.txt','utf8').split('\n').filter(Boolean);
  const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1300,height:1000}});
  const out={}; let idx=0;
  async function worker(){ const p=await ctx.newPage(); while(idx<slugs.length){ const s=slugs[idx++];
    for(let a=0;a<3;a++){ try{ await p.goto('https://ghostshopi.lovable.app/produit/'+s,{waitUntil:'networkidle',timeout:45000});
      out[s]=await p.$$eval('main img', ims=>ims.map(i=>i.currentSrc||i.src)); break;}catch(e){ out[s]='ERR'; } } }
    await p.close(); }
  await Promise.all(Array.from({length:8},worker));
  fs.writeFileSync('up/pages.json',JSON.stringify(out)); console.log(Object.keys(out).length); await b.close();
})();
