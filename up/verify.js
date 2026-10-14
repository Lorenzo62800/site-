const { chromium } = require('playwright'); const fs=require('fs');
const B='https://ghostshopi.lovable.app';
(async () => { const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1300,height:1000}}); const out={pages:{},checks:{},prod:{}};
 const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
 const pages=['/','/boutique','/faq','/livraison','/cgv','/qui-sommes-nous','/contact','/mentions-legales','/confidentialite','/promotions',
  '/boutique?categorie=alimentation','/boutique?categorie=petit-dejeuner','/boutique?categorie=snacks-confiseries','/boutique?categorie=boissons','/boutique?categorie=hygiene-beaute','/boutique?categorie=maison-entretien','/boutique?categorie=jouets-loisirs','/boutique?categorie=bazar-quotidien','/boutique?categorie=alimentation&sous=riz'];
 const prodLinks=new Set();
 for (const u of pages){ try{ await p.goto(B+u,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(800);
   const r=await p.evaluate(()=>{ const links=[...document.querySelectorAll('a[href^="/produit/"]')].map(a=>a.getAttribute('href'));
     const shine=document.querySelectorAll('.card-shine').length, reveal=document.querySelectorAll('[data-reveal]').length;
     const clone=document.body.cloneNode(true); clone.querySelectorAll('a[href^="/produit/"]').forEach(a=>a.remove());
     return {links:links.slice(0,3), n:links.length, shine, reveal, url:location.pathname+location.search, text:document.body.innerText}; });
   r.links.forEach(l=>prodLinks.add(l)); out.pages[u]={url:r.url,n:r.n,shine:r.shine,reveal:r.reveal,text:r.text};
 }catch(e){ out.pages[u]={err:e.message}; } }
 const extra=['/produit/la-cochura-riz-jaune-1-kg'];
 for (const l of [...extra,...[...prodLinks].slice(0,25)]){ try{ await p.goto(B+l,{waitUntil:'networkidle',timeout:60000});
   out.prod[l]=await p.evaluate(()=>({h3:[...document.querySelectorAll('main h3')].map(h=>h.innerText), li:document.querySelectorAll('main li').length, raw:/<h3>|<\/p>|<strong>/.test(document.body.innerText), text:document.querySelector('main')?.innerText||''}));
 }catch(e){ out.prod[l]={err:e.message}; } }
 out.errs=errs; fs.writeFileSync('up/verify.json',JSON.stringify(out)); await b.close(); })();
