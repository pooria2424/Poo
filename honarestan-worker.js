const DEFAULT_CONTENT = {
  school: {
    name: "هنرستان شهید ابراهیم جعفری",
    city: "رشت",
    intro: "به وب‌سایت هنرستان شهید ابراهیم جعفری خوش آمدید. اطلاعات این بخش را از پنل مدیریت تکمیل کنید.",
    history: "",
    goals: "",
    facilities: "",
    fields: []
  },
  gallery: [],
  students: [],
  staff: [],
  news: [],
  contacts: []
};

const PAGE = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>هنرستان شهید ابراهیم جعفری</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap');
:root{--bg:#f5f8f3;--fg:#173b2b;--card:#fff;--green:#187344;--muted:#65776b}
[data-theme=dark]{--bg:#101b15;--fg:#e9f3ec;--card:#1b2a21;--green:#6ac28c;--muted:#b0c1b5}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:Vazirmatn,Tahoma,sans-serif;line-height:1.9}
header{padding:22px 7vw;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.brand{font-weight:900;font-size:1.1rem}nav{display:flex;gap:16px;flex-wrap:wrap}a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer;border:0;border-radius:12px;padding:9px 15px;background:var(--green);color:white}
.hero{padding:70px 7vw 90px;background:linear-gradient(120deg,#dcefe1,transparent 70%);position:relative;overflow:hidden}
[data-theme=dark] .hero{background:linear-gradient(120deg,#203d2c,transparent 70%)}
.kicker{color:var(--green);font-weight:700}.hero h1{font-size:clamp(2.3rem,7vw,5.5rem);line-height:1.25;max-width:850px;margin:12px 0}.hero p{max-width:650px;color:var(--muted)}
main{padding:30px 7vw}.section{margin:55px 0}.section h2{font-size:2rem;margin-bottom:8px}.muted{color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}.card{background:var(--card);padding:22px;border-radius:22px;min-height:110px;box-shadow:0 10px 35px #173b2b0d}
.gallery img{width:100%;height:190px;object-fit:cover;border-radius:15px}.gallery .card{padding:10px}
footer{padding:35px 7vw;background:var(--card);margin-top:60px}
#admin{display:none;background:var(--card);padding:20px;border-radius:18px;margin-top:20px}
textarea{width:100%;min-height:380px;direction:ltr;text-align:left;font:14px monospace;padding:14px;border-radius:12px}
input{padding:10px;border:1px solid #aaa;border-radius:10px;margin:5px;max-width:100%}
</style></head>
<body>
<header><div class="brand">هنرستان شهید ابراهیم جعفری</div><nav><a href="#about">معرفی</a><a href="#fields">رشته‌ها</a><a href="#gallery">گالری</a><a href="#students">برترها</a><a href="#staff">کادر مدرسه</a><a href="#contact">ارتباط</a></nav><button id="theme">تغییر حالت</button></header>
<section class="hero"><div class="kicker">آموزش • مهارت • آینده</div><h1 id="heroTitle">هنرستان شهید ابراهیم جعفری</h1><p id="heroIntro">به وب‌سایت هنرستان خوش آمدید.</p><a href="#about"><button>آشنایی با هنرستان</button></a></section>
<main>
<section class="section" id="about"><div class="kicker">درباره ما</div><h2>جایی برای یادگیری و ساختن آینده</h2><p id="intro" class="muted"></p><div class="grid"><article class="card"><h3>تاریخچه</h3><p id="history"></p></article><article class="card"><h3>اهداف آموزشی</h3><p id="goals"></p></article><article class="card"><h3>امکانات</h3><p id="facilities"></p></article></div></section>
<section class="section" id="fields"><div class="kicker">مسیرهای یادگیری</div><h2>رشته‌های تحصیلی</h2><div id="fieldsList" class="grid"></div></section>
<section class="section" id="gallery"><div class="kicker">لحظه‌ها و فضاها</div><h2>گالری هنرستان</h2><div id="galleryList" class="grid gallery"></div></section>
<section class="section" id="students"><div class="kicker">افتخارهای ما</div><h2>دانش‌آموزان برتر</h2><div id="studentsList" class="grid"></div></section>
<section class="section" id="staff"><div class="kicker">همراهان آموزش</div><h2>کادر مدرسه</h2><div id="staffList" class="grid"></div></section>
<section class="section" id="news"><div class="kicker">تازه‌ها</div><h2>اخبار و اطلاعیه‌ها</h2><div id="newsList" class="grid"></div></section>
<section class="section" id="contact"><div class="kicker">در تماس باشیم</div><h2>راه‌های ارتباطی</h2><div id="contactsList" class="grid"></div></section>
<section id="admin" class="section"><h2>مدیریت محتوای سایت</h2><p class="muted">محتوا را به صورت JSON ویرایش کنید و ذخیره را بزنید.</p><textarea id="editor" spellcheck="false"></textarea><p><button id="save">ذخیره تغییرات</button> <span id="status"></span></p></section>
</main><footer><strong>هنرستان شهید ابراهیم جعفری</strong><div class="muted">رشت</div><button id="login" style="margin-top:15px">ورود مدیریت</button></footer>
<script>
let content;
const $=id=>document.getElementById(id);
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function cards(id,items,fn){$(id).innerHTML=(items||[]).map(fn).join('')||'<p class="muted">هنوز موردی ثبت نشده است.</p>'}
function render(c){content=c;const s=c.school||{};$('heroTitle').textContent=s.name||'هنرستان شهید ابراهیم جعفری';$('heroIntro').textContent=s.intro||'';$('intro').textContent=s.intro||'';$('history').textContent=s.history||'';$('goals').textContent=s.goals||'';$('facilities').textContent=s.facilities||'';
cards('fieldsList',s.fields,x=>'<article class="card"><h3>'+esc(x.name||x)+'</h3><p class="muted">'+esc(x.description||'')+'</p></article>');
cards('galleryList',c.gallery,x=>'<article class="card">'+(x.image?'<img src="'+esc(x.image)+'" alt="'+esc(x.title||'تصویر گالری')+'">':'')+'<strong>'+esc(x.title||'')+'</strong><p class="muted">'+esc(x.caption||'')+'</p></article>');
cards('studentsList',c.students,x=>'<article class="card"><h3>'+esc(x.name)+'</h3><p>'+esc(x.achievement||'')+'</p></article>');
cards('staffList',c.staff,x=>'<article class="card"><strong>'+esc(x.name)+'</strong><div class="muted">'+esc(x.role)+'</div></article>');
cards('newsList',c.news,x=>'<article class="card"><h3>'+esc(x.title)+'</h3><p>'+esc(x.text||'')+'</p></article>');
const contacts=(c.contacts||[]).filter(x=>x.enabled&&x.value);cards('contactsList',contacts,x=>'<article class="card"><strong>'+esc(x.type)+'</strong><div>'+(x.url?'<a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.value)+'</a>':esc(x.value))+'</div></article>');
}
async function load(){try{const r=await fetch('/api/content');if(!r.ok)throw Error();render(await r.json())}catch(e){render(${JSON.stringify(DEFAULT_CONTENT)})}}
$('theme').onclick=()=>{const d=document.documentElement;d.dataset.theme=d.dataset.theme==='dark'?'light':'dark';localStorage.setItem('school-theme',d.dataset.theme)};
if(localStorage.getItem('school-theme'))document.documentElement.dataset.theme=localStorage.getItem('school-theme');
$('login').onclick=async()=>{const u=prompt('نام کاربری مدیریت');if(u===null)return;const p=prompt('رمز عبور');if(p===null)return;const token='Basic '+btoa(unescape(encodeURIComponent(u+':'+p)));try{const r=await fetch('/api/content',{headers:{Authorization:token}});if(!r.ok)throw Error('اطلاعات ورود صحیح نیست');const data=await r.json();window.adminToken=token;$('admin').style.display='block';$('editor').value=JSON.stringify(data,null,2);$('admin').scrollIntoView({behavior:'smooth'})}catch(e){alert(e.message)}};
$('save').onclick=async()=>{try{const data=JSON.parse($('editor').value);const r=await fetch('/api/content',{method:'PUT',headers:{'Content-Type':'application/json',Authorization:window.adminToken},body:JSON.stringify(data)});if(!r.ok)throw Error('ذخیره انجام نشد');render(data);$('status').textContent='ذخیره شد.'}catch(e){$('status').textContent=e.message}};
load();
</script></body></html>`;

function json(data, status=200) {
  return new Response(JSON.stringify(data), {status, headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
function authorized(request, env) {
  const header = request.headers.get("Authorization") || "";
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) return false;
  const expected = "Basic " + btoa(unescape(encodeURIComponent(env.ADMIN_USERNAME + ":" + env.ADMIN_PASSWORD)));
  return header === expected;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return json({ok:true, kv:!!env.SCHOOL_KV});
    if (url.pathname === "/api/content" && request.method === "GET") {
      let data = DEFAULT_CONTENT;
      if (env.SCHOOL_KV) {
        const saved = await env.SCHOOL_KV.get("content");
        if (saved) { try { data = JSON.parse(saved); } catch {} }
      }
      return json(data);
    }
    if (url.pathname === "/api/content" && request.method === "PUT") {
      if (!authorized(request, env)) return json({error:"Unauthorized"}, 401);
      if (!env.SCHOOL_KV) return json({error:"SCHOOL_KV binding is missing"}, 500);
      let data;
      try { data = await request.json(); } catch { return json({error:"Invalid JSON"}, 400); }
      await env.SCHOOL_KV.put("content", JSON.stringify(data));
      return json({ok:true});
    }
    if (url.pathname.startsWith("/api/")) return json({error:"Not found"}, 404);
    return new Response(PAGE, {headers:{"content-type":"text/html; charset=utf-8","x-content-type-options":"nosniff"}});
  }
};