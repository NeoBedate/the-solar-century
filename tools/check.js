#!/usr/bin/env node
/*
  Headless check of the game (and the GDD) with Playwright. Setup once: cd tools && npm i && npx playwright install chromium

  node tools/check.js                      smoke test: title, new game, every screen, map levels 1-7, Database and Editor
                                           tabs, 90 game days of ticks, menu dialog, GDD. Exit code 1 on any page error.
  node tools/check.js --shot base          also save a screenshot (tools/out/base.png). Several: --shot base,map3,title
                                           targets: title, newgame, editor, gdd, menu, map1..map7, and the screens
                                           base col ships tov db build tech yard port flight log
  --scale 0.5        screenshot scale (default 0.5, so 960x540; use 1 for full size, 0.25 for a thumbnail)
  --clip x,y,w,h     only this region, in 1920x1080 stage pixels
  --theme light|dark colour scheme (default dark)
  --days N           game days to run before the shots and --eval (default 0; the smoke test always runs 90 more)
  --url "?loc=mars"  query string added to index.html
  --eval "expr"      print a JavaScript expression evaluated in the game after setup (for example "S.res.iron")
  --quick            skip the smoke test (only setup, --days, --shot and --eval)

  Network is blocked except Google Fonts (Jura must load, or measurements are off).
*/
const path=require('path'),fs=require('fs');
let chromium;try{({chromium}=require('playwright'))}catch(e){console.error('Playwright missing: cd tools && npm i && npx playwright install chromium');process.exit(2)}
const root=path.resolve(__dirname,'..'),out=path.join(__dirname,'out');
const url=f=>'file:///'+path.join(root,f).replace(/\\/g,'/');
const A=process.argv.slice(2),opt=k=>{const i=A.indexOf('--'+k);return i<0?null:(A[i+1]&&!A[i+1].startsWith('--')?A[i+1]:true)};
const shots=(opt('shot')||'').toString().split(',').filter(Boolean),scale=+(opt('scale')||.5),theme=opt('theme')==='light'?'light':'dark',days=+(opt('days')||0),q=opt('url')||'',ev=opt('eval'),quick=!!opt('quick');
const clip=opt('clip')?opt('clip').split(',').map(Number):null;
const SCR=['base','col','ships','tov','db','build','tech','yard','port','flight','log'];
(async()=>{
 const b=await chromium.launch(),errs=[],log=[];
 const ctx=await b.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:scale,colorScheme:theme});
 await ctx.route('**/*',r=>{const u=r.request().url();(u.startsWith('file:')||/fonts\.(googleapis|gstatic)\.com/.test(u))?r.continue():r.abort()});
 const page=async(f,tag)=>{const p=await ctx.newPage();p.on('pageerror',e=>errs.push(tag+': '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|Failed to load resource/.test(m.text()))errs.push(tag+' console: '+m.text())});await p.goto(url(f)+(tag==='game'?q:''));await p.evaluate(()=>document.fonts.ready);return p};
 if(!fs.existsSync(out))fs.mkdirSync(out);
 const snap=async(p,name)=>{const f=path.join(out,name+'.png');await p.waitForTimeout(120);await p.screenshot({path:f,clip:clip?{x:clip[0],y:clip[1],width:clip[2],height:clip[3]}:undefined});log.push('shot '+path.relative(root,f))};
 const g=await page('index.html','game');
 if(!(await g.evaluate(()=>document.fonts.check('16px Jura'))))log.push('warning: Jura did not load (offline?)');
 if(shots.includes('title'))await snap(g,'title');
 await g.click('#m-new');if(shots.includes('newgame'))await snap(g,'newgame');
 await g.click('#d-start');
 if(days)await g.evaluate(n=>{for(let i=0;i<n*24;i++)tick();render()},days);
 if(!quick){
  for(const s of SCR)await g.evaluate(s=>go(s),s);
  for(const z of [1,2,3,4,5,6,7])await g.evaluate(z=>{go('base');S.view.z=z;render()},z);
  await g.evaluate(()=>{for(const t of DBTABS){dbTab=t[0];go('db')}go('base')});
  await g.evaluate(()=>{for(let i=0;i<90*24;i++)tick();render()});
  const st=await g.evaluate(()=>({date:S.y+'-'+S.m+'-'+S.d,pop:S.pop,over:S.over,rp:+S.rp.toFixed(2)}));
  log.push('game ok: 90 days run, '+JSON.stringify(st));
 }
 for(const s of shots){
  if(SCR.includes(s)){await g.evaluate(s=>{S.view.z=7;go(s)},s);await snap(g,s)}
  else if(/^map[1-7]$/.test(s)){await g.evaluate(z=>{go('base');S.view.z=z;render()},+s[3]);await snap(g,s)}
  else if(s==='menu'){await g.evaluate(()=>{go('base');S.view.z=7;render()});await g.click('#menu');await snap(g,s);await g.click('#dstay')}
 }
 if(ev)log.push('eval '+ev+' = '+JSON.stringify(await g.evaluate(e=>eval(e),ev)));
 if(!quick||shots.includes('editor')){
  await g.evaluate(()=>setMode('editor'));
  for(const t of await g.$$eval('#ed-tabs [data-tab]',a=>a.map(x=>x.dataset.tab)))await g.click('#ed-tabs [data-tab="'+t+'"]');
  if(shots.includes('editor'))await snap(g,'editor');
  if(!quick)log.push('editor ok');
 }
 if(!quick||shots.includes('gdd')){
  const d=await page('GDD.html','gdd');
  const n=await d.evaluate(()=>({sections:document.querySelectorAll('section.win').length,rows:document.querySelectorAll('table tr').length,emptyValues:document.querySelectorAll('[data-val]:empty,[data-cost]:empty').length,wide:document.documentElement.scrollWidth>innerWidth}));
  if(n.emptyValues)errs.push('gdd: '+n.emptyValues+' data-val/data-cost values are empty');
  if(!quick){log.push('gdd ok: '+JSON.stringify(n));try{require('child_process').execFileSync(process.execPath,[path.join(__dirname,'sync-gdd.js'),'--check'],{stdio:'pipe'})}catch(e){log.push('warning: GDD data is out of date, run node tools/sync-gdd.js')}}
  if(shots.includes('gdd'))await snap(d,'gdd');
 }
 await b.close();
 console.log(log.join('\n'));
 if(errs.length){console.log('ERRORS ('+errs.length+'):\n'+[...new Set(errs)].slice(0,20).join('\n'));process.exit(1)}
 console.log('no page errors');
})().catch(e=>{console.error('check failed: '+e.message.split('\n')[0]);process.exit(1)});
