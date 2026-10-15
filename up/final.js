const fs=require('fs'); const B='https://ghostshopi.lovable.app'; const out={};
(async()=>{
 for (const q of ["Bonjour","Quels sont vos délais de livraison ?","Je cherche du riz basmati","une idée recette avec de la semoule","Je cherche des épices pour un tajine","caviar de licorne","Qui a gagné la coupe du monde ?","vos réseaux ?","Comment suivre ma commande ?"]) {
   const r=await fetch(B+'/api/assistant',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:[{id:'1',role:'user',parts:[{type:'text',text:q}]}]})});
   const t=await r.text(); out[q]={status:r.status, deltas:[...t.matchAll(/"delta":"((?:[^"\\]|\\.)*)"/g)].map(m=>m[1]).join('').slice(0,400), titres:[...t.matchAll(/"titre":"([^"]*)"/g)].map(m=>m[1])};
 }
 for (const u of ['/mentions-legales','/cgv','/confidentialite','/produit/epice-dor-anis-entier-1']) { const t=await (await fetch(B+u)).text(); out[u]={cours:/cours de cr/i.test(t), ref:/R(é|&#x27;|e)f(é|e)rence/.test(t)&&/GHOST-0048/.test(t)}; }
 fs.writeFileSync('up/final.json',JSON.stringify(out,null,1));
})();
