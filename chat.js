(()=>{
/* Optional: set to your own backend/proxy URL to enable live LLM answers.
   Expected: POST {message, history} -> {reply}. Never put an API key in this file. */
const CHAT_API='';

const KB=[
{k:['hi','hello','hey','namaste','good morning','start'],a:"Hi! I'm Aditya's portfolio assistant. Ask me about his <b>projects</b>, <b>skills</b>, <b>experience</b> or how to <b>contact</b> him."},
{k:['about','who','introduce','yourself','summary','background'],a:"Aditya is a <b>Data Science postgraduate</b> (M.Sc., CGPA 8.24/10) focused on machine learning, RAG systems, analytics and practical AI apps. He works across the lifecycle: data prep, modelling, semantic retrieval, APIs, dashboards and deployment. <a href='#about'>See About</a>"},
{k:['skill','tech','stack','tools','language','framework','python','sql','know'],a:"<b>Programming:</b> Python, SQL, JavaScript, HTML/CSS<br><b>Frameworks:</b> FastAPI, Django, PySpark, TensorFlow, Scikit-learn, Streamlit, OpenAI<br><b>Data & Cloud:</b> AWS, MongoDB, MySQL, Power BI, Vector DB<br><b>Product:</b> Agile, A/B testing, LLMs. <a href='#skills'>See Skills</a>"},
{k:['project','built','work','portfolio','made','projects'],a:"Five main projects:<br>1. <b>AI Tax Compliance Monitoring</b> (88% accuracy)<br>2. <b>DocuBot RAG Q&A System</b><br>3. <b>E-commerce Analysis & Segmentation</b> (92% forecast accuracy)<br>4. <b>Hybrid-Quantum Stock Forecasting</b><br>5. <b>Farm Database System (SQL)</b><br>Ask about any of them. <a href='#projects'>See Projects</a>"},
{k:['tax','fraud','compliance','evasion','capstone','sih'],a:"<b>AI-Powered Tax Compliance Monitoring</b>: analysed 500K+ transactions, engineered 27 features and flagged high-risk taxpayers with <b>88% accuracy</b>. Built a PySpark pipeline and a Streamlit dashboard with 7 analytical views. Aditya led the team. <a href='#projects'>View</a>"},
{k:['rag','docubot','document','retrieval','vector','llm','embedding','endee','chatbot'],a:"<b>DocuBot RAG System</b>: natural-language Q&A over documents. Pipeline covers chunking, embedding (all-MiniLM-L6-v2), indexing in Endee Vector DB and ANN cosine retrieval, with FastAPI endpoints and grounded answers from GPT-4o-mini. <a href='#projects'>View</a>"},
{k:['ecommerce','e-commerce','rfm','segmentation','customer','forecast','prophet','sales'],a:"<b>E-commerce Analysis & Segmentation</b>: ETL over 500K+ transactions, an RFM engine with <b>8 customer profiles</b>, and a Prophet-based forecasting module reaching <b>92% accuracy</b> on monthly sales. <a href='#projects'>View</a>"},
{k:['quantum','stock','pennylane','qubit','hybrid','finance','price'],a:"<b>Hybrid-Quantum Stock Forecasting</b>: 10 years of Yahoo Finance data, feature engineering (moving averages, volatility, volume), PCA with a 4-qubit quantum embedding using PennyLane. Achieved R² of <b>0.6582</b>. <a href='#projects'>View</a>"},
{k:['farm','database','dbms','normalized','t-sql','mysql'],a:"<b>Farm Database Management System</b>: a fully normalised relational schema built with SQL, plus mentoring teammates on database design and writing the final report. <a href='#projects'>View</a>"},
{k:['toxic','comment','nlp','moderation'],a:"<b>Social Media Toxic Comment Detection</b>: multilabel classifier across six categories using TF-IDF, TensorFlow and Scikit-learn, with a Gradio demo. Precision 89%, recall 81%. It's listed on the resume."},
{k:['experience','job','intern','medrev','company','employ','career','current'],a:"Aditya is a <b>Growth Operations Analyst</b> at US MedRev Solutions (remote, Aug 2026 – present). He built a 100+ practitioner prospect dataset with AI research workflows, cleaned data in Excel/Sheets, deployed a website (HTML5, JS, Bootstrap) and automated monitoring with Cloudflare and cPanel, saving 10+ hours/week. <a href='#experience'>View</a>"},
{k:['education','study','degree','university','college','cgpa','lpu','master','bachelor','msc'],a:"<b>M.Sc. Data Science</b>, Lovely Professional University, 2024–2026, CGPA 8.24/10.<br><b>B.Sc. Information Technology</b>, LPU, 2021–2024, CGPA 7.57/10."},
{k:['certificate','certification','ibm','course','forage','british','coursera','badge'],a:"Certificates include IBM Machine Learning, Data Science 101, Business Intelligence, Data Visualization, GPU Deep Learning, Data Fundamentals, Big Data with Spark & Hadoop, and the British Airways Data Science simulation. <a href='#certificates'>See all with links</a>"},
{k:['ieee','review','reviewer','tnnls','research','paper','achievement','award'],a:"Aditya is a <b>peer reviewer for IEEE TNNLS</b>, reviewing research in Quantum Machine Learning and Statistical Learning Theory. His Web of Science author record is linked on the site."},
{k:['resume','cv','download'],a:"You can grab it here: <a href='Aditya_Resume.pdf' download>Download resume (PDF)</a>"},
{k:['contact','email','mail','phone','call','reach','linkedin','github','connect','hire','hiring','available','opportunit'],a:"<b>Email:</b> <a href='mailto:adisr226@gmail.com'>adisr226@gmail.com</a><br><b>Phone:</b> <a href='tel:+919058630395'>+91 9058630395</a><br><a href='https://www.linkedin.com/in/aditya226' target='_blank' rel='noopener'>LinkedIn</a> · <a href='https://github.com/adityasr226' target='_blank' rel='noopener'>GitHub</a><br>He's open to data science, AI, analytics and software opportunities."},
{k:['where','location','based','live','city','roorkee'],a:"Aditya is based in Roorkee, Uttarakhand, India, and works remotely."},
{k:['thanks','thank','great','awesome','cool','nice'],a:"Happy to help! Anything else you'd like to know?"}
];
const FALLBACK="I'm not sure about that one. I can talk about Aditya's <b>projects, skills, experience, education, certificates</b> or <b>contact details</b>. Or email him at <a href='mailto:adisr226@gmail.com'>adisr226@gmail.com</a>.";
const CHIPS=['Projects','Skills','Experience','Education','Resume','Contact'];

const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
const fab=el('button','','💬');fab.id='cb-fab';fab.setAttribute('aria-label','Open chat assistant');
const tip=el('div','','Ask my AI assistant 👋');tip.id='cb-tip';
const box=el('section','','<div class="cb-h"><img src="profile.jpg" alt=""><div><b>Aditya\'s AI Assistant</b><small>Online</small></div><button aria-label="Close chat">✕</button></div><div id="cb-log" aria-live="polite"></div><div id="cb-chips"></div><form id="cb-f"><input id="cb-in" placeholder="Ask about projects, skills…" autocomplete="off" maxlength="200" aria-label="Your message"><button aria-label="Send">➤</button></form>');
box.id='cb';box.setAttribute('role','dialog');box.setAttribute('aria-label','Chat assistant');
document.body.append(tip,box,fab);
const log=box.querySelector('#cb-log'),inp=box.querySelector('#cb-in'),chips=box.querySelector('#cb-chips'),hist=[];let greeted=0;

CHIPS.forEach(c=>{const b=el('button','',c);b.type='button';b.onclick=()=>ask(c);chips.append(b)});
const toggle=o=>{box.classList.toggle('open',o);fab.classList.toggle('open',o);fab.textContent=o?'✕':'💬';tip.remove();if(o){inp.focus();if(!greeted){greeted=1;say(KB[0].a)}}};
fab.onclick=()=>toggle(!box.classList.contains('open'));
box.querySelector('.cb-h button').onclick=()=>toggle(false);
addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
box.querySelector('form').onsubmit=e=>{e.preventDefault();const v=inp.value.trim();if(v){inp.value='';ask(v)}};

function say(html,me){const m=el('div','cb-m '+(me?'me':'bot'));if(me)m.textContent=html;else m.innerHTML=html;log.append(m);log.scrollTop=log.scrollHeight}
function local(q){q=' '+q.toLowerCase()+' ';let best=0,ans=FALLBACK;KB.forEach(e=>{const s=e.k.reduce((n,k)=>n+(q.includes(k)?k.length>3?2:1:0),0);if(s>best){best=s;ans=e.a}});return ans}
async function ask(q){say(q,1);hist.push({role:'user',content:q});
const d=el('div','cb-m bot cb-dots','<i></i><i></i><i></i>');log.append(d);log.scrollTop=log.scrollHeight;
let r=null;
if(CHAT_API){try{const res=await fetch(CHAT_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history:hist.slice(-8)})});const j=await res.json();if(j.reply)r=String(j.reply).replace(/</g,'&lt;').replace(/\n/g,'<br>')}catch(e){}}
if(!r)await new Promise(s=>setTimeout(s,500+Math.random()*500));
d.remove();r=r||local(q);say(r);hist.push({role:'assistant',content:r});
log.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=()=>{if(innerWidth<700)toggle(false)})}
})();
