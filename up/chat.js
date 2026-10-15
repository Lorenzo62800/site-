const { chromium } = require('playwright'); const fs=require('fs');
const B='https://ghostshopi.lovable.app';
(async () => { const b=await chromium.launch(); const out={};
 for (const vp of [{width:1300,height:900},{width:390,height:844}]){
 const p=await b.newPage({viewport:vp}); const errs=[]; p.on('pageerror',e=>errs.push(String(e))); p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
 await p.goto(B+'/',{waitUntil:'networkidle',timeout:60000});
 const key=vp.width;
 out[key]={};
 out[key].social=await p.evaluate(()=>[...document.querySelectorAll('a[href*="instagram.com"],a[href*="tiktok.com"],a[href*="snapchat.com"]')].map(a=>a.href+'|'+a.target+'|'+a.getAttribute('aria-label')));
 out[key].sameAs=await p.evaluate(()=>[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent).filter(t=>t.includes('sameAs')).map(t=>t.slice(0,400)));
 await p.screenshot({path:`up/home_${key}.png`});
 const btn=p.locator('button[aria-label="Ouvrir l\'assistant GHOSTSHOPI"]'); await btn.click(); await p.waitForTimeout(1500);
 await p.screenshot({path:`up/chat_open_${key}.png`}); out[key].panel=await p.evaluate(()=>{const f=[...document.querySelectorAll('textarea,input')].filter(e=>e.offsetParent&&!/mail/i.test(e.type+e.placeholder)&&!/Rechercher/.test(e.placeholder)); return f.map(e=>e.outerHTML.slice(0,200));});
 const qs = key===1300 ? ["Je cherche des épices pour un tajine","Quels sont vos délais et frais de livraison ?","Vous avez du caviar de licorne ?","Qui a gagné la Coupe du monde 1998 ?","Quels sont vos réseaux sociaux ?"] : ["Je cherche du riz basmati"];
 out[key].answers=[];
 for (const q of qs){
   const inp=p.locator('textarea:visible, input:visible').filter({hasNot:p.locator('[type=email]')}).and(p.locator(':not([placeholder*="Rechercher"]):not([type=email]):not([placeholder*="mail"])')).last(); await inp.fill(q); await inp.press('Enter');
   await p.waitForTimeout(14000);
   const dlg=await p.evaluate(()=>{const ta=[...document.querySelectorAll('textarea,input')].find(e=>e.offsetParent&&!/mail|Rechercher/i.test(e.placeholder||'')); let d=ta; for(let i=0;i<8&&d&&d.parentElement;i++){d=d.parentElement; if(d.getBoundingClientRect().height>300) break;} d=d||document.body; return {t:d.innerText.slice(-1500), cards:d.querySelectorAll('a[href^="/produit/"]').length};});
   out[key].answers.push({q,...dlg});
 }
 await p.screenshot({path:`up/chat_${key}.png`});
 const add=p.locator('button:visible',{hasText:/^\s*Ajouter/i}).last();
 if (await add.count()){ await add.click(); await p.waitForTimeout(3000); out[key].added=true; out[key].cartText=await p.evaluate(()=>[...document.querySelectorAll('header a,header button')].map(e=>e.getAttribute('aria-label')+':'+e.innerText).join(' || ')); } else out[key].added=false;
 out[key].errs=errs; await p.close(); }
 fs.writeFileSync('up/chat.json',JSON.stringify(out,null,1)); await b.close(); })();
