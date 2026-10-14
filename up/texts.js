const { chromium } = require('playwright'); const fs=require('fs');
(async () => { const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1300,height:1000}}); const out={};
 const pages=['/','/boutique','/promotions','/faq','/livraison','/cgv','/qui-sommes-nous','/contact','/mentions-legales','/confidentialite','/favoris','/compte',
  '/boutique?categorie=alimentation','/boutique?categorie=petit-dejeuner','/boutique?categorie=snacks-confiseries','/boutique?categorie=boissons','/boutique?categorie=hygiene-beaute','/boutique?categorie=maison-entretien','/boutique?categorie=jouets-loisirs',
  '/produit/la-cochura-riz-jaune-1-kg','/panier'];
 for (const u of pages){ try{ await p.goto('https://ghostshopi.lovable.app'+u,{waitUntil:'networkidle',timeout:60000});
   out[u]=await p.evaluate(()=>{ document.querySelectorAll("a[href^=\"/produit/\"]").forEach(a=>a.remove()); return document.body.innerText; }); }catch(e){ out[u]="ERR "+e.message; } }
 fs.writeFileSync('up/texts.json',JSON.stringify(out)); console.log('ok'); await b.close(); })();
