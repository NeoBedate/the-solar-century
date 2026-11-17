// Dev server with live reload: node tools/serve.js  ->  http://localhost:8080
// Serves the repo folder and reloads the page whenever a file changes. Nothing is added to index.html.
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),port=+process.env.PORT||8080,clients=new Set();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
const snippet='<script>new EventSource("/__reload").onmessage=()=>location.reload()</script>';
http.createServer((q,r)=>{
 const u=decodeURIComponent(q.url.split('?')[0]);
 if(u==='/__reload'){r.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache'});r.write('\n');clients.add(r);q.on('close',()=>clients.delete(r));return}
 const f=path.join(root,u==='/'?'index.html':u);
 if(!f.startsWith(root)){r.writeHead(403);return r.end()}
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('Not found')}
  const t=types[path.extname(f)]||'application/octet-stream';
  r.writeHead(200,{'Content-Type':t,'Cache-Control':'no-store'});
  r.end(t.startsWith('text/html')?d.toString().replace('</body>',snippet+'</body>'):d)})
}).listen(port,()=>console.log('Live reload server on http://localhost:'+port));
let timer;fs.watch(root,{recursive:true},(ev,name)=>{if(!name||/^(\.git|node_modules)/.test(name))return;clearTimeout(timer);timer=setTimeout(()=>clients.forEach(c=>c.write('data: r\n\n')),150)});
