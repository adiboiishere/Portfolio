(()=>{
const $=(s)=>[...document.querySelectorAll(s)],rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
let started=0;

/* boot sequence */
const boot=document.getElementById('boot'),bt=document.getElementById('bootTxt'),bar=boot.querySelector('.bar i'),steps=['loading embeddings','training model','indexing vectors','deploying portfolio'];
let p=0;const bi=setInterval(()=>{p=Math.min(100,p+Math.random()*9+3);bar.style.width=p+'%';bt.textContent=steps[Math.min(3,p/26|0)]+'… '+(p|0)+'%';if(p>=100){clearInterval(bi);setTimeout(start,250)}},rm?1:70);
setTimeout(start,3800);
function start(){if(started)return;started=1;boot.classList.add('off');reveal();typer()}

/* scramble text */
const chars='01<>/{}[]#$%&*';
function scramble(el){const t=el.dataset.t||(el.dataset.t=el.textContent);if(rm)return;let f=0;const n=26,id=setInterval(()=>{el.textContent=[...t].map((c,i)=>c===' '?c:i<f/n*t.length?c:chars[Math.random()*chars.length|0]).join('');if(++f>n){clearInterval(id);el.textContent=t}},28)}

/* counters */
function count(el){const t=el.textContent,m=t.match(/[\d.]+/);if(!m||rm)return;const end=parseFloat(m[0]),d=(m[0].split('.')[1]||'').length,t0=performance.now();
(function s(now){const k=Math.min(1,(now-t0)/1500),v=end*(1-Math.pow(1-k,3));el.textContent=t.replace(m[0],v.toFixed(d));if(k<1)requestAnimationFrame(s)})(t0)}

/* scroll reveal with stagger */
function reveal(){
const sel='.hero-copy>*,.hero-visual>*,.section .eyebrow,.section h2,.card,.facts>div,.about article,.marquee';
const els=$(sel);els.forEach((e,i)=>{e.classList.add('rv');const sib=[...e.parentElement.children].indexOf(e);e.style.setProperty('--d',(Math.min(sib,6)*.09)+'s')});
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const e=en.target;io.unobserve(e);e.classList.add('in');
if(e.matches('h2'))scramble(e);if(e.matches('.facts>div'))count(e.querySelector('strong'));
setTimeout(()=>e.classList.add('done'),1100)}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach(e=>io.observe(e))}

/* typewriter */
function typer(){const el=document.getElementById('type'),w=['machine learning systems','RAG pipelines','data products','AI applications','forecasting models'];let i=0,j=0,del=0;
if(rm){el.textContent=w[0];return}
(function t(){const s=w[i];j+=del?-1:1;el.textContent=s.slice(0,j);let ms=del?35:70;if(!del&&j===s.length){del=1;ms=1500}else if(del&&j===0){del=0;i=(i+1)%w.length;ms=300}setTimeout(t,ms)})()}

/* marquee loop */
const tr=document.querySelector('.track');if(tr)tr.innerHTML+=tr.innerHTML;

/* scroll progress + active nav */
const pg=document.getElementById('prog');
addEventListener('scroll',()=>{pg.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const links=$('nav a'),so=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+en.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$('main section[id]').forEach(s=>so.observe(s));

/* card spotlight + 3D tilt, magnetic buttons */
$('.card,.facts>div,.profile-card').forEach(c=>{
c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
if(fine&&!rm&&c.classList.contains('done')){const big=c.classList.contains('profile-card')?7:3;c.style.setProperty('--ry',((x/r.width-.5)*big)+'deg');c.style.setProperty('--rx',(-(y/r.height-.5)*big)+'deg')}});
c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
if(fine&&!rm)$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});

/* custom cursor */
const c1=document.getElementById('cur'),c2=document.getElementById('cur2');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
if(fine){addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;c1.style.transform=`translate(${mx}px,${my}px)`});
document.addEventListener('pointerover',e=>c2.classList.toggle('hv',!!e.target.closest('a,button,.card')));
(function l(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;c2.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(l)})()}

/* neural network background */
const cv=document.getElementById('net'),x=cv.getContext('2d');let W,H,N=[],dpr=Math.min(devicePixelRatio||1,2),pulses=[];
function size(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;const n=Math.min(110,innerWidth*innerHeight/14000|0);N=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35*dpr,vy:(Math.random()-.5)*.35*dpr,r:(Math.random()*1.4+.8)*dpr}))}
size();addEventListener('resize',size);
function draw(){x.clearRect(0,0,W,H);const D=140*dpr,M=D*1.2,mxp=mx*dpr,myp=my*dpr;
for(const a of N){if(!rm){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
const dx=a.x-mxp,dy=a.y-myp,d=Math.hypot(dx,dy);if(fine&&d<160*dpr&&d>1){a.x+=dx/d*.6*dpr;a.y+=dy/d*.6*dpr}}
x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fillStyle='#78a9ffcc';x.fill()}
for(let i=0;i<N.length;i++){for(let j=i+1;j<N.length;j++){const a=N[i],b=N[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<D){x.strokeStyle=`rgba(79,140,255,${(1-d/D)*.35})`;x.lineWidth=dpr*.8;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();if(!rm&&Math.random()<.0004&&pulses.length<14)pulses.push({a,b,t:0})}}
if(fine){const a=N[i],d=Math.hypot(a.x-mxp,a.y-myp);if(d<M){x.strokeStyle=`rgba(34,211,238,${(1-d/M)*.6})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(mxp,myp);x.stroke()}}}
pulses=pulses.filter(s=>(s.t+=.02)<1);for(const s of pulses){x.beginPath();x.arc(s.a.x+(s.b.x-s.a.x)*s.t,s.a.y+(s.b.y-s.a.y)*s.t,3*dpr,0,7);x.fillStyle='#22d3ee';x.shadowColor='#22d3ee';x.shadowBlur=14*dpr;x.fill();x.shadowBlur=0}
requestAnimationFrame(draw)}
draw();
})();
