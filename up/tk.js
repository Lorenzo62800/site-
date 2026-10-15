const { chromium } = require('playwright'); const fs=require('fs');
(async () => { const b=await chromium.launch(); const out={};
 for (const vp of [{width:1300,height:900},{width:390,height:844}]) { const p=await b.newPage({viewport:vp});
 for (const u of ['/','/contact','/qui-sommes-nous','/boutique']) { await p.goto('https://ghostshopi.lovable.app'+u+'?v='+Date.now(),{waitUntil:'networkidle'});
   out[vp.width+u]=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/tiktok|snap|insta/i.test(a.href+a.getAttribute('aria-label')+a.innerText)).map(a=>a.getAttribute('aria-label')+' => '+a.href)); }
 // click tiktok in footer and follow
 const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null), p.locator('a[aria-label*="TikTok"]').first().click()]);
 if(np){ await np.waitForLoadState('domcontentloaded').catch(()=>{}); await np.waitForTimeout(5000); out['click_'+vp.width]=np.url()+' | '+(await np.title().catch(()=>'')); await np.close(); }
 await p.close(); }
 const r=await (await fetch('https://www.tiktok.com/@ghostshopi0?_r=1&_t=ZN-9AYxPveUCZy',{redirect:'manual'})).status; out.direct=r;
 fs.writeFileSync('up/tk.json',JSON.stringify(out,null,1)); await b.close(); })();
