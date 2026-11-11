(function(){
  var $=function(i){return document.getElementById(i)};
  var s={beds:3,baths:2,guests:6,rev:0,lo:0,hi:0},cur=0,zip=$('zip'),opener=null;
  var mult={'0':1.05,'1':1,'2':1,'3':1.15,'4':.95,'5':.95,'6':1,'7':1.05,'8':1.25,'9':1.2};
  function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
  function r100(n){return Math.round(n/100)*100}
  function keep(f){return money(r100(s.lo*(1-f)))+' to '+money(r100(s.hi*(1-f)))}
  function planKeep(){
    document.querySelectorAll('[data-keep]').forEach(function(el){
      var f=+el.dataset.keep;el.innerHTML='You’d keep about <b>'+keep(f)+'</b> a year';
    });
    $('closeT').textContent='Your estimate: '+money(s.lo)+' to '+money(s.hi)+' a year';
    $('closeP').textContent='Set up your property in a few minutes. No commitment until you’re ready.';
    $('closeBtn').textContent='Get started';
  }
  function validZip(v){return /^\d{5}$/.test(v)}
  function plural(n,a,b){return n+' '+(n===1?a:b)}
  function lab(){
    $('bedV').textContent=s.beds;$('batV').textContent=s.baths;
    $('bedV').setAttribute('aria-label',plural(s.beds,'bedroom','bedrooms'));
    $('batV').setAttribute('aria-label',plural(s.baths,'bathroom','bathrooms'));
  }
  function bump(k,d,min,max){s[k]=Math.min(max,Math.max(min,s[k]+d));lab()}
  $('bedM').onclick=function(){bump('beds',-1,1,10)};$('bedP').onclick=function(){bump('beds',1,1,10)};
  $('batM').onclick=function(){bump('baths',-.5,1,8)};$('batP').onclick=function(){bump('baths',.5,1,8)};
  zip.addEventListener('input',function(){zip.value=zip.value.replace(/\D/g,'').slice(0,5);if(validZip(zip.value))$('zipErr').textContent=''});
  function cardView(n){$('v1').hidden=n!==1;$('v2').hidden=n!==2;(n===1?$('estTitle'):$('v2t')).focus()}
  function estimate(){
    var m=mult[zip.value[0]]||1;
    s.rev=(9000+s.beds*8200+s.baths*2600)*m;
    s.lo=r100(s.rev*.85);s.hi=r100(s.rev*1.15);
    $('sum').textContent=plural(s.beds,'bedroom','bedrooms')+', '+plural(s.baths,'bathroom','bathrooms')+', ZIP '+zip.value;
    $('res').innerHTML='<div class="k">Rough booking revenue per year</div><div class="big">'+money(s.lo)+' to '+money(s.hi)+'</div>'+
      '<p class="k" style="margin:-4px 0 0">Based on '+s.beds+'-bedroom homes near '+zip.value+'</p>'+
'';
    planKeep();
  }
  $('edit').onclick=function(){cardView(1)};
  $('est').addEventListener('submit',function(e){
    e.preventDefault();
    if(!validZip(zip.value)){$('zipErr').textContent='Enter a 5-digit ZIP code to see your estimate.';zip.focus();return}
    estimate();cardView(2);
  });
  var TI={'House':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/></svg>','Condo or townhome':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M3.5 20V10.5L8 7l4.5 3.5V20"/><path d="M12.5 20V10.5L17 7l4.5 3.5V20"/><path d="M6.5 14h3M15.5 14h3"/></svg>','Cabin':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20 12 4l9 16Z"/><path d="M9.5 20v-5h5v5"/><path d="M10.5 11.5h3"/></svg>','Apartment':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>','Other':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>','Families':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="7" r="3"/><path d="M3 20c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5"/><circle cx="17" cy="11" r="2.2"/><path d="M13.8 20c0-2.2 1.4-4 3.2-4s3.2 1.8 3.2 4"/></svg>','Couples':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/></svg>','Groups of friends':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7.5" r="2.8"/><circle cx="5.5" cy="10" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M7 20c0-2.9 2.2-5.2 5-5.2s5 2.3 5 5.2"/><path d="M2 19c0-2.2 1.5-3.9 3.5-3.9M22 19c0-2.2-1.5-3.9-3.5-3.9"/></svg>','Remote workers':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="5" width="15" height="10" rx="1.2"/><path d="M2.5 19h19l-1.5-4H4Z"/></svg>','Pets welcome':'<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12.5c-2.6 0-5 2.6-5 4.8 0 1.4 1 2.2 2.4 2.2 1 0 1.6-.5 2.6-.5s1.6.5 2.6.5c1.4 0 2.4-.8 2.4-2.2 0-2.2-2.4-4.8-5-4.8Z"/><circle cx="7" cy="9.5" r="1.7"/><circle cx="10" cy="5.8" r="1.7"/><circle cx="14" cy="5.8" r="1.7"/><circle cx="17" cy="9.5" r="1.7"/></svg>'};
  TI['Condo or apartment']=TI['Apartment'];TI['Townhome']=TI['Condo or townhome'];TI['Guest suite or ADU']=TI['Apartment'];TI['Something else']=TI['Other'];
  /* chips */
  document.querySelectorAll('.chips').forEach(function(el){
    el.dataset.opts.split('|').forEach(function(v){
      var l=document.createElement('label');l.className='chip';
      var i=document.createElement('input');i.type=el.dataset.type;i.name=el.dataset.name;i.value=v;
      var sp=document.createElement('span');if(TI[v]){sp.innerHTML=TI[v];sp.append(document.createTextNode(v))}else sp.textContent=v;l.append(i,sp);el.append(l);
    });
  });
  function picked(n){return Array.prototype.map.call(document.querySelectorAll('input[name="'+n+'"]:checked'),function(x){return x.value})}
  /* wizard */
  var wiz=$('wiz'),panes=document.querySelectorAll('.pane');
  var stages=['','Your place','Your address','Your next step'];
  var stageOf=[0,1,1,1,2,2,3,3,1],first={1:1,2:4,3:6},count={1:2,2:2,3:1};
  var NOFIT=['Timeshare','RV or mobile home'];
  var HOOD={'80206':'Congress Park, Denver','80218':'Cheesman Park, Denver','80202':'LoDo, Denver','80211':'Highlands, Denver','80205':'Five Points, Denver','80424':'Breckenridge','81611':'Aspen'};
  var TYPEW={'House':1,'Condo or apartment':.9,'Townhome':.95,'Cabin':1.1,'Guest suite or ADU':.75,'Tiny home':.7};
  var exact=null;
  function one(n){return picked(n)[0]||''}
  function ptype(){var t=one('ptype');return t==='Something else'?one('ptype2'):t}
  function hood(){var z=$('az').value||zip.value;return HOOD[z]||('ZIP '+z)}
  function range(){
    var w=TYPEW[ptype()]||1;
    if(exact)return [r100(exact.f*s.rev*w*.92),r100(exact.f*s.rev*w*1.08)];
    return [r100(s.lo*w),r100(s.hi*w)];
  }
  function strip(){
    var r=range();
    $('stripL').textContent=(exact?'Estimate for '+exact.street+':':'Rough estimate:')+' ';
    $('stripV').textContent=money(r[0])+' to '+money(r[1])+' a year';
  }
  function wlab(){$('wbV').textContent=s.beds;$('wtV').textContent=s.baths;$('wbV').setAttribute('aria-label',plural(s.beds,'bedroom','bedrooms'));$('wtV').setAttribute('aria-label',plural(s.baths,'bathroom','bathrooms'))}
  function wbump(k,d,min,max){s[k]=Math.min(max,Math.max(min,s[k]+d));lab();wlab();estimate();strip()}
  $('wbM').onclick=function(){wbump('beds',-1,1,10)};$('wbP').onclick=function(){wbump('beds',1,1,10)};
  $('wtM').onclick=function(){wbump('baths',-.5,1,8)};$('wtP').onclick=function(){wbump('baths',.5,1,8)};
  document.querySelectorAll('input[name="ptype"],input[name="ptype2"],input[name="space"]').forEach(function(i){i.addEventListener('change',function(){$('tyErr').textContent='';$('elseBox').hidden=one('ptype')!=='Something else';strip()})});
  document.querySelectorAll('input[name="furn"],input[name="rent"]').forEach(function(i){i.addEventListener('change',function(){$('stErr').textContent=''})});
  document.querySelectorAll('input[name="path"]').forEach(function(i){i.addEventListener('change',function(){
    var t=i.value==='talk';$('cFields').hidden=false;$('talkOnly').hidden=!t;
    $('phL').textContent=t?'Phone':'Phone (optional)';
    $('wzNext').textContent=t?'Request a conversation':'Send my estimate';$('ctErr').textContent='';
  })});
  function typeShort(){var t=ptype();return {'House':'house','Condo or apartment':'condo','Townhome':'townhome','Cabin':'cabin','Guest suite or ADU':'guest suite','Tiny home':'tiny home'}[t]||'home'}
  var COMPS={'Denver':['Denver Square near the park','Brick bungalow off Colfax','Updated home on a tree-lined block'],'Breckenridge':['Ski-area condo near Main Street','Mountain home with a hot tub','Townhome by the gondola'],'Aspen':['Mountain home near downtown','Condo by the lifts','Townhome with mountain views']};
  var HOUSE_SVG='<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/></svg>';
  function listing(){
    var r=range(),furn=one('furn'),rent=one('rent'),h0=hood(),area=h0.split(',')[0],city=h0.indexOf(',')>-1?h0.split(', ')[1]:h0;
    var el=$('lst');el.textContent='';
    var b=document.createElement('div');b.className='lbody';
    var h=document.createElement('h3');h.textContent=s.beds+'-bedroom '+typeShort()+' in '+h0;
    var meta=document.createElement('p');meta.className='lmeta';meta.textContent=(exact?addr():'')+'';
    var est=document.createElement('div');est.className='lest';est.innerHTML='<span>Estimated booking revenue</span><b></b><small></small>';
    est.querySelector('b').textContent=money(r[0])+' to '+money(r[1])+' a year';
    est.querySelector('small').textContent='Based on your address and similar homes Evolve manages nearby'+(furn==='Not yet'?', once your place is furnished':'')+'.';
    var ul=document.createElement('ul');ul.className='lfacts';
    [['ok','Short-term rentals are allowed here with a city license. We’ll help you apply.'],['',rent==='Yes, long-term tenants'?'You’ll see a short-term vs. long-term comparison on your call.':rent==='Yes, short-term stays'?'We’ll bring your current listing and reviews with you.':'We’ll set up your listing, photos, and pricing.']].forEach(function(x){var li=document.createElement('li');if(x[0])li.className=x[0];li.textContent=x[1];ul.append(li)});
    b.append(h,meta,est,ul);el.append(b);
    /* comparable Evolve homes */
    var names=COMPS[city]||['Home near downtown','Quiet home with a yard','Updated home near shops'];
    var mid=(r[0]+r[1])/2,cs=$('comps');cs.textContent='';
    $('compT').textContent='Evolve homes like yours near '+area;
    names.forEach(function(n,k){
      var bd=Math.max(1,s.beds+[0,-1,1][k]),nt=Math.round(mid*(bd/s.beds)/(365*.62)/5)*5,rt=['4.9','4.8','4.9'][k],rv=[62,38,114][k];
      var c=document.createElement('li');c.className='comp';
      c.innerHTML='<div class="cph"><img alt=""></div><div class="cbd"><b></b><span class="cm"></span><span class="cr"></span></div>';
      var ci=c.querySelector('img'),hero=document.querySelector('.hero .bg').getAttribute('src'),tp=document.querySelectorAll('.tphoto');
      ci.src=[hero,tp[0].getAttribute('src'),hero][k];ci.style.objectPosition=['22% 50%','50% 55%','92% 50%'][k];
      c.querySelector('b').textContent=n;
      c.querySelector('.cm').textContent=plural(bd,'bedroom','bedrooms')+' · about '+money(nt)+' a night';
      c.querySelector('.cr').textContent='★ '+rt+' ('+rv+' reviews)';
      cs.append(c);
    });
  }
  function go(n){
    cur=n;
    Array.prototype.forEach.call(panes,function(p){p.hidden=+p.dataset.i!==n});
    var st=stageOf[n],done=n===7;
    document.querySelectorAll('.slab').forEach(function(l,k){l.innerHTML=(st===k+1&&!done&&n!==8)?'<strong>Step '+st+' of 3</strong><span>'+stages[st]+'</span>':''});
    document.querySelectorAll('.segs i b').forEach(function(b,k){
      var g=k+1,f=0;
      if(done||n>first[g]+count[g]-1&&n!==8)f=1;else if(n>=first[g]&&n!==8)f=Math.min(1,(n-first[g]+1)/count[g]);
      b.style.setProperty('--f',f);
    });
    $('strip').hidden=true;
    if(n===5)listing();
    $('wzFoot').hidden=n>=7;
    $('wzBack').textContent=n===0?'Not now':'Back';
    var nx=$('wzNext'),p=one('path');
    nx.textContent=n===0?'Get started':n===4?'Sharpen my estimate':n===5?'Continue':n===6?(p==='talk'?'Request a conversation':p==='email'?'Send my estimate':'Continue'):'Next';
    nx.classList.add('ink');
    wiz.classList.toggle('ov',n===0);
    $('wzMain').scrollTop=0;$('q'+n).focus();
  }
  function openWiz(){
    opener=document.activeElement;
    $('page').inert=true;wiz.hidden=false;document.body.classList.add('lock');
    $('az').value=$('az').value||zip.value;wlab();
    go(0);
  }
  function closeWiz(){
    wiz.hidden=true;$('page').inert=false;document.body.classList.remove('lock');
    if(opener&&opener.focus)opener.focus();
  }
  $('start').onclick=function(){s.plan='';openWiz()};
  function toEstimate(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});(s.lo?$('v2t'):zip).focus({preventScroll:true})}
  document.querySelectorAll('[data-plan]').forEach(function(b){
    b.onclick=function(){s.plan=b.dataset.plan;if(s.lo)openWiz();else toEstimate()};
  });
  $('closeBtn').onclick=function(){if(s.lo){s.plan='';openWiz()}else toEstimate()};$('wzExit').onclick=closeWiz;$('wzDone').onclick=closeWiz;
  $('wzBack').onclick=function(){if(cur===0)closeWiz();else go(cur===4?2:cur-1)};
  $('lstEdit').onclick=function(){go(1)};
  $('nfBack').onclick=function(){document.querySelectorAll('input[name="ptype"],input[name="ptype2"],input[name="space"]').forEach(function(i){i.checked=false});$('elseBox').hidden=true;go(1)};
  $('nfGo').onclick=function(){
    var v=$('nfEmail').value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){$('nfErr').textContent='Enter a valid email address, like you@example.com.';$('nfEmail').focus();return}
    $('nfErr').textContent='';$('nfForm').hidden=true;$('nfSent').hidden=false;
    $('nfSent').textContent='Thanks. We’ll email '+v+' if we start managing this kind of place.';
  };
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!wiz.hidden)closeWiz()});
  function addr(){return $('st').value.trim()+($('un').value.trim()?', '+$('un').value.trim():'')+', '+$('ci').value.trim()+', '+$('sa').value.trim().toUpperCase()+' '+$('az').value}
  function row(dl,k,v){var d=document.createElement('div'),a=document.createElement('dt'),b=document.createElement('dd');a.textContent=k;b.textContent=v;d.append(a,b);dl.append(d)}
  $('az').addEventListener('input',function(){this.value=this.value.replace(/\D/g,'').slice(0,5)});
  $('wzForm').addEventListener('submit',function(e){
    e.preventDefault();
    if(cur===1){
      var t=ptype();
      if(!t){$('tyErr').textContent=one('ptype')==='Something else'?'Choose the closest match.':'Choose the kind of place it is.';return}
      if(NOFIT.indexOf(t)>-1){go(8);return}
      if(!one('space')){$('tyErr').textContent='Choose what guests will have.';return}
      if(one('space')==='room'){go(8);return}
    }
    if(cur===2&&(!one('furn')||!one('rent'))){$('stErr').textContent=!one('furn')?'Choose whether it’s furnished.':'Choose whether it’s rented out right now.';return}
    if(cur===4){
      var bad=!$('st').value.trim()?'st':!$('ci').value.trim()?'ci':!/^[A-Za-z]{2}$/.test($('sa').value.trim())?'sa':!validZip($('az').value)?'az':'';
      if(bad){$('adErr').textContent='Enter your street address, city, 2-letter state, and 5-digit ZIP code.';$(bad).focus();return}
      $('adErr').textContent='';
      var h=0,str=$('st').value.toLowerCase();for(var i=0;i<str.length;i++)h+=str.charCodeAt(i);
      exact={f:1+((h%7)-3)/100,street:$('st').value.trim()};
    }
    if(cur===6){
      var p=one('path'),fn=$('fn').value.trim(),ln=$('ln').value.trim(),v=$('email').value.trim(),ph=$('ph').value.replace(/\D/g,'');
      var err='',foc='';
      if(!p)err='Choose how you’d like to continue.';
      else if(!fn){err='Enter your first name.';foc='fn'}
      else if(!ln){err='Enter your last name.';foc='ln'}
      else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){err='Enter a valid email address, like you@example.com.';foc='email'}
      else if((p==='talk'||ph)&&ph.length!==10){err='Enter a 10-digit phone number.';foc='ph'}
      else if(p==='talk'&&!one('via')){err='Choose call or text.'}
      else if(p==='talk'&&!one('when')){err='Choose a good time to reach you.'}
      if(err){$('ctErr').textContent=err;if(foc)$(foc).focus();return}
      $('ctErr').textContent='';
      var w=one('when').toLowerCase(),r=range();
      $('dn').textContent=p==='talk'?
        'Thanks, '+fn+'. An Evolve advisor will '+(one('via')==='Text me'?'text':'call')+' you '+(w==='as soon as possible'?'shortly':'in the '+w)+'. We also sent your estimate to '+v+'.':
        'Thanks, '+fn+'. Your estimate is on its way to '+v+'. We won’t call unless you ask us to.';
      var dl=$('recap');dl.textContent='';
      row(dl,'Estimate',money(r[0])+' to '+money(r[1])+' a year');
      if(s.plan)row(dl,'Plan',s.plan);
      row(dl,'Address',addr());
      row(dl,'Home',ptype()+', '+plural(s.beds,'bedroom','bedrooms')+', '+plural(s.baths,'bathroom','bathrooms'));
      row(dl,'Furnished',one('furn'));
      row(dl,'Rented out now',one('rent'));
          }
    go(cur===2?4:cur+1);
  });
  $('skip').addEventListener('click',function(e){e.preventDefault();var m=$('main');m.focus();m.scrollIntoView()});
  var mq=document.querySelector('#marq .mq'),cp=mq.cloneNode(true);cp.setAttribute('aria-hidden','true');cp.querySelectorAll('img').forEach(function(im){im.alt=''});$('marq').append(cp);
  var ts=document.querySelectorAll('.tslide'),td=document.querySelectorAll('#tDots button'),ti=0;
  function tgo(n){ti=(n+ts.length)%ts.length;ts.forEach(function(x,k){x.hidden=k!==ti});td.forEach(function(d,k){if(k===ti)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')})}
  $('tPrev').onclick=function(){tgo(ti-1)};$('tNext').onclick=function(){tgo(ti+1)};
  td.forEach(function(d,k){d.onclick=function(){tgo(k)}});
  lab();
})();
