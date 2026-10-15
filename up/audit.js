const { chromium } = require('playwright'); const fs=require('fs');
const B='https://ghostshopi.lovable.app';
(async () => { const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1300,height:900}}); const p=await ctx.newPage();
 const out={pages:{},broken:[],external:{},console:[],requests3p:{}};
 p.on('console',m=>{if(m.type()==='error'||m.type()==='warning') out.console.push(p.url()+' | '+m.type()+' | '+m.text().slice(0,200));});
 p.on('pageerror',e=>out.console.push(p.url()+' | pageerror | '+String(e).slice(0,200)));
 p.on('request',r=>{try{const h=new URL(r.url()).host; if(!h.includes('ghostshopi.lovable.app')) out.requests3p[h]=(out.requests3p[h]||0)+1;}catch{}});
 const seen=new Set(); const queue=['/']; const prodSample=[];
 while(queue.length && seen.size<80){ const u=queue.shift(); if(seen.has(u)) continue; seen.add(u);
   let resp; try{ resp=await p.goto(B+u,{waitUntil:'networkidle',timeout:45000}); }catch(e){ out.broken.push(u+' ERR '+e.message.slice(0,80)); continue; }
   await p.waitForTimeout(500);
   const info=await p.evaluate(()=>{const m=n=>document.querySelector(`meta[name="${n}"]`)?.content||null;
     return {status:0,title:document.title,desc:m('description'),canonical:document.querySelector('link[rel=canonical]')?.href||null,robots:m('robots'),
       h1:[...document.querySelectorAll('h1')].map(h=>h.innerText.trim()).slice(0,3),
       imgNoAlt:[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length,
       imgBroken:[...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0&&i.src).map(i=>i.src).slice(0,5),
       btnNoName:[...document.querySelectorAll('button,a')].filter(e=>!(e.innerText.trim()||e.getAttribute('aria-label')||e.getAttribute('title')||e.querySelector('img[alt]'))).length,
       ogImage:document.querySelector('meta[property="og:image"]')?.content||null,
       ld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{const j=JSON.parse(s.textContent);return [].concat(j['@type']).join('+')}catch{return 'INVALID'}}),
       links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))],
       lang:document.documentElement.lang, cookies:document.cookie, ls:Object.keys(localStorage), ss:Object.keys(sessionStorage), text:document.body.innerText.slice(0,4000)}; });
   info.status=resp?resp.status():0; out.pages[u]=info;
   for(const l of info.links){ if(!l) continue;
     if(l.startsWith('http')&&!l.includes('ghostshopi.lovable.app')){ out.external[l]=(out.external[l]||[]).concat(u).slice(0,2); continue; }
     if(l.startsWith('/')&&!l.startsWith('//')){ const path=l.split('#')[0]; if(path.startsWith('/produit/')){ if(prodSample.length<15&&!prodSample.includes(path)) {prodSample.push(path); queue.push(path);} } else queue.push(path); } }
 }
 out.cookiesFinal=await ctx.cookies();
 for (const f of ['/robots.txt','/sitemap.xml','/produit/nexiste-pas-xyz','/page-inexistante']) { const r=await p.goto(B+f).catch(()=>null); out.pages[f]={status:r?r.status():0, text:(await p.evaluate(()=>document.body.innerText.slice(0,600)))}; }
 const r=await fetch(B+'/'); out.headers=Object.fromEntries(r.headers);
 fs.writeFileSync('up/audit.json',JSON.stringify(out,null,1)); await b.close(); })();
