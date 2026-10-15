const { chromium } = require('playwright'); const fs=require('fs');
const B='https://ghostshopi.lovable.app'; const out={};
(async () => { const b=await chromium.launch();
 for (const vp of [{width:1300,height:900},{width:390,height:844}]) { const ctx=await b.newContext({viewport:vp}); const p=await ctx.newPage(); const errs=[];
  p.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,200))); p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  await p.goto(B+'/?v='+Date.now(),{waitUntil:'networkidle'}); await p.waitForTimeout(2500);
  const k=vp.width; out[k]={};
  out[k].banner=await p.locator('[role=dialog][aria-labelledby="cookies-titre"]').isVisible().catch(()=>false);
  await p.screenshot({path:`up/post_home_${k}.png`});
  out[k].lsBefore=await p.evaluate(()=>Object.keys(localStorage)); out[k].cookies=(await ctx.cookies()).map(c=>c.name);
  await p.getByRole('button',{name:'Tout refuser',exact:true}).first().click().catch(e=>out[k].refuseErr=e.message.slice(0,100));
  out[k].consent=await p.evaluate(()=>localStorage.getItem('ghostshopi-consentement'));
  out[k].sas=await p.evaluate(()=>/SAS/.test(document.body.innerText));
  // chat works with CSP
  await p.locator('button[aria-label*="assistant" i], button:has-text("Une question")').first().click().catch(e=>out[k].chatErr=e.message.slice(0,100));
  await p.waitForTimeout(1500); const ta=p.locator('textarea').last(); await ta.fill('Quels sont vos délais de livraison ?'); await ta.press('Enter'); await p.waitForTimeout(15000);
  out[k].chat=await p.evaluate(()=>{let d=[...document.querySelectorAll('textarea')].pop(); while(d&&d.parentElement&&getComputedStyle(d).position!=='fixed') d=d.parentElement; return (d||document.body).innerText.slice(-400);});
  await p.screenshot({path:`up/post_chat_${k}.png`});
  await p.goto(B+'/produit/epice-dor-anis-entier-1',{waitUntil:'networkidle'}); out[k].prodImg=await p.evaluate(()=>[...document.querySelectorAll('main img')].slice(0,2).map(i=>i.naturalWidth+'x'+i.naturalHeight+' '+i.currentSrc.slice(0,90)));
  out[k].prodText=await p.evaluate(()=>{const t=document.querySelector('main')?.innerText||'';const i=t.indexOf('Description du produit');return t.slice(i,i+1500)});
  await p.goto(B+'/mentions-legales',{waitUntil:'networkidle'}); out[k].mentions=await p.evaluate(()=>document.querySelector('main')?.innerText.slice(0,900));
  await p.goto(B+'/cookies',{waitUntil:'networkidle'}); out[k].cookiesPage=await p.evaluate(()=>document.querySelector('h1')?.innerText);
  await p.goto(B+'/boutique?categorie=alimentation&sous=riz',{waitUntil:'networkidle'}); out[k].rizTitle=await p.title(); out[k].rizCanon=await p.evaluate(()=>document.querySelector('link[rel=canonical]')?.href);
  out[k].errs=errs; await ctx.close(); }
 const r=await fetch(B+'/'); out.headers=Object.fromEntries([...r.headers].filter(([k])=>/security|frame|permissions|referrer|content-type-options/.test(k)));
 fs.writeFileSync('up/post.json',JSON.stringify(out,null,1)); await b.close(); })();
