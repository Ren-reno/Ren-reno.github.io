(function(){
var $=function(s,c){return(c||document).querySelector(s)},A=function(s,c){return[].slice.call((c||document).querySelectorAll(s))},R=matchMedia('(prefers-reduced-motion:reduce)').matches;
// tema
$('#tema').onclick=function(){var d=document.documentElement,o=(d.dataset.tema||(matchMedia('(prefers-color-scheme:dark)').matches?'oscuro':'claro'))==='oscuro'?'claro':'oscuro';d.dataset.tema=o;try{localStorage.setItem('tema',o)}catch(e){}};
// correo armado por JS
var m=$('#mail'),addr=m.dataset.u+'@'+m.dataset.d,cp=$('#copy'),ok=$('#ok');
m.onclick=function(){location.href='mailto:'+addr};
if(navigator.clipboard){cp.hidden=false;cp.onclick=function(){navigator.clipboard.writeText(addr).then(function(){ok.textContent='Correo copiado: '+addr},function(){ok.textContent='Mi correo es '+addr})}}
// filtro por tecnología
A('#filtros button').forEach(function(b){b.onclick=function(){A('#filtros button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});var f=b.dataset.f;A('.p').forEach(function(p){p.classList.toggle('dim',!!f&&p.dataset.t.split(' ').indexOf(f)<0)})}});
// carrusel
var car=$('.car'),tr=$('.track',car),n=A('figure',tr).length,lb=$('.cn span',car);
function pos(){var i=Math.round(tr.scrollLeft/tr.clientWidth);lb.textContent=(i+1)+' de '+n}
tr.addEventListener('scroll',pos,{passive:true});pos();
A('.cn button',car).forEach(function(b){b.onclick=function(){tr.scrollBy({left:b.dataset.d*tr.clientWidth,behavior:R?'auto':'smooth'})}});
// pestañas SGR
var T=['Gestión de períodos de seguimiento.','Gestión de actividades.','Carga de evidencias con archivos adjuntos.','Flujo de validación de lo cargado.'];
A('.steps button').forEach(function(b){b.onclick=function(){A('.steps button').forEach(function(x){x.setAttribute('aria-selected',x===b)});$('.sp').textContent=T[b.dataset.s]}});
// pipeline: se anima una sola vez al aparecer
var pip=$('.pip');
new IntersectionObserver(function(e,o){if(!e[0].isIntersecting)return;o.disconnect();$('.flow',pip).classList.add('on');
A('[data-n]',pip).forEach(function(el){var t=+el.dataset.n,s=null;if(R)return;function f(ts){s=s||ts;var p=Math.min((ts-s)/1200,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3))).toLocaleString('es-CL');if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.4}).observe(pip);
})();
