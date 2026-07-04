(function(){
 var SITE = {"sections": [{"slug": "market-structure", "title": "Market structure", "tag": "structure", "desc": "How the parts of the lending system connect, and where the structure itself creates the risk.", "items": [{"slug": "servicers-the-next-rail", "title": "Servicers \u2014 the next rail in lending", "min": "8 min", "date": "Jul 2026", "summary": "Why lending needs a dedicated servicer rail, and what real bankruptcy-remoteness at scale unlocks.", "tags": ["structuring", "collections", "cost of funds", "portfolio"]}]}, {"slug": "quant-insights", "title": "Quant insights", "tag": "quant", "desc": "The maths under lending and markets \u2014 variance, pricing, curves and optimisation.", "items": [{"slug": "variance-of-default", "title": "It\u2019s not default \u2014 it\u2019s the variance of default", "min": "7 min", "date": "Jul 2026", "summary": "Stable default can be priced; its variance often can't. How tenor, FOIR and LTV should flex with it.", "tags": ["credit", "portfolio"]}]}, {"slug": "technology", "title": "Technology", "tag": "tech", "desc": "Where the lending stack should be rebuilt \u2014 AI across origination, underwriting, servicing and RCU, and the data products beneath them.", "items": []}, {"slug": "risk", "title": "Risk", "tag": "risk", "desc": "Risk beyond the credit model \u2014 model and standardisation risk, concentration, operational, fraud and conduct.", "items": []}, {"slug": "consulting", "title": "Consulting", "tag": "consulting", "desc": "Selected engagements across India and the GCC, described by structure and mandate; specifics under NDA on request.", "items": []}, {"slug": "teaching", "title": "Teaching", "tag": "teaching", "desc": "A lecture series on quantifying risk; modules deliverable as guest lectures or a semester elective.", "items": []}]};
 var root = document.documentElement;
 try{var st=localStorage.getItem('ci-theme'); if(st) root.setAttribute('data-theme',st);
     var sa=localStorage.getItem('ci-accent'); if(sa) root.setAttribute('data-accent',sa);}catch(e){}
 if(!root.getAttribute('data-accent')) root.setAttribute('data-accent','petrol');
 var path = location.pathname.replace(/index\.html$/,'').replace(/\/$/,'/') || '/';
 function postCard(s,it){ var u='/'+s.slug+'/'+it.slug+'.html'; var tags=(it.tags||[]).map(function(t){return '<span class="tagchip">'+t+'</span>';}).join(''); return '<a class="post" href="'+u+'"><div class="pt">'+it.title+'</div>'+(it.summary?'<div class="ps">'+it.summary+'</div>':'')+'<div class="pm"><span>'+(it.date||'')+'</span>'+(it.min?'<span>&middot;</span><span>'+it.min+'</span>':'')+'</div>'+(tags?'<div class="ptags">'+tags+'</div>':'')+'</a>'; }

 var navlinks = SITE.sections.map(function(s){return '<a href="/'+s.slug+'/">'+s.title+'</a>';}).join('') + '<a href="/about/">About</a>';
 var header = '<div class="nav"><div class="wrap">'
  +'<a class="brand" href="/"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M2 18 C7 18 8 6 20 4" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"></path><circle cx="20" cy="4" r="2" fill="var(--accent)"></circle></svg>creditintuition</a>'
  +'<div class="navlinks" id="navlinks">'+navlinks+'</div>'
  +'<div class="tools"><button class="menu-btn" id="menubtn" aria-label="Open menu"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></svg></button>'
  +'<div class="swatches" role="group" aria-label="Accent"><button class="sw petrol" data-accent="petrol" aria-label="Petrol"></button><button class="sw oxblood" data-accent="oxblood" aria-label="Oxblood"></button><button class="sw ink" data-accent="ink" aria-label="Ink"></button></div>'
  +'<button class="tbtn" id="themebtn" aria-label="Toggle dark mode">dark</button></div>'
  +'</div></div>';
 var footer = '<footer><div class="wrap"><span>&copy; creditintuition</span><span>a study of lending as one system</span></div></footer>';
 document.body.insertAdjacentHTML('afterbegin', header);
 document.body.insertAdjacentHTML('beforeend', footer);
 var cv=document.createElement('canvas'); cv.id='bgcanvas'; cv.setAttribute('aria-hidden','true'); document.body.appendChild(cv);

 // active nav + accent pressed + theme label
 var cs=null; SITE.sections.forEach(function(s){ if(path.indexOf('/'+s.slug+'/')===0) cs='/'+s.slug+'/'; });
 if(path.indexOf('/about')===0) cs='/about/';
 document.querySelectorAll('#navlinks a').forEach(function(a){ if(a.getAttribute('href')===cs) a.classList.add('on'); });
 document.querySelectorAll('.sw').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-accent')===root.getAttribute('data-accent')); });
 var tb=document.getElementById('themebtn'); tb.textContent = root.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
 var menubtn=document.getElementById('menubtn'), navEl=document.getElementById('navlinks');

 tb.addEventListener('click', function(){ var d=root.getAttribute('data-theme')==='dark'; root.setAttribute('data-theme', d?'light':'dark'); tb.textContent=d?'dark':'light'; try{localStorage.setItem('ci-theme', d?'light':'dark');}catch(e){} drawBg(); });
 menubtn.addEventListener('click', function(){ var o=navEl.classList.toggle('open'); menubtn.setAttribute('aria-expanded', o); });
 document.querySelectorAll('.sw').forEach(function(b){ b.addEventListener('click', function(){ var a=b.getAttribute('data-accent'); root.setAttribute('data-accent', a); document.querySelectorAll('.sw').forEach(function(x){x.setAttribute('aria-pressed', x===b);}); try{localStorage.setItem('ci-accent', a);}catch(e){} drawBg(); }); });

 // sidenav
 var sn=document.getElementById('sidenav');
 if(sn){
   var h='<button class="libnav-toggle" id="libnavtoggle" aria-expanded="false"><span>Sections</span><span style="font-family:var(--mono);color:var(--muted)">&#9662;</span></button><div id="libnavlist">';
   SITE.sections.forEach(function(s){
     h+='<div class="th"><a href="/'+s.slug+'/" style="color:inherit;text-decoration:none">'+s.title+'</a></div>';
     if(s.items.length){ s.items.forEach(function(it){ var u='/'+s.slug+'/'+it.slug+'.html'; h+='<a class="navitem'+(path===u?' on':'')+'" href="'+u+'">'+it.title+'</a>'; }); }
     else { h+='<div class="navitem" style="color:var(--muted);cursor:default">in preparation</div>'; }
   });
   h+='<div class="th"><a href="/about/" style="color:inherit;text-decoration:none">About</a></div></div>';
   sn.innerHTML=h;
   var lt=document.getElementById('libnavtoggle'); lt.addEventListener('click', function(){ var o=sn.classList.toggle('open'); lt.setAttribute('aria-expanded', o); });
 }

 // home
 var rec=document.getElementById('recent');
 if(rec){ var all=[]; SITE.sections.forEach(function(s){ s.items.forEach(function(it){ all.push({s:s,it:it}); }); });
   rec.innerHTML = all.map(function(x){ return postCard(x.s,x.it); }).join(''); }
 var sc=document.getElementById('sectioncards');
 if(sc){ sc.innerHTML = SITE.sections.map(function(s){ var n=s.items.length; var cnt=n?(n+' note'+(n>1?'s':'')):'in preparation'; return '<a class="themecard" href="/'+s.slug+'/" style="text-decoration:none"><span class="no">'+s.tag+'</span><h3>'+s.title+'</h3><p>'+s.desc+'</p><span class="n">'+cnt+' &rarr;</span></a>'; }).join(''); }

 // section index
 var list=document.getElementById('seclist');
 if(list){ var slug=document.body.getAttribute('data-section'); var sec=SITE.sections.filter(function(s){return s.slug===slug;})[0];
   if(sec && sec.items.length){ list.innerHTML = sec.items.map(function(it){ return postCard(sec,it); }).join(''); }
   else { list.innerHTML = '<p style="color:var(--muted)">Notes are in preparation — check back soon.</p>'; } }

 // article back link
 if(document.body.getAttribute('data-page')==='article'){
   var slug2=document.body.getAttribute('data-section'); var sec2=SITE.sections.filter(function(s){return s.slug===slug2;})[0]; var c=document.getElementById('content');
   if(sec2 && c) c.insertAdjacentHTML('afterbegin','<a class="back" href="/'+sec2.slug+'/">&larr; '+sec2.title+'</a>');
   var curSlug=(location.pathname.split('/').pop()||'').replace('.html','');
   var cit=sec2?sec2.items.filter(function(x){return x.slug===curSlug;})[0]:null;
   if(cit && cit.tags && cit.tags.length){ var meta=document.querySelector('#content .meta'); var chips='<div class="ptags" style="margin:2px 0 20px">'+cit.tags.map(function(t){return '<span class="tagchip">'+t+'</span>';}).join('')+'</div>'; if(meta) meta.insertAdjacentHTML('afterend', chips); }
 }

 // ambient quant background
 function cssvar(n){return getComputedStyle(root).getPropertyValue(n).trim();}
 function drawBg(){
   var c=document.getElementById('bgcanvas'); if(!c) return;
   var ctx=c.getContext('2d'), dpr=window.devicePixelRatio||1, w=innerWidth, h=innerHeight;
   c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
   var ink=cssvar('--ink-rgb')||'22,32,29', acc=cssvar('--accent-rgb')||'11,110,95';
   var gA=root.getAttribute('data-theme')==='dark'?0.05:0.045;
   ctx.strokeStyle='rgba('+ink+','+gA+')'; ctx.lineWidth=1; var step=44;
   for(var x=0;x<=w;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
   for(var y=0;y<=h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
   function curve(ox,oy,cw,ch,a){ ctx.strokeStyle='rgba('+acc+','+a+')'; ctx.lineWidth=1.5; ctx.beginPath();
     [[0,.02],[.16,.34],[.32,.58],[.5,.74],[.68,.86],[.84,.94],[1,1]].forEach(function(p,i){var X=ox+cw*p[0],Y=oy+ch*(1-p[1]); i?ctx.lineTo(X,Y):ctx.moveTo(X,Y);}); ctx.stroke(); }
   curve(w*0.60,h*0.10,w*0.34,h*0.30,0.10); curve(w*0.06,h*0.55,w*0.30,h*0.28,0.07);
   var mx=w*0.66,my=h*0.62,cell=17;
   for(var i=0;i<5;i++)for(var j=0;j<5;j++){var v=Math.max(0,1-Math.abs(i-j)/4);ctx.fillStyle='rgba('+acc+','+(0.02+v*0.05)+')';ctx.fillRect(mx+j*cell,my+i*cell,cell-2,cell-2);}
 }
 drawBg(); addEventListener('resize', drawBg);
})();