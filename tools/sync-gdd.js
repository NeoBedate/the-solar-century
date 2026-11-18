#!/usr/bin/env node
/*
  Copies the game's default data from index.html into GDD.html, so the GDD tables never drift from the game.

  node tools/sync-gdd.js           rewrite the block between "SYNC:BEGIN" and "SYNC:END" in GDD.html
  node tools/sync-gdd.js --check   only report whether the GDD is out of date (exit code 1 if it is)

  The constants listed in NAMES are copied verbatim from the top level of the game's main script, plus the
  starting state from init() as START_STATE, plus the game commit (SYNC). Prose and GDD-only data are not touched.
  Needs acorn: cd tools && npm i
*/
const fs=require('fs'),path=require('path'),cp=require('child_process');
let acorn;try{acorn=require('acorn')}catch(e){console.error('acorn missing: cd tools && npm i');process.exit(2)}
const root=path.resolve(__dirname,'..'),gamePath=path.join(root,'index.html'),gddPath=path.join(root,'GDD.html');
const NAMES=['START','RN','B','T','TCATS','M','SHIP','PORT','WEAR','BOOST','STAFF','JOBN','WT','CREW','COL','SURVEY','LOCAN','LOCORB','CAT','CATI','LOCS','HOME','PARTS','SHIPPARTS','SHIPTYPES','SHIPREC','ICON'];
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
let commit='';try{commit=cp.execSync('git rev-parse --short HEAD',{cwd:root}).toString().trim();if(cp.execSync('git status --porcelain index.html',{cwd:root}).toString().trim())commit+='+'}catch(e){}
const block='/* SYNC:BEGIN (written by tools/sync-gdd.js from index.html; do not edit by hand) */\n'+parts.join('\n')+'\nconst SYNC={commit:'+JSON.stringify(commit)+'};\n/* SYNC:END */';
const gdd=fs.readFileSync(gddPath,'utf8'),re=/\/\* SYNC:BEGIN[\s\S]*?\/\* SYNC:END \*\//;
if(!re.test(gdd)){console.error('GDD.html has no SYNC:BEGIN / SYNC:END block');process.exit(1)}
const strip=s=>s.replace(/const SYNC=.*\n/,'');
const cur=gdd.match(re)[0],same=strip(cur)===strip(block);
if(process.argv.includes('--check')){console.log(same?'GDD data is up to date':'GDD data is OUT OF DATE: run node tools/sync-gdd.js');process.exit(same?0:1)}
if(cur===block){console.log('GDD data already up to date');process.exit(0)}
fs.writeFileSync(gddPath,gdd.replace(re,()=>block));
console.log((same?'GDD commit stamp updated':'GDD data synced')+' ('+parts.length+' statements, game commit '+(commit||'unknown')+')');
