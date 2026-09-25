(function(){var m=document.getElementById('m'),y=document.getElementById('y');
function set(yr){m.setAttribute('aria-pressed',!yr);y.setAttribute('aria-pressed',yr);
document.querySelectorAll('[data-p]').forEach(function(e){var p=+e.dataset.p;e.textContent=yr?Math.round(p*0.8):p});}
m.onclick=function(){set(false)};y.onclick=function(){set(true)};})();
(function(){
var $=function(i){return document.getElementById(i)},F=function(n){return n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})};
var L={ok:'سليم',wr:'تنبيه',er:'مخالفة'};
var RI=[],S=null,CAL=[];
function row(l,t,s){RI.push([l,t,s]);return '<div class="r"><span class="tag '+l+'">'+L[l]+'</span><div>'+t+'<small>'+s+'</small></div></div>'}
function meter(sc){var c=sc>=85?'var(--em)':sc>=60?'var(--warn)':'var(--bad)',t=sc>=85?'جيد':sc>=60?'يحتاج مراجعة':'خطر مرتفع';
return '<div class="big">'+sc+' / 100 <small style="font:500 15px IBM Plex Sans Arabic">'+t+'</small></div><div class="meter"><i style="width:'+sc+'%;background:'+c+'"></i></div>'}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){var sc=b.closest('section');
sc.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-selected',x===b)});
sc.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('on',p.id==='p-'+b.dataset.t)});if(b.dataset.t==='bdg')bdg();if(b.dataset.t==='cmp'&&S!=null&&!$('cv').value)$('cv').value=S}});
function inv(){var v=$('vn').value.trim(),s=+$('sb').value,t=+$('vt').value,g=+$('tt').value,d=$('dt').value,h='',sc=100;
if(!s){$('io').innerHTML='<small>أدخل المبلغ قبل الضريبة على الأقل.</small>';return}
RI=[];function add(l,a,b,p){h+=row(l,a,b);sc-=p}
/^3\d{13}3$/.test(v)?add('ok','الرقم الضريبي بصيغة صحيحة','لا يُغني عن التحقق من تسجيله لدى الهيئة',0):add('er','الرقم الضريبي غير صالح','يجب أن يكون 15 رقمًا يبدأ بـ 3 وينتهي بـ 3',25);
var e=s*.15;Math.abs(e-t)>.05?add('er','مبلغ الضريبة لا يساوي 15% من المبلغ','المتوقع '+F(e)+' والمُدخل '+F(t)+'، والفرق '+F(Math.abs(e-t)),25):add('ok','الضريبة محسوبة بشكل صحيح','15% من '+F(s),0);
Math.abs(s+t-g)>.05?add('er','الإجمالي لا يساوي المبلغ مع الضريبة','المتوقع '+F(s+t)+' والمُدخل '+F(g),20):add('ok','الإجمالي متسق','',0);
$('qr').value==='n'?add('er','لا يوجد رمز QR','يشترط في الفاتورة الإلكترونية رمز مطابق لبياناتها',20):add('ok','رمز QR موجود','يُفحص تطابق محتواه عند الربط مع نظامك',0);
!d||new Date(d)>new Date()?add('wr','تاريخ الفاتورة مفقود أو مستقبلي','راجع تاريخ التوريد',10):add('ok','التاريخ سليم','',0);
sc=Math.max(sc,0);S=sc;$('io').innerHTML=meter(sc)+h+RB('فحص فاتورة')}
$('ib').onclick=inv;
$('ix').onclick=function(){$('vn').value='300123456700003';$('sb').value=1000;$('vt').value=140;$('tt').value=1140;$('qr').value='n';$('dt').value='2026-09-01';inv()};
$('zk').onclick=function(){var b=+$('zb').value,r=+$('zc').value;if(!b)return;
$('zo').innerHTML='<div class="big">'+F(b*r/100)+' ر.س</div><small>'+r+'% من '+F(b)+' ر.س. تُسدَّد خلال 120 يومًا من نهاية السنة المالية، وفق ما تعلنه الهيئة.</small>'};
$('wk').onclick=function(){var a=+$('wa').value,r=+$('wt').value;if(!a)return;
$('wo').innerHTML='<div class="big">'+F(a*r/100)+' ر.س</div><small>الضريبة بمعدل '+r+'%. الصافي المدفوع للجهة: '+F(a-a*r/100)+' ر.س. تُورَّد للهيئة خلال 10 أيام من نهاية الشهر.</small>'};
function ai(p,el){var o=document.createElement('div');o.className='ai';o.textContent='جارٍ التحليل...';el.appendChild(o);
if(!(window.claude&&claude.use)){o.textContent='التحليل بالذكاء الاصطناعي غير متاح في هذا العرض.';return}
claude.use('sample').then(function(s){if(!s){o.textContent='التحليل بالذكاء الاصطناعي غير متاح في هذا العرض.';return}
s(p,{onText:function(e){o.textContent=e.text}}).catch(function(e){if(e.code!=='cancelled')o.textContent='تعذّر التحليل الآن، حاول لاحقًا.'})})}
var R=[[/دون\s*إشعار|بدون\s*إشعار/,'er','إنهاء أو تعديل دون إشعار','يُنصح بإشعار كتابي مدته 30 يومًا'],
[/\d+\s*%\s*(يوميًا|في اليوم)/,'wr','غرامة يومية مرتفعة','ضع سقفًا إجماليًا للغرامة'],
[/تجديد\s*تلقائي/,'wr','تجديد تلقائي','حدّد مهلة لإشعار عدم التجديد'],
[/محكمة\s*(لندن|دبي|نيويورك)|القانون\s*(الإنجليزي|الأمريكي)/,'wr','قانون أو جهة قضائية أجنبية','راجع مختصًا قبل القبول'],
[/تنازل\s*(كامل|نهائي)|لا\s*يحق\s*للطرف\s*الثاني/,'wr','تنازل أو تقييد لحق طرف','راجع التوازن بين الطرفين']];
$('cx').onclick=function(){$('ct').value='يحق للطرف الأول إنهاء العقد في أي وقت دون إشعار، ويلتزم الطرف الثاني بغرامة تأخير 5% يوميًا من قيمة العقد. يتجدد العقد تجديدًا تلقائيًا.';$('cb').click()};
$('cb').onclick=function(){var t=$('ct').value.trim();if(!t){$('co').innerHTML='<small>الصق نص العقد أولًا.</small>';return}
var h='',n=0;RI=[];S=null;R.forEach(function(r){if(r[0].test(t)){h+=row(r[1],r[2],r[3]);n++}});
[[/سري(ة)?/,'لا يوجد بند سرية'],[/الاختصاص|التحكيم|المحكمة/,'لا يوجد بند للاختصاص القضائي أو التحكيم'],[/إنهاء|فسخ/,'لا يوجد بند للإنهاء']].forEach(function(m){if(!m[0].test(t)){h+=row('wr',m[1],'بند شائع يستحسن وجوده');n++}});
$('co').innerHTML=(n?h:row('ok','لم تُرصد ملاحظات في الفحص السريع',''))+RB('تدقيق عقد');ai('أنت مدقق عقود متخصص في الأنظمة السعودية. حلّل العقد التالي بالعربية بإيجاز (10 أسطر كحد أقصى): البنود الخطرة، ثم ما ينقص العقد، ثم صياغة بديلة لأخطر بند. اذكر النظام ذا الصلة فقط إن كنت متأكدًا، ولا تخترع أرقام مواد. اختم بأن هذا تحليل مساند وليس رأيًا قانونيًا.\n\nالعقد:\n'+t.slice(0,6000),$('co'))};

function RB(n){return '<button class="btn alt dl" style="color:var(--ink);margin-top:12px" data-r="'+n+'">حمّل تقرير للهيئة</button>'}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function dl(n,d,b){if(!(window.claude&&claude.use)){if(b)b.textContent='التنزيل غير متاح في هذا العرض';return}
claude.use('downloads').then(function(x){if(!x){if(b)b.textContent='التنزيل غير متاح في هذا العرض';return}x.save({filename:n,data:d}).catch(function(){})})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.dl');if(!b)return;
var h='<!DOCTYPE html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>تقرير ميزان</title><body style="font-family:Tahoma,sans-serif;max-width:760px;margin:32px auto;line-height:1.9"><h1>ميزان — تقرير '+esc(b.dataset.r)+'</h1><p>التاريخ: '+new Date().toLocaleDateString('ar-SA-u-ca-gregory-nu-latn')+'</p>'+(S!=null?'<h2>مؤشر ميزان: '+S+' / 100</h2>':'')+'<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%"><tr><th>الحالة</th><th>الملاحظة</th><th>التفصيل أو التصحيح</th></tr>'+RI.map(function(r){return '<tr><td>'+L[r[0]]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'}).join('')+'</table><p style="color:#666;font-size:13px">تقرير مساند مولّد آليًا، ولا يُغني عن مراجعة محاسب قانوني مرخّص.</p>';
dl('mizan-report.html',h,b)});
var MN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],FM=function(d){return d.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn',{day:'numeric',month:'long',year:'numeric'})};
try{var sv=JSON.parse(localStorage.getItem('mz'));if(sv){$('cf').value=sv[0];$('ce').value=sv[1];$('cw').checked=sv[2]}}catch(x){}
$('cc').onclick=function(){var f=$('cf').value,fe=+$('ce').value,w=$('cw').checked,n=new Date(),t0=new Date(n.getFullYear(),n.getMonth(),n.getDate()),E=[];
try{localStorage.setItem('mz',JSON.stringify([f,fe,w]))}catch(x){}
for(var y=t0.getFullYear()-1;y<=t0.getFullYear()+1;y++){for(var m=0;m<12;m++){
if(f==='m'||m%3===2)E.push([new Date(y,m+2,0),'إقرار القيمة المضافة لفترة '+MN[m]+' '+y]);
if(w)E.push([new Date(y,m+1,10),'توريد ضريبة الاستقطاع عن '+MN[m]+' '+y])}
var ye=new Date(y,fe,0);E.push([new Date(ye.getTime()+120*864e5),'إقرار الزكاة وضريبة الدخل للسنة المنتهية '+FM(ye)])}
CAL=E.filter(function(e){return e[0]>=t0}).sort(function(a,b){return a[0]-b[0]}).slice(0,8);
$('co2').innerHTML=CAL.map(function(e){var d=Math.round((e[0]-t0)/864e5),c=d<=7?'er':d<=21?'wr':'ok';return '<div class="r"><span class="tag '+c+'">'+(d?d+' يوم':'اليوم')+'</span><div>'+e[1]+'<small>'+FM(e[0])+'</small></div></div>'}).join('')+'<small>القواعد العامة: القيمة المضافة في آخر يوم من الشهر التالي للفترة، والاستقطاع قبل اليوم 10 من الشهر التالي، والزكاة خلال 120 يومًا من نهاية السنة. تحقق من أي تمديد تعلنه الهيئة.</small>'};
$('cke').onclick=function(){if(!CAL.length)$('cc').click();
dl('mizan-deadlines.csv','\ufeffSubject,Start Date,All Day Event\n'+CAL.map(function(e){return '"'+e[1]+'",'+(e[0].getMonth()+1)+'/'+e[0].getDate()+'/'+e[0].getFullYear()+',True'}).join('\n'),$('cke'))};
var RQ=['فواتيري إلكترونية ومتسلسلة ومطابقة لمتطلبات الفوترة','إقرارات القيمة المضافة مطابقة لدفاتري','أحتفظ بالمستندات المحاسبية 6 سنوات على الأقل','بيانات تسجيلي الضريبي وعنواني محدّثة','وعائي الزكوي مدعوم بقوائم مالية','أورّد ضريبة الاستقطاع في موعدها','عقودي الجوهرية مكتوبة وموقّعة','أجري مطابقة بنكية شهرية'];
$('rl').innerHTML=RQ.map(function(q,i){return '<label><input type="checkbox" data-i="'+i+'"><span>'+q+'</span></label>'}).join('');
$('rl').onchange=function(){var c=$('rl').querySelectorAll('input:checked').length,sc=Math.round(c/RQ.length*100);S=sc;RI=[];
var m=RQ.filter(function(q,i){return !$('rl').querySelector('[data-i="'+i+'"]').checked}).map(function(q){return row('wr',q,'غير مستوفى، عالجه قبل أي فحص')}).join('');
$('ro').innerHTML=meter(sc)+(m||row('ok','منشأتك جاهزة على هذه المحاور',''))+RB('جاهزية الفحص')};
var BM={'تجزئة':[71,12],'مقاولات':[64,14],'مطاعم وضيافة':[68,13],'خدمات مهنية':[76,10],'تجارة إلكترونية':[66,13]};
function erf(x){var t=1/(1+.3275911*Math.abs(x)),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return x>=0?y:-y}
$('cg').onclick=function(){var v=+$('cv').value,b=BM[$('cs').value];if(!v&&v!==0||$('cv').value==='')return;
var p=Math.round(50*(1+erf((v-b[0])/b[1]/Math.SQRT2))),pts='';
for(var x=0;x<=100;x+=2)pts+=(x?'L':'M')+(x*3)+' '+(90-80*Math.exp(-Math.pow((x-b[0])/b[1],2)/2))+' ';
$('cx3').innerHTML='<div class="big">تتفوق على '+p+'% من منشآت قطاعك</div><small>متوسط القطاع (توضيحي): '+b[0]+' من 100</small><svg viewBox="0 0 300 100" style="width:100%;margin-top:10px;direction:ltr" aria-hidden="true"><path d="'+pts+'" fill="none" stroke="var(--em)" stroke-width="2.5"/><line x1="'+(v*3)+'" x2="'+(v*3)+'" y1="4" y2="92" stroke="var(--gold)" stroke-width="3"/><line x1="0" x2="300" y1="92" y2="92" stroke="var(--line)"/></svg><small>الخط الذهبي موقعك، والمنحنى توزيع المنشآت.</small>'};
function bdgS(){var n=esc($('bn').value||'اسم منشأتك'),d=MN[new Date().getMonth()]+' '+new Date().getFullYear();
return '<svg xmlns="http://www.w3.org/2000/svg" direction="ltr" width="320" height="88" viewBox="0 0 320 88"><rect width="320" height="88" rx="14" fill="#0c2422"/><g transform="translate(10 10) scale(1.7)"><rect width="40" height="40" rx="11" fill="#0f6b4f"/><path d="M20 8v22M10 12.5h20M10 12.5l-4.5 9.5h9zM30 12.5L25.5 22h9zM14 32h12" stroke="#f0d48a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g><text x="308" y="34" text-anchor="end" font-family="Tahoma,sans-serif" font-size="20" font-weight="700" fill="#f0d48a">مدقّق بميزان</text><text x="308" y="56" text-anchor="end" font-family="Tahoma,sans-serif" font-size="15" fill="#eaf3f0">'+n+'</text><text x="308" y="76" text-anchor="end" font-family="Tahoma,sans-serif" font-size="12" fill="#9db5b0">'+(S!=null?'المؤشر '+S+' · ':'')+d+'</text></svg>'}
function bdg(){$('bp').innerHTML=bdgS()}
$('bu').onclick=bdg;$('bn').oninput=bdg;$('bd').onclick=function(){dl('mizan-badge.svg',bdgS(),$('bd'))};bdg();
$('qb').onclick=function(){var q=$('qt').value.trim();if(!q)return;$('qo').innerHTML='';
ai('أنت مساعد محاسبي وضريبي متخصص في الأنظمة السعودية (هيئة الزكاة والضريبة والجمارك، ضريبة القيمة المضافة، الزكاة، الاستقطاع، الفوترة الإلكترونية). أجب بالعربية بإيجاز ووضوح في 8 أسطر كحد أقصى، واذكر الجهة أو النظام المرجعي، وإن لم تكن متأكدًا فقل ذلك وانصح بمراجعة محاسب مرخّص أو الهيئة. لا تخترع أرقام مواد ولا نسبًا. السؤال: '+q.slice(0,1500),$('qo'))};
})();

/* ---- next inline script block ---- */

(function(){
var $=function(i){return document.getElementById(i)},esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var SV={
inv:{n:'تدقيق فاتورة ضريبية',f:'الرقم الضريبي، حساب 15%، الإجمالي، الفوترة الإلكترونية',h:'ارفع صورة الفاتورة أو ملفًا نصيًا بمحتواها.',p:'الرقم الضريبي (15 رقمًا يبدأ وينتهي بـ 3)، حساب ضريبة 15%، اتساق الإجمالي، التاريخ، بيانات الفوترة الإلكترونية ورمز QR، نوع الفاتورة، احتمال التكرار.',s:'فاتورة ضريبية رقم 2047\nالتاريخ: 2026-09-01\nالبائع: شركة النور للتجارة، الرقم الضريبي: 300123456700003\nالمشتري: مؤسسة الأفق، الرقم الضريبي: 310987654300003\nالبند: أجهزة مكتبية × 10 بسعر 100 ر.س\nالإجمالي قبل الضريبة: 1000 ر.س\nضريبة القيمة المضافة 15%: 140 ر.س\nالإجمالي: 1140 ر.س\nلا يوجد رمز QR.'},
vat:{n:'مطابقة القيمة المضافة',f:'كشف الفواتير: ضريبة غير قابلة للخصم، أرقام ناقصة، تكرار',h:'ارفع كشف المبيعات أو المشتريات بصيغة CSV أو صورة منه.',p:'فواتير بلا رقم ضريبي للمورد، تكرار الفواتير، ضريبة مدخلات غير قابلة للخصم (ضيافة وترفيه ومصاريف شخصية)، اتساق نسبة 15%، ملاحظات على المبيعات.',s:'رقم الفاتورة,التاريخ,المورد,الرقم الضريبي,المبلغ,الضريبة,النوع\n101,2026-08-03,شركة أ,300111111100003,2000,300,مشتريات\n102,2026-08-05,شركة ب,,5000,750,مشتريات\n103,2026-08-05,شركة ب,,5000,750,مشتريات\n104,2026-08-12,مطعم الضيافة,300222222200003,1200,180,ضيافة شخصية\n105,2026-08-20,عميل ج,300333333300003,10000,1000,مبيعات'},
zak:{n:'القوائم المالية والزكاة',f:'تقدير الوعاء الزكوي وبنود التسوية',h:'ارفع قائمة المركز المالي وقائمة الدخل (نص أو صورة).',p:'تقدير الوعاء الزكوي التقريبي، البنود الواجب إضافتها أو حسمها (قروض الشركاء، المخصصات، الأصول الثابتة)، ملاحظات قد تُرفض عند الفحص، وتقدير الزكاة بنسبة 2.5% مع التنبيه أنه تقدير.',s:'قائمة المركز المالي في 31-12-2025 (ر.س)\nرأس المال: 500000\nأرباح مبقاة: 120000\nقرض من شريك: 200000\nمخصص نهاية الخدمة: 40000\nأصول ثابتة صافية: 380000\nمخزون: 210000\nذمم مدينة: 150000\nنقد: 90000\nصافي الربح للسنة: 95000'},
led:{n:'الدفاتر وقيود اليومية',f:'التكرار، القيود غير المتوازنة، الشذوذ',h:'ارفع دفتر اليومية أو كشف الحساب بصيغة CSV أو صورة.',p:'قيود مكررة، مبالغ مدورة أو مقسمة لتفادي حد معين، قيود بعد نهاية الفترة، عدم توازن المدين والدائن، حسابات غير معتادة، تسويات كبيرة بلا بيان.',s:'التاريخ,البيان,مدين,دائن\n2026-08-01,مبيعات,0,15000\n2026-08-01,صندوق,15000,0\n2026-08-15,مصاريف متنوعة,9900,0\n2026-08-15,مصاريف متنوعة,9900,0\n2026-08-30,تسوية,7000,0\n2026-09-05,مبيعات أغسطس,0,4000'},
con:{n:'تدقيق عقد',f:'البنود الخطرة والناقصة ومقارنتها بالأنظمة السعودية',h:'ارفع صورة العقد أو ملفًا نصيًا بنصه.',p:'البنود الخطرة أو غير المتوازنة، البنود الناقصة (الإنهاء، السرية، الاختصاص القضائي، الغرامات)، مطابقة الأحكام للأنظمة السعودية ذات الصلة، وصياغة بديلة لأخطر بند في حقل fix.',s:'يحق للطرف الأول إنهاء العقد في أي وقت دون إشعار، ويلتزم الطرف الثاني بغرامة تأخير 5% يوميًا من قيمة العقد، ويتجدد العقد تلقائيًا، ويكون الاختصاص لمحاكم دولة أجنبية.'}};
var cur=null,FILES=[],LAST=null,busy=false,TX=/\.(csv|tsv|txt|json|md|xml)$/i;
$('svcs').innerHTML=Object.keys(SV).map(function(k){return '<button class="svc-t" role="radio" aria-checked="false" data-k="'+k+'"><b>'+SV[k].n+'</b><span>'+SV[k].f+'</span></button>'}).join('');
$('svcs').onclick=function(e){var b=e.target.closest('.svc-t');if(!b)return;cur=b.dataset.k;
document.querySelectorAll('.svc-t').forEach(function(x){x.setAttribute('aria-checked',x===b)});
$('ut').textContent=SV[cur].n;$('uh').textContent=SV[cur].h;$('pg').textContent='';FILES=[];draw();$('up').classList.add('on');$('up').scrollIntoView({behavior:'smooth',block:'nearest'})};
function draw(){$('ch').innerHTML=FILES.map(function(f,i){return '<span class="chip">'+esc(f.name)+' <button aria-label="حذف" data-i="'+i+'">×</button></span>'}).join('')}
$('ch').onclick=function(e){var b=e.target.closest('button');if(b){FILES.splice(+b.dataset.i,1);draw()}};
function add(l){for(var i=0;i<l.length&&FILES.length<8;i++)FILES.push(l[i]);draw()}
$('fi').onchange=function(){add(this.files);this.value=''};
['dragover','dragenter'].forEach(function(t){$('dz').addEventListener(t,function(e){e.preventDefault();$('dz').classList.add('hov')})});
['dragleave','drop'].forEach(function(t){$('dz').addEventListener(t,function(e){e.preventDefault();$('dz').classList.remove('hov');if(t==='drop')add(e.dataTransfer.files)})});
$('dm').onclick=function(){if(!cur){$('pg').textContent='اختر الخدمة أولًا.';return}FILES=[new File([SV[cur].s],'مثال-'+cur+'.txt',{type:'text/plain'})];draw()};
var LIBS={pdf:['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js','https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'],xls:['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'],zip:['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js']},LP={};
function load(k){return LP[k]||(LP[k]=Promise.all(LIBS[k].map(function(u){return new Promise(function(res,rej){var e=document.createElement('script');e.src=u;e.onload=res;e.onerror=function(){rej(new Error('تعذّر تحميل أداة قراءة هذا النوع من الملفات. تحقق من اتصالك بالإنترنت وأعد المحاولة.'))};document.head.appendChild(e)})})).catch(function(e){delete LP[k];throw e}))}
function xd(x){return x.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&')}
function toB(cv){return new Promise(function(r){cv.toBlob(r,'image/jpeg',.85)})}
async function img(f,ok){if(ok.indexOf(f.type)>-1)return f;var bm;try{bm=await createImageBitmap(f)}catch(e){throw new Error('تعذّرت قراءة الصورة '+f.name+'. حوّلها إلى JPG أو PNG.')}
var cv=document.createElement('canvas');cv.width=bm.width;cv.height=bm.height;var g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.drawImage(bm,0,0);return toB(cv)}
async function extract(f,room,imRoom,ok){var n=f.name,ext=(n.split('.').pop()||'').toLowerCase(),t='',im=[],c=false;
function put(x){if(room<=0){c=true;return}if(x.length>room){x=x.slice(0,room);c=true}room-=x.length;t+='--- '+n+' ---\n'+x+'\n'}
if(/^image\//.test(f.type)||/^(png|jpe?g|webp|gif|bmp|heic|svg)$/.test(ext)){if(imRoom<1)throw new Error('رفع الصور غير متاح في هذا العرض أو تجاوزت الحد الأقصى للصور.');im.push(await img(f,ok))}
else if(ext==='pdf'){await load('pdf');pdfjsLib.GlobalWorkerOptions.workerSrc=LIBS.pdf[1];
var doc=await pdfjsLib.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise,x='',p,pg;
for(p=1;p<=doc.numPages&&x.length<room+500;p++){pg=await doc.getPage(p);var tc=await pg.getTextContent();x+='[صفحة '+p+']\n'+tc.items.map(function(i){return i.str}).join(' ')+'\n'}
if(x.replace(/\[صفحة \d+\]|\s/g,'').length>=40*Math.min(doc.numPages,3))put(x);
else{if(imRoom<1)throw new Error('الملف '+n+' ممسوح ضوئيًا، ورفع الصور غير متاح في هذا العرض.');
var lm=Math.min(doc.numPages,imRoom);for(p=1;p<=lm;p++){pg=await doc.getPage(p);var vp=pg.getViewport({scale:1.6}),cv=document.createElement('canvas');cv.width=vp.width;cv.height=vp.height;await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;im.push(await toB(cv))}
if(doc.numPages>lm)c=true}}
else if(/^(xlsx|xlsm|xlsb|xls|ods)$/.test(ext)){await load('xls');var wb=XLSX.read(new Uint8Array(await f.arrayBuffer()),{type:'array'});put(wb.SheetNames.map(function(sn){return '## '+sn+'\n'+XLSX.utils.sheet_to_csv(wb.Sheets[sn])}).join('\n'))}
else if(ext==='docx'||ext==='pptx'){await load('zip');var z=await JSZip.loadAsync(await f.arrayBuffer()),y='';
if(ext==='docx'){var d=z.file('word/document.xml');if(!d)throw new Error('الملف '+n+' غير صالح.');y=xd((await d.async('string')).replace(/<\/w:p>/g,'\n').replace(/<\/w:tc>/g,' | ').replace(/<w:tab\/>/g,'\t').replace(/<[^>]+>/g,''))}
else{Object.keys(z.files).filter(function(k){return /^ppt\/slides\/slide\d+\.xml$/.test(k)}).sort(function(a,b){return parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0])}).forEach(function(k,i){y+='[شريحة '+(i+1)+']\n'});
var ks=Object.keys(z.files).filter(function(k){return /^ppt\/slides\/slide\d+\.xml$/.test(k)}).sort(function(a,b){return parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0])});y='';
for(var i=0;i<ks.length;i++){var sx=await z.file(ks[i]).async('string');y+='[شريحة '+(i+1)+']\n'+xd((sx.match(/<a:t>[^<]*<\/a:t>/g)||[]).map(function(q){return q.replace(/<[^>]+>/g,'')}).join(' '))+'\n'}}
put(y)}
else if(/^(doc|ppt)$/.test(ext))throw new Error('صيغة .'+ext+' القديمة غير مدعومة. احفظ الملف بصيغة docx أو pptx أو PDF.');
else if(/^(html?|xhtml)$/.test(ext)){put(new DOMParser().parseFromString(await f.text(),'text/html').body.textContent||'')}
else if(ext==='rtf'){put((await f.text()).replace(/\\'[0-9a-f]{2}/gi,'').replace(/\\[a-z]+-?\d* ?/gi,' ').replace(/[{}]/g,''))}
else{var w=await f.text();if(/[\u0000-\u0008]/.test(w.slice(0,2000)))throw new Error('صيغة الملف '+n+' غير مدعومة. استخدم PDF أو Word أو Excel أو صورة أو CSV.');put(w)}
return{t:t,i:im,c:c}}
var steps=['قراءة الملفات','تطبيق قواعد الأنظمة السعودية','كشف المخالفات وصياغة التصحيحات','إعداد التقرير'];
$('go').onclick=async function(){
if(busy)return;var m=function(t){$('pg').textContent=t};
if(!cur){m('اختر الخدمة أولًا.');return}if(!FILES.length){m('ارفع ملفًا واحدًا على الأقل، أو جرّب ملفًا تجريبيًا.');return}
var s=null;try{s=window.claude&&await claude.use('sample')}catch(x){}
if(!s){m('التدقيق بالذكاء الاصطناعي يعمل عند فتح الصفحة داخل claude.ai.');return}
var lim=null;try{lim=await s.limits()}catch(x){}
var imgs=[],txt='',cut=false,maxI=lim&&lim.images?lim.images.maxCount:0,okT=lim&&lim.images?lim.images.mediaTypes:[],cf='';
try{for(var i=0;i<FILES.length;i++){cf=FILES[i].name;m('قراءة '+cf+'...');var r=await extract(FILES[i],24000-txt.length,maxI-imgs.length,okT);txt+=r.t;imgs=imgs.concat(r.i);cut=cut||r.c}}
catch(e){m(e&&/[\u0600-\u06FF]/.test(e.message||'')?e.message:'تعذّرت قراءة الملف '+cf+'. قد يكون محميًا بكلمة مرور أو تالفًا.');return}
if(!txt&&!imgs.length){m('لم أستطع استخراج محتوى من الملفات.');return}
var q='أنت مدقق محاسبي وضريبي ومستشار امتثال متخصص في الأنظمة السعودية (هيئة الزكاة والضريبة والجمارك، نظام ضريبة القيمة المضافة، الزكاة، الفوترة الإلكترونية، نظام الشركات، نظام العمل، نظام المعاملات المدنية).\nالمهمة: '+SV[cur].n+'.\nافحص: '+SV[cur].p+'\n'+(imgs.length?'الصور المرفقة هي المستندات.\n':'')+($('nt').value.trim()?'ملاحظات العميل: '+$('nt').value.trim().slice(0,800)+'\n':'')+(txt?'محتوى الملفات:\n'+txt:'')+(cut?'\n(اقتُطع الملف لطوله، ونبّه إلى ذلك في missing)\n':'')+'\nقواعد: لا تخترع أرقام مواد أو نسبًا أو أرقامًا غير موجودة في المستند. اذكر المرجع النظامي بالاسم فقط إن كنت متأكدًا، وإلا اتركه فارغًا. إن كان المستند غير كافٍ أو غير مقروء فاذكر ذلك في missing. أعد JSON فقط بلا أي نص آخر، بهذا الشكل: {"verdict":"جملة قصيرة","score":0,"summary":"3 جمل كحد أقصى","metrics":[{"label":"","value":""}],"findings":[{"level":"ok|warn|bad","title":"","detail":"","reference":"","fix":""}],"steps":["إجراء مقترح"],"missing":["معلومة تنقص"]}. score مؤشر امتثال من 100 ينقص بزيادة المخالفات. كل النصوص بالعربية وفي metrics من 3 إلى 4 أرقام مفيدة.';
busy=true;$('go').disabled=true;var n=0;m(steps[0]+'...');var tm=setInterval(function(){n=Math.min(n+1,3);m(steps[n]+'...')},5000);
try{var o=imgs.length?{images:imgs}:{};var d=await s.json(q,o);
d=norm(d);LAST=report(d,cur);window.mzAdd&&mzAdd({id:LAST.id,k:SV[cur].n,sc:d.sc,t:Date.now()});$('rf').srcdoc=LAST.h;$('rv').classList.add('on');document.body.style.overflow='hidden';m('اكتمل التدقيق. يمكنك إعادة فتح التقرير بالضغط على «ابدأ التدقيق».')}
catch(e){m(e&&e.code==='rate_limited'?'الطلبات كثيرة الآن، حاول بعد قليل.':e&&e.code==='not_granted'?'لم تُمنح صلاحية الذكاء الاصطناعي.':'تعذّر إتمام التدقيق. جرّب ملفًا أوضح أو أقل حجمًا.')}
finally{clearInterval(tm);busy=false;$('go').disabled=false}};
function norm(d){d=d||{};var F=(d.findings||[]).map(function(f){var l=/^(ok|warn|bad)$/.test(f.level)?f.level:'warn';return{l:l,t:f.title,d:f.detail,r:f.reference,x:f.fix}});
var w={bad:0,warn:1,ok:2};F.sort(function(a,b){return w[a.l]-w[b.l]});
var sc=Math.max(0,Math.min(100,Math.round(+d.score||0)));return{v:d.verdict||'',sc:sc,sm:d.summary||'',m:(d.metrics||[]).slice(0,4),F:F,st:d.steps||[],ms:d.missing||[]}}
var LB={ok:'سليم',warn:'تنبيه',bad:'مخالفة'},CL={ok:'#0f6b4f',warn:'#c2410c',bad:'#b42318'};
function report(d,k){var dt=new Date(),id='MZ-'+dt.getFullYear()+String(dt.getMonth()+1).padStart(2,'0')+String(dt.getDate()).padStart(2,'0')+'-'+Math.floor(1000+Math.random()*9000),
names=FILES.map(function(f){return esc(f.name)}).join('، '),c=d.sc>=85?CL.ok:d.sc>=60?CL.warn:CL.bad,C=2*Math.PI*54,cn={bad:0,warn:0,ok:0};d.F.forEach(function(f){cn[f.l]++});
var h='<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تقرير '+id+'</title><link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@600;800&family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap" rel="stylesheet"><style>@page{size:A4;margin:12mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{margin:0;background:#fff;color:#0c1f1d;font:400 14px/1.9 "IBM Plex Sans Arabic",Tahoma,sans-serif}.sh{padding:22px 26px}h1,h2,h3{font-family:"Noto Kufi Arabic","IBM Plex Sans Arabic",Tahoma,sans-serif;margin:0;line-height:1.5}.top{display:flex;justify-content:space-between;align-items:center;background:#0c2422;color:#eaf3f0;margin:-22px -26px 20px;padding:16px 26px}.br{display:flex;align-items:center;gap:10px}.br b{font:800 22px "Noto Kufi Arabic",sans-serif}.br small{display:block;color:#9db5b0;font-size:12px;line-height:1.4}.mt{text-align:left;font-size:12.5px;color:#b9cfca;direction:ltr}h1{font-size:24px;font-weight:800}.fl{color:#4d625f;font-size:13px;margin:4px 0 16px}.hero{display:flex;gap:24px;align-items:center;border:2px solid #0c1f1d;border-radius:14px;padding:18px;margin-bottom:16px;position:relative}.g{position:relative;width:132px;height:132px;flex:none}.g b{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:800 34px "Noto Kufi Arabic",sans-serif;line-height:1.1}.g small{font:400 12px "IBM Plex Sans Arabic";color:#4d625f}.vd{font:800 20px "Noto Kufi Arabic",sans-serif;margin-bottom:6px}.st{position:absolute;left:14px;top:12px;border:3px double '+c+';color:'+c+';border-radius:8px;padding:0 12px;font:800 15px "Noto Kufi Arabic";transform:rotate(-8deg)}.k{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:6px}.k div{background:#f3f6f4;border-radius:10px;padding:10px 12px}.k b{display:block;font:800 18px "Noto Kufi Arabic"}.k span{font-size:12.5px;color:#4d625f}.cn{display:flex;gap:16px;margin:14px 0 4px;font-weight:600}h2{font-size:17px;margin:20px 0 8px;padding-bottom:4px;border-bottom:2px solid #0c1f1d}.f{border-inline-start:6px solid;padding:8px 14px;margin:0 0 10px;background:#fafbfa;break-inside:avoid}.f h3{font-size:15px}.tg{float:left;color:#fff;font-size:11.5px;font-weight:600;padding:0 10px;border-radius:99px}.f p{margin:2px 0}.rf{color:#4d625f;font-size:12.5px}.ck{list-style:none;padding:0;margin:0}.ck li{padding:4px 0 4px 0;break-inside:avoid}.ck li:before{content:"";display:inline-block;width:13px;height:13px;border:1.5px solid #0c1f1d;margin-inline-end:10px;vertical-align:-2px}.ft{margin-top:26px;border-top:1px dashed #9db5b0;padding-top:12px;font-size:12px;color:#4d625f}.sg{display:flex;gap:40px;margin-top:22px;color:#0c1f1d;font-size:13px}.sg span{flex:1;border-top:1px solid #0c1f1d;padding-top:4px}@media(max-width:600px){.hero{flex-direction:column}.k{grid-template-columns:1fr 1fr}.st{position:static;display:inline-block;transform:none}}</style></head><body><div class="sh">'
+'<div class="top"><div class="br"><svg width="38" height="38" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="#0f6b4f"/><path d="M20 8v22M10 12.5h20M10 12.5l-4.5 9.5h9zM30 12.5L25.5 22h9zM14 32h12" stroke="#f0d48a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><div><b>ميزان</b><small>تدقيق ذكي وفق الأنظمة السعودية</small></div></div><div class="mt">'+id+'<br>'+dt.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn')+'</div></div>'
+'<h1>تقرير '+esc(SV[k].n)+'</h1><div class="fl">الملفات المدققة: '+names+'</div>'
+'<div class="hero"><div class="g"><svg width="132" height="132" viewBox="0 0 132 132"><circle cx="66" cy="66" r="54" fill="none" stroke="#dde5e2" stroke-width="12"/><circle cx="66" cy="66" r="54" fill="none" stroke="'+c+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+(C*d.sc/100)+' '+C+'" transform="rotate(-90 66 66)"/></svg><b>'+d.sc+'<small>من 100</small></b></div><div><div class="vd">'+esc(d.v)+'</div><div>'+esc(d.sm)+'</div></div><div class="st">'+(d.sc>=85?'جيد':d.sc>=60?'يحتاج مراجعة':'خطر مرتفع')+'</div></div>'
+(d.m.length?'<div class="k">'+d.m.map(function(x){return '<div><b>'+esc(x.value)+'</b><span>'+esc(x.label)+'</span></div>'}).join('')+'</div>':'')
+'<div class="cn"><span style="color:'+CL.bad+'">مخالفات: '+cn.bad+'</span><span style="color:'+CL.warn+'">تنبيهات: '+cn.warn+'</span><span style="color:'+CL.ok+'">سليم: '+cn.ok+'</span></div><h2>الملاحظات</h2>'
+(d.F.length?d.F.map(function(f){return '<div class="f" style="border-color:'+CL[f.l]+'"><span class="tg" style="background:'+CL[f.l]+'">'+LB[f.l]+'</span><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p>'+(f.r?'<p class="rf">المرجع: '+esc(f.r)+'</p>':'')+(f.x?'<p><b>التصحيح:</b> '+esc(f.x)+'</p>':'')+'</div>'}).join(''):'<p>لم تُرصد ملاحظات.</p>')
+(d.st.length?'<h2>خطوات التصحيح المقترحة</h2><ul class="ck">'+d.st.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')
+(d.ms.length?'<h2>ما ينقص هذا التدقيق</h2><ul class="ck">'+d.ms.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')
+'<div class="sg"><span>مراجعة المحاسب القانوني المرخّص</span><span>التوقيع</span><span>التاريخ</span></div><div class="ft">هذا التقرير مولّد آليًا بالذكاء الاصطناعي بناءً على الملفات المرفوعة فقط، وهو أداة مساندة لا تُغني عن مراجعة محاسب قانوني أو مستشار قانوني مرخّص، ولا يُعد رأيًا مهنيًا أو ضمانًا لقبول الهيئة.</div></div></html>';
return{h:h,id:id}}
$('rp').onclick=function(){try{$('rf').contentWindow.focus();$('rf').contentWindow.print()}catch(e){$('rp').textContent='الطباعة غير متاحة هنا، استخدم «حفظ كملف»'}};
$('rs').onclick=function(){var b=$('rs');if(!(window.claude&&claude.use)){b.textContent='الحفظ غير متاح هنا';return}
claude.use('downloads').then(function(x){if(!x){b.textContent='الحفظ غير متاح هنا';return}x.save({filename:'mizan-'+LAST.id+'.html',data:LAST.h}).catch(function(){})})};
$('rc').onclick=function(){$('rv').classList.remove('on');document.body.style.overflow=''};
document.addEventListener('keydown',function(e){if(e.key==='Escape')$('rc').click()});
})();

/* ---- next inline script block ---- */

(function(){
var $=function(i){return document.getElementById(i)},esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function get(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var P=get('mzp',null),ty='فرد',PEND=null,OTP=null,TM=null,S2=get('mzs',null);
function setTy(v){ty=v;document.querySelectorAll('#ty button').forEach(function(b){b.setAttribute('aria-checked',b.dataset.v===v)})}
function openReg(v){setTy(v||ty);$('rerr').textContent='';$('rg').classList.add('on');document.body.style.overflow='hidden'}
function closeReg(){clearInterval(TM);OTP=null;$('rf2').style.display='';$('ro2').style.display='none';$('rg').classList.remove('on');document.body.style.overflow=''}
$('ty').onclick=function(e){var b=e.target.closest('button');if(b)setTy(b.dataset.v)};
$('rgx').onclick=closeReg;
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&$('rg').classList.contains('on'))closeReg()});
document.addEventListener('click',function(e){var a=e.target.closest('[data-reg]');if(!a)return;e.preventDefault();
if(P){show(true)}else openReg(a.dataset.reg||null)});
$('rf2').onsubmit=function(e){e.preventDefault();var n=$('rn').value.trim(),m=$('re').value.trim(),ph=$('rp2').value.replace(/\D/g,''),k=$('rk').value,er='';
if(n.length<3)er='اكتب اسمك الكامل.';
else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m))er='اكتب بريدًا إلكترونيًا صحيحًا.';
else if(k==='+966'?!/^5\d{8}$/.test(ph):ph.length<7)er=k==='+966'?'رقم الجوال السعودي 9 أرقام ويبدأ بـ 5.':'اكتب رقم جوال صحيحًا.';
else if(!$('rt').checked)er='يلزم الموافقة على الشروط والأحكام وسياسة الخصوصية.';
$('rerr').textContent=er;if(er)return;
PEND={n:n,c:$('rc2').value.trim(),e:m,ph:k+ph,ty:ty,sec:$('rs2').value,t0:Date.now()};startOtp()};
window.mzAdd=function(r){var h=get('mzr',[]);h.unshift(r);put('mzr',h.slice(0,20));if(P)render()};
function show(go){if(!P)return;$('me').style.display='block';var b=$('hb');b.textContent='حسابي';b.setAttribute('href','#me');render();if(go)$('me').scrollIntoView({behavior:'smooth'})}
function render(){var h=get('mzr',[]),left=Math.max(0,14-Math.floor((Date.now()-P.t0)/864e5));
$('mh').textContent='مرحبًا '+P.n.split(' ')[0];$('ms').textContent=(P.c?P.c+' · ':'')+'حساب '+P.ty+' · قطاع '+P.sec;
if(S2){$('m1').textContent='نشط';$('m1l').textContent='اشتراك '+S2.p+' ('+(S2.cy==='y'?'سنوي':'شهري')+') يتجدد '+new Date(S2.r).toLocaleDateString('ar-SA-u-ca-gregory-nu-latn')}else{$('m1').textContent=left;$('m1l').textContent='أيام التجربة المتبقية'}$('mu').style.display=S2?'none':'inline-block';$('m2').textContent=h.length;$('m3').textContent=h.length?h[0].sc:'—';
var st=[[h.length>0,'أجرِ أول تدقيق','اختر خدمة وارفع ملفًا أو استخدم الملف التجريبي.'],[h.some(function(x){return /عقد/.test(x.k)}),'دقّق عقدًا','ارفع عقدًا لتعرف بنوده الخطرة.'],[!!get('mz',null),'اضبط تقويم الامتثال','أدخل دورة إقرارك ونهاية سنتك المالية في «لوحة منشأتك».']];
$('mt').innerHTML=st.map(function(x){return '<li><b>'+(x[0]?'✓ ':'○ ')+x[1]+'</b><span>'+x[2]+'</span></li>'}).join('');
$('mr').innerHTML=h.length?h.slice(0,6).map(function(r){var c=r.sc>=85?'ok':r.sc>=60?'wr':'er';return '<div class="r"><span class="tag '+c+'">'+r.sc+'</span><div>'+esc(r.k)+'<small>'+new Date(r.t).toLocaleDateString('ar-SA-u-ca-gregory-nu-latn')+' · '+esc(r.id)+'</small></div></div>'}).join(''):'<small>لا توجد تقارير بعد. ستظهر هنا بعد أول تدقيق.</small>'}
$('mo').onclick=function(){try{localStorage.removeItem('mzp');localStorage.removeItem('mzr');localStorage.removeItem('mzs');S2=null}catch(e){}P=null;$('me').style.display='none';$('hb').textContent='ابدأ تجربة مجانية';window.scrollTo({top:0,behavior:'smooth'})};
function startOtp(){OTP={c:String(Math.floor(1e5+Math.random()*9e5)),x:Date.now()+3e5,n:0,w:Date.now()+3e4};
$('rf2').style.display='none';$('ro2').style.display='block';$('oph').textContent=PEND.ph.slice(0,-7)+'•••••'+PEND.ph.slice(-2);$('odc').textContent=OTP.c;$('oi').value='';$('oer').textContent='';$('oi').focus();tick();clearInterval(TM);TM=setInterval(tick,1000)}
function tick(){if(!OTP)return;var s=Math.max(0,Math.ceil((OTP.w-Date.now())/1000));$('ors').disabled=s>0;$('ors').textContent=s>0?'إعادة الإرسال بعد '+s+' ثانية':'إعادة إرسال الرمز';if(!s)clearInterval(TM)}
$('ors').onclick=startOtp;
$('oed').onclick=function(){clearInterval(TM);OTP=null;$('ro2').style.display='none';$('rf2').style.display=''};
$('ov').onclick=function(){if(!OTP)return;var v=$('oi').value.replace(/\D/g,''),e=$('oer');
if(Date.now()>OTP.x){e.textContent='انتهت صلاحية الرمز. اطلب رمزًا جديدًا.';return}
if(OTP.n>=5){e.textContent='تجاوزت عدد المحاولات. اطلب رمزًا جديدًا.';return}
if(v!==OTP.c){OTP.n++;e.textContent='الرمز غير صحيح. المحاولات المتبقية: '+(5-OTP.n);return}
P=PEND;P.v=true;put('mzp',P);closeReg();show(true)};
var PL={'فرد':['أفراد',49],'مؤسسة':['مؤسسات',249],'شركة':['شركات',899]},cy='m',pm='mada',MT={mada:'مدى',apple:'Apple Pay',card:'فيزا / ماستركارد'},F=function(n){return n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})};
var PMI={mada:'ستنتقل إلى صفحة دفع مشفرة من مزوّد الدفع لإدخال بطاقة مدى. ميزان لا يرى رقم بطاقتك ولا يخزنه.',apple:'يظهر زر Apple Pay في الإنتاج على أجهزة أبل المدعومة فقط، ويؤكد الدفع بالبصمة أو الوجه دون إدخال أرقام.',card:'ستنتقل إلى صفحة دفع مشفرة لإدخال بطاقة فيزا أو ماستركارد، مع تحقق إضافي من البنك (3-D Secure).'};
function calc(){var b=PL[$('kt').value][1],sub=cy==='y'?b*12*.8:b;return{sub:sub,vat:sub*.15,tot:sub*1.15}}
function ckDraw(){var c=calc();$('ks').textContent=F(c.sub)+' ر.س';$('kv').textContent=F(c.vat)+' ر.س';$('kx').textContent=F(c.tot)+' ر.س';$('kpay').textContent=(pm==='apple'?'Apple Pay: ':'ادفع ')+F(c.tot)+' ر.س (محاكاة)';$('pmi').textContent=PMI[pm]}
function openCk(){if(!P){openReg();return}$('kt').value=P.ty;$('kok').style.display='none';$('kfm').style.display='';$('ker').textContent='';ckDraw();$('ck').classList.add('on');document.body.style.overflow='hidden'}
function closeCk(){$('ck').classList.remove('on');document.body.style.overflow=''}
$('mu').onclick=openCk;$('kx2').onclick=closeCk;$('kt').onchange=ckDraw;
$('kc').onclick=function(e){var b=e.target.closest('button');if(!b)return;cy=b.dataset.v;document.querySelectorAll('#kc button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});ckDraw()};
$('pm').onclick=function(e){var b=e.target.closest('button');if(!b)return;pm=b.dataset.v;document.querySelectorAll('#pm button').forEach(function(x){x.setAttribute('aria-checked',x===b)});ckDraw()};
function pay(ok){var c=calc(),b=$('kpay');$('ker').textContent='';b.disabled=true;$('kfail').disabled=true;b.textContent='جارٍ التحقق من الدفع الآمن...';
setTimeout(function(){b.disabled=false;$('kfail').disabled=false;ckDraw();
if(!ok){$('ker').textContent='رفض البنك المُصدر العملية (محاكاة). جرّب وسيلة دفع أخرى.';return}
var r=new Date();cy==='y'?r.setFullYear(r.getFullYear()+1):r.setMonth(r.getMonth()+1);
S2={p:PL[$('kt').value][0],cy:cy,m:pm,t:Date.now(),r:r.getTime(),id:'PAY-'+Date.now().toString(36).toUpperCase()};put('mzs',S2);
var R=[['رقم العملية',S2.id],['الباقة',S2.p+(cy==='y'?' (سنوي)':' (شهري)')],['المبلغ',F(c.sub)+' ر.س'],['ضريبة القيمة المضافة 15%',F(c.vat)+' ر.س'],['الإجمالي',F(c.tot)+' ر.س'],['الوسيلة',MT[pm]]];
$('krc').innerHTML=R.map(function(x){return '<div><span>'+x[0]+'</span><span dir="ltr">'+x[1]+'</span></div>'}).join('');
$('kfm').style.display='none';$('kok').style.display='block';render()},1600)}
$('kpay').onclick=function(){pay(true)};$('kfail').onclick=function(){pay(false)};
$('kgo').onclick=function(){closeCk();$('me').scrollIntoView({behavior:'smooth'})};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&$('ck').classList.contains('on'))closeCk()});
function roi(){var n=+$('a1').value||0,e=(+$('a2').value||0)/100,t=+$('a3').value||0,q=(+$('a4').value||0)/100,x=n*e*t*(1+q);
$('ao').innerHTML='<div class="big">'+F(x)+' ر.س / شهر</div><small>تعرّض شهري تقديري = '+n+' فاتورة × '+(e*100)+'% أخطاء × '+t+' ر.س ضريبة × (1 + '+(q*100)+'% غرامة). للمقارنة: اشتراك المؤسسات 249 ر.س قبل الضريبة.</small>'}
['a1','a2','a3','a4'].forEach(function(i){$(i).oninput=roi});roi();
if(P)show(false);
})();