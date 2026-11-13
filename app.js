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
    $('closeBtn').textContent='Get my exact estimate';
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
    $('res').innerHTML='<div class="big">'+money(s.lo)+'–'+money(s.hi)+'</div>';
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
  TI['Fully furnished']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><path d="M3 11.5a1.5 1.5 0 0 1 3 0V14h12v-2.5a1.5 1.5 0 0 1 3 0V18H3Z"/><path d="M5 18v2M19 18v2"/></svg>';
  TI['Partly furnished']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8l2 6H6Z"/><path d="M12 10v10"/><path d="M8 20h8"/></svg>';
  TI['Not yet']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-4 9 4v9l-9 4-9-4Z"/><path d="M3 8l9 4 9-4"/><path d="M12 12v9"/></svg>';
  TI['Not right now']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4M16 3v4"/></svg>';
  TI['Yes, short-term stays']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M3 13h18"/></svg>';
  TI['Yes, long-term tenants']='<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2"/></svg>';
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
  var stages=['','Your place','Your estimate','Your next step'];
  var stageOf=[0,1,1,1,2,2,3,3,1],first={1:1,2:4,3:6},count={1:2,2:2,3:1};
  var NOFIT=['Timeshare','RV or mobile home'];
  function CITY(z){var m={'80424':['Breckenridge','CO'],'81611':['Aspen','CO']};if(m[z])return m[z];if(/^80[23]/.test(z))return ['Denver','CO'];return null}
  var HOOD={'80206':'Congress Park, Denver','80218':'Cheesman Park, Denver','80202':'LoDo, Denver','80211':'Highlands, Denver','80205':'Five Points, Denver','80424':'Breckenridge','81611':'Aspen'};
  var TYPEW={'House':1,'Condo or apartment':.9,'Townhome':.95,'Cabin':1.1,'Guest suite or ADU':.75,'Tiny home':.7};
  var exact=null;
  function one(n){return picked(n)[0]||''}
  function ptype(){var t=one('ptype');return t==='Something else'?one('ptype2'):t}
  function hood(){var z=$('az').value||zip.value;return HOOD[z]||('ZIP '+z)}
  function range(){
    var w=TYPEW[ptype()]||1;
    if(exact){var lo=s.lo,hi=s.hi,a=Math.max(lo,r100(exact.f*s.rev*w*.92)),b=Math.min(hi,r100(exact.f*s.rev*w*1.08));return [a,b]}
    return [r100(s.lo*w),r100(s.hi*w)];
  }
  function strip(){
    var r=range();
    $('stripL').textContent=(exact?'Estimate for '+exact.street+':':'Rough estimate:')+' ';
    $('stripV').textContent=money(r[0])+' to '+money(r[1])+' a year';
  }
  function wlab(){if(!$('wbV'))return;$('wbV').textContent=s.beds;$('wtV').textContent=s.baths;$('wbV').setAttribute('aria-label',plural(s.beds,'bedroom','bedrooms'));$('wtV').setAttribute('aria-label',plural(s.baths,'bathroom','bathrooms'))}
  function wbump(k,d,min,max){s[k]=Math.min(max,Math.max(min,s[k]+d));lab();wlab();estimate();strip()}
  if($('wbM')){$('wbM').onclick=function(){wbump('beds',-1,1,10)};$('wbP').onclick=function(){wbump('beds',1,1,10)};
  $('wtM').onclick=function(){wbump('baths',-.5,1,8)};$('wtP').onclick=function(){wbump('baths',.5,1,8)};}
  document.querySelectorAll('input[name="ptype"],input[name="ptype2"],input[name="space"]').forEach(function(i){i.addEventListener('change',function(){$('tyErr').textContent='';$('elseBox').hidden=one('ptype')!=='Something else';strip()})});
  document.querySelectorAll('input[name="furn"],input[name="rent"]').forEach(function(i){i.addEventListener('change',function(){$('stErr').textContent=''})});
  document.querySelectorAll('input[name="path"]').forEach(function(i){i.addEventListener('change',function(){$('ctErr').textContent=''})});
  function typeShort(){var t=ptype();return {'House':'house','Condo or apartment':'condo','Townhome':'townhome','Cabin':'cabin','Guest suite or ADU':'guest suite','Tiny home':'tiny home'}[t]||'home'}
  var COMPS={'Denver':['Cottage near Cheesman Park','Classic home with a picket fence','Updated bungalow off Colfax'],'Breckenridge':['Ski-area condo near Main Street','Mountain home with a hot tub','Townhome by the gondola'],'Aspen':['Mountain home near downtown','Condo by the lifts','Townhome with mountain views']};
  var HOUSE_SVG='<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/></svg>';
  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var SEASON=[.55,.6,.72,.7,.88,1.2,1.35,1.28,1.0,.85,.62,.85]; /* illustrative Denver demand curve */
  var OCC=.62;
  function txt(el,t){el.textContent=t;return el}
  function mk(tag,cls,t){var e=document.createElement(tag);if(cls)e.className=cls;if(t!=null)e.textContent=t;return e}
  var COMPDATA={'Denver':[
      {img:'images/comp-cottage.jpg',pos:'50% 50%',area:'Congress Park',fun:'Flower boxes on a quiet street near Cheesman Park',bd:0,ba:0,rt:'4.92',rv:62},
      {img:'images/comp-picket-fence.jpg',pos:'50% 50%',area:'Cheesman Park',fun:'Picket fence, big trees, and a short walk to Colfax',bd:-1,ba:-1,rt:'4.87',rv:38}]};
  /* Turn a few words into a listing-style line. Short keyword input gets
     rewritten; anything longer is only tidied, so the owner's words stay theirs.
     In production this would be a language model, not a keyword list. */
  var POLISH=[[/\bski|slopes?\b/i,'close to the ski slopes'],[/\bdowntown|town|main st/i,'short walk to town'],[/\blake/i,'steps from the lake'],
    [/\bbeach|ocean|coast/i,'near the beach'],[/\bmountains?|views?\b/i,'mountain views'],[/\bhot ?tub|jacuzzi|spa\b/i,'hot tub'],
    [/\bfire ?place|wood ?stove/i,'cozy fireplace'],[/\bporch|deck|patio/i,'sunny porch'],[/\bfruit trees?/i,'fruit trees'],
    [/\byard|garden/i,'big yard'],[/\bbuilt in (\d{4})/i,'built in $1'],[/\bhistoric|victorian|old\b/i,'historic charm'],
    [/\bquiet|peaceful/i,'quiet street'],[/\bpool\b/i,'pool'],[/\bwalkable|walk\b/i,'walkable to everything'],
    [/\bupdated|remodel|renovat|modern/i,'freshly updated'],[/\bpets?|dogs?\b/i,'pet friendly'],[/\bpark\b/i,'near the park']];
  function polish(t){
    t=(t||'').replace(/\s+/g,' ').trim().replace(/[.]+$/,'');if(!t)return '';
    var cap=function(x){return x.charAt(0).toUpperCase()+x.slice(1)};
    if(/,/.test(t)||t.split(' ').length>=6)return cap(t);
    var hits=[];POLISH.forEach(function(p){var m=t.match(p[0]);if(m){var ph=p[1].replace('$1',m[1]||'');if(!hits.some(function(h){return h[1]===ph}))hits.push([m.index,ph])}});
    if(!hits.length)return cap(t);
    hits.sort(function(a,b){return a[0]-b[0]});var l=hits.map(function(x){return x[1]}).slice(0,3);
    return cap(l.length<3?l.join(', '):l[0]+', '+l[1]+', and '+l[2]);
  }
  var COVERS={Core:[['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2.5h6L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/></svg>','Professional photos','Plus a listing written for your home'],['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/></svg>','Listed on every major site','Airbnb, Vrbo, Booking.com, and more'],['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>','Damage protection','Up to $5,000, plus $1M liability insurance']],
    Plus:[['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/></svg>','A performance advisor','Reviews and tunes your listing'],['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17 10 11l4 4 6-7"/><path d="M15 8h5v5"/></svg>','More listing exposure','Higher placement where guests search'],['<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>','More damage protection','Up to $10,000, plus $1M liability insurance']]};
  function listing(){
    var r=range(),furn=one('furn'),h0=hood(),area=h0.split(',')[0],city=h0.indexOf(',')>-1?h0.split(', ')[1]:h0;
    var mid=(r[0]+r[1])/2,nights=Math.round(365*OCC),nightly=Math.round(mid/nights/5)*5;
    var plan=s.plan==='Plus'?'Plus':'Core',fee=plan==='Plus'?.15:.10;
    var rlo=s.lo,rhi=s.hi;
    var T=typeShort(),Tc=T.charAt(0).toUpperCase()+T.slice(1);
    txt($('earnSub'),s.beds+'-bedroom '+T+' at '+(exact?exact.street:h0));
    txt($('rvDelta'),'Narrowed from your first estimate of '+money(rlo)+' to '+money(rhi)+'.'+(furn==='Not yet'?' Assumes your place is furnished.':''));
    txt($('rvNight'),money(nightly));
    /* keep weeks for yourself: winter weeks cost less than summer ones */
    function kwUpdate(){
      var wk=+$('kw').value,cost=0;for(var i=0;i<wk;i++)cost+=i<8?.6:1.2;
      var f=Math.max(0,1-cost/52),a=r100(r[0]*f),b=r100(r[1]*f);
      $('rvEst').innerHTML='';$('rvEst').append(money(a)+'–'+money(b),mk('span',null,' / year'));
      var nn=nights*f,r5=function(v){return Math.round(v/5)*5};txt($('rvNights'),r5(nn*.93)+'–'+r5(nn*1.03));
      txt($('rvKeep'),money(r100(a*(1-fee)))+'–'+money(r100(b*(1-fee))));
      txt($('kwOut'),wk===0?'None':plural(wk,'week','weeks'));
      $('kw').setAttribute('aria-valuetext',plural(wk,'week','weeks')+', '+money(a)+' to '+money(b)+' a year');
      $('kw').style.setProperty('--p',(wk/12*100)+'%');
      s.keepWeeks=wk;
    }
    $('kw').oninput=kwUpdate;kwUpdate();
    function planSet(p){
      plan=p;fee=p==='Plus'?.15:.10;s.plan=p;
      txt($('rvCovT'),'What your '+Math.round(fee*100)+'% covers');
      txt($('rvKeepL'),'Amount you keep after '+p);
      document.querySelectorAll('.plantog button').forEach(function(bt){bt.setAttribute('aria-checked',bt.dataset.p===p?'true':'false')});
      var ul=$('rvCovList');ul.textContent='';
      COVERS[p].forEach(function(c){var li=document.createElement('li');li.innerHTML=c[0];li.append(mk('b',null,c[1]),mk('span',null,c[2]));ul.append(li)});
      kwUpdate();
    }
    document.querySelectorAll('.plantog button').forEach(function(bt){bt.onclick=function(){planSet(bt.dataset.p)}});
    planSet(plan);
    /* how you compare: the owner's place beside two Evolve homes */
    var cs=$('comps');cs.textContent='';
    txt($('compT'),'How your place compares near '+area);
    function card(cls,photo,title,right,fun,meta,price){
      var c=mk('li','comp'+(cls?' '+cls:''));c.append(photo);
      var bd=mk('div','cbd'),top=mk('div','ctop');top.append(mk('b','ct',title),right);
      bd.append(top);if(fun)bd.append(mk('span','cf',fun));bd.append(mk('span','cm',meta),mk('span','cp',price));
      c.append(bd);cs.append(c);
    }
    var mp=mk('div','cph'),mi=mk('img');mi.alt='';mi.src='images/story-stone-home.jpg';mp.append(mi);
    var yp=mk('div','yp');yp.innerHTML=HOUSE_SVG;yp.append(mk('span',null,'Your place'),mk('small',null,'Photos when you’re ready'));mp.append(yp);
    var d=polish($('desc').value);
    card('mine',mp,Tc+' in '+area,mk('span','ctag','Estimated'),d?d.charAt(0).toUpperCase()+d.slice(1):'',plural(s.beds,'bedroom','bedrooms')+' · '+plural(s.baths,'bath','baths'),'About '+money(nightly)+' a night');
    var list=COMPDATA[city]||[
      {img:'images/comp-cottage.jpg',pos:'50% 50%',area:area,fun:'Quiet street close to shops and parks',bd:0,ba:0,rt:'4.9',rv:54},
      {img:'images/comp-picket-fence.jpg',pos:'50% 50%',area:area,fun:'Big yard and room for the whole family',bd:-1,ba:-1,rt:'4.8',rv:31}];
    list.forEach(function(x){
      var b2=Math.max(1,s.beds+x.bd),b3=Math.max(1,s.baths+x.ba),nt=Math.round(mid*(b2/s.beds)/nights/5)*5;
      var p2=mk('div','cph'),im=mk('img');im.alt='';im.src=x.img;im.style.objectPosition=x.pos;p2.append(im);
      card('',p2,'House in '+x.area,mk('span','cr','★ '+x.rt+' ('+x.rv+')'),x.fun,plural(b2,'bedroom','bedrooms')+' · '+plural(b3,'bath','baths'),'About '+money(nt)+' a night');
    });
  }
  function go(n){
    cur=n;
    Array.prototype.forEach.call(panes,function(p){p.hidden=+p.dataset.i!==n});
    var st=stageOf[n],done=n===7;
    $('mlab').innerHTML=(st&&!done&&n!==8)?'<strong>Step '+st+' of 3</strong> · '+stages[st]:'';
    document.querySelectorAll('.slab').forEach(function(l,k){l.innerHTML=(st===k+1&&!done&&n!==8)?'<strong>Step '+st+' of 3</strong><span>'+stages[st]+'</span>':''});
    document.querySelectorAll('.segs i b').forEach(function(b,k){
      var g=k+1,f=0;
      if(done||n>first[g]+count[g]-1&&n!==8)f=1;else if(n>=first[g]&&n!==8)f=Math.min(1,(n-first[g]+1)/count[g]);
      b.style.setProperty('--f',f);
    });
    $('strip').hidden=true;
    if(n===5)listing();
    wiz.classList.toggle('wide',n===5);
    $('wzFoot').hidden=n===7;
    $('wzBack').textContent=n===8?'Change my answers':'Back';
    var nx=$('wzNext'),p=one('path');
    nx.textContent=n===0?'Get started':n===4?'See my exact estimate':n===5?'Continue':n===6?'Send my estimate':n===8?($('nfForm').hidden?'Back to Evolve':'Let me know if that changes'):'Next';
    nx.classList.add('ink');
    wiz.classList.toggle('ov',n===0);
    $('wzMain').scrollTop=0;$('q'+n).focus();
  }
  function openWiz(){
    opener=document.activeElement;
    $('page').inert=true;wiz.hidden=false;document.body.classList.add('lock');
    $('az').value=$('az').value||zip.value;wlab();
    var c=CITY(zip.value);if(c){if(!$('ci').value)$('ci').value=c[0];if(!$('sa').value)$('sa').value=c[1]}
    go(1);
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
  $('wzBack').onclick=function(){if(cur===8)nfBackFn();else if(cur<=1)closeWiz();else go(cur===4?2:cur-1)};
  $('lstEdit').onclick=function(){go(1)};
  var nfBackFn=function(){document.querySelectorAll('input[name="ptype"],input[name="ptype2"],input[name="space"]').forEach(function(i){i.checked=false});$('elseBox').hidden=true;go(1)};
  var nfGoFn=function(){
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
    if(cur===8){if($('nfForm').hidden){closeWiz();return}nfGoFn();if($('nfForm').hidden)$('wzNext').textContent='Back to Evolve';return}
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
      if(!fn){err='Enter your first name.';foc='fn'}
      else if(!ln){err='Enter your last name.';foc='ln'}
      else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){err='Enter a valid email address, like you@example.com.';foc='email'}
      else if(ph.length!==10){err='Enter a 10-digit phone number.';foc='ph'}
      else if(!p)err='Choose when you’d like to hear from us.';
      if(err){$('ctErr').textContent=err;if(foc)$(foc).focus();return}
      $('ctErr').textContent='';
      var r=range();
      $('q7').textContent='You’re all set, '+fn;
      $('dn').textContent='Your estimate is on its way to '+v+'.';
      $('dEst').textContent=$('rvEst').textContent.replace(' / year','')+' a year';
      $('dAddr').textContent=addr();
      var tg=$('dTags');tg.textContent='';
      $('dDesc').hidden=true;
      [ptype(),plural(s.beds,'bed','beds')+', '+plural(s.baths,'bath','baths'),one('furn'),one('rent')==='Not right now'?'Not rented yet':(function(x){return x.charAt(0).toUpperCase()+x.slice(1)})(one('rent').replace('Yes, ',''))].concat(s.keepWeeks?['Keeps '+plural(s.keepWeeks,'week','weeks')]:[]).concat(s.plan?[s.plan+' plan']:[]).forEach(function(t){var li=document.createElement('li');li.textContent=t;tg.append(li)});
      var ns=$('nextsteps');ns.textContent='';
      (p==='talk'?[
        ['Now','Your full estimate is in your inbox.'],
        ['Today','Your advisor emails to find a time for a call. They’ll already have your details.'],
        ['On the call','20 minutes on your estimate, fees, and timeline. No commitment.']
      ]:[
        ['Now','Your full estimate is in your inbox.'],
        ['Later this week','Your advisor checks in by email. They’ll already have your details.'],
        ['When you’re ready','Reply to set up a 20-minute call. No commitment.']
      ]).forEach(function(x){var li=document.createElement('li');var b=document.createElement('b');b.textContent=x[0];var sp=document.createElement('span');sp.textContent=x[1];li.append(b,sp);ns.append(li)});
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

/* footer links are placeholders */
document.querySelectorAll('footer.site a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault()})});

/* format phone numbers as (303) 555-0123 while typing */
(function(){var ph=document.getElementById('ph');if(!ph)return;ph.addEventListener('input',function(){
  var d=ph.value.replace(/\D/g,'').slice(0,10),o=d;
  if(d.length>6)o='('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);else if(d.length>3)o='('+d.slice(0,3)+') '+d.slice(3);else if(d.length===3)o='('+d+')';
  ph.value=o;});})();
