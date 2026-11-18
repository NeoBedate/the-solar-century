#!/usr/bin/env node
/*
  Copies the game's default data from index.html into GDD.html, so the GDD tables never drift from the game.

  node tools/sync-gdd.js           rewrite the block between "SYNC:BEGIN" and "SYNC:END" in GDD.html
  node tools/sync-gdd.js --check   only report whether the GDD is out of date (exit code 1 if it is)

  The constants listed in NAMES are copied verbatim from the top level of the game's main script, plus the
  starting state from init() as START_STATE. Prose and GDD-only data are not touched.

  Revision (the SYNC line): when GDD.html differs from the last commit, or its data is about to change, the GDD
  is a new revision: number = commits that changed GDD.html + 1, today's date, and the history of those commits
  (hash, date, subject) from git. When nothing changed nothing is written, so syncing never creates churn.
  The pre-commit hook runs this script and stages GDD.html, so every commit carries a correct revision.
  Needs acorn: cd tools && npm i
*/
const fs=require('fs'),path=require('path'),cp=require('child_process');
let acorn;try{acorn=require('acorn')}catch(e){console.error('acorn missing: cd tools && npm i');process.exit(2)}
const root=path.resolve(__dirname,'..'),gamePath=path.join(root,'index.html'),gddPath=path.join(root,'GDD.html');
const NAMES=['START','RN','B','T','TCATS','M','SHIP','PORT','WEAR','BOOST','STAFF','JOBN','WT','CREW','COL','SURVEY','LOCAN','LOCORB','CAT','CATI','LOCS','LIFE','HOME','PARTS','SHIPPARTS','SHIPDRIVE','DRIVES','ENGINES','SHIPENGINE','EVENTS','EVTYPES','SHIPTYPES','SHIPREC','ICON'];
const html=fs.readFileSync(gamePath,'utf8');
/* the main script is the largest <script> block */
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length);
const src=scripts[0],ast=acorn.parse(src,{ecmaVersion:'latest'});
const found={},parts=[];
for(const st of ast.body){
 if(st.type!=='VariableDeclaration')continue;
 const ids=st.declarations.map(d=>d.id.name);
 if(!ids.some(n=>NAMES.includes(n)))continue;
 ids.forEach(n=>found[n]=1);
 parts.push(src.slice(st.start,st.end).replace(/\r/g,'').replace(/^let /,'const '));
}
const miss=NAMES.filter(n=>!found[n]);if(miss.length){console.error('not found in index.html: '+miss.join(', '));process.exit(1)}
/* starting state: S={...} inside init() */
const init=ast.body.find(s=>s.type==='FunctionDeclaration'&&s.id.name==='init');
let obj=null;(function walk(n){if(!n||obj||typeof n!=='object')return;if(n.type==='AssignmentExpression'&&n.left.name==='S'&&n.right.type==='ObjectExpression'){obj=n.right;return}for(const k in n)if(k!=='parent')walk(n[k])})(init);
const pick=k=>{const p=obj.properties.find(p=>p.key&&p.key.name===k);return p?src.slice(p.value.start,p.value.end):'null'};
parts.push('const START_STATE={pop:'+pick('pop')+',res:'+pick('res')+',b:'+pick('b')+',staff:'+pick('staff')+',slots:'+pick('slots')+'};');
const head='/* SYNC:BEGIN (written by tools/sync-gdd.js from index.html; do not edit by hand) */\n'+parts.join('\n')+'\n';
const gdd=fs.readFileSync(gddPath,'utf8'),re=/\/\* SYNC:BEGIN[\s\S]*?\/\* SYNC:END \*\//;
if(!re.test(gdd)){console.error('GDD.html has no SYNC:BEGIN / SYNC:END block');process.exit(1)}
const strip=s=>s.replace(/const SYNC=.*\n/,'').replace(/\/\* SYNC:END \*\/$/,'');
const cur=gdd.match(re)[0],same=strip(cur)===head;
if(process.argv.includes('--check')){console.log(same?'GDD data is up to date':'GDD data is OUT OF DATE: run node tools/sync-gdd.js');process.exit(same?0:1)}
const git=a=>cp.execFileSync('git',a,{cwd:root}).toString();
let dirty=true,hist=[];
try{dirty=!!git(['status','--porcelain','GDD.html']).trim();hist=git(['log','--format=%h%x09%ad%x09%s','--date=short','--','GDD.html']).trim().split('\n').filter(Boolean).map(l=>l.split('\t'))}catch(e){console.log('git not available: revision not updated')}
if(same&&!dirty){console.log('GDD up to date (revision '+hist.length+')');process.exit(0)}
const d=new Date(),today=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const rev=hist.length+1,SYNC={rev,date:today,history:hist.map((h,i)=>[hist.length-i,h[1],h[0],h[2]])};
const block=head+'const SYNC='+JSON.stringify(SYNC).replace(/</g,()=>String.fromCharCode(92)+"u003c")+';\n/* SYNC:END */';
if(cur===block){console.log('GDD up to date (revision '+rev+', not committed yet)');process.exit(0)}
fs.writeFileSync(gddPath,gdd.replace(re,()=>block));
console.log((same?'GDD revision updated':'GDD data synced')+': revision '+rev+' ('+parts.length+' statements)');
