const S={A:{w:100,c:4},B:{w:100,c:4},locked:true};
const PX_G=1.35,PX_PCT=14;
const f=n=>{n=Math.round(n*10)/10;return Number.isInteger(n)?String(n):n.toFixed(1)};
function color(c){const t=(c-1)/19;return `hsl(197 ${58+t*10}% ${94-t*35}%)`}
function render(k){const d=S[k],v=document.getElementById("vessel"+k),salt=d.w*d.c/100,water=d.w-salt;
v.style.width=(d.w*PX_G)+"px";v.style.height=(d.c*PX_PCT)+"px";v.style.backgroundColor=color(d.c);
document.getElementById("weightLabel"+k).textContent=f(d.w)+"g";document.getElementById("concLabel"+k).textContent=f(d.c)+"%";
document.getElementById("salt"+k).textContent="食塩 "+f(salt)+"g";document.getElementById("water"+k).textContent="水 "+f(water)+"g";
document.getElementById("wv"+k).textContent=f(d.w)+"g";document.getElementById("cv"+k).textContent=f(d.c)+"%"}
function bind(id,k,p){document.getElementById(id).addEventListener("input",e=>{S[k][p]=+e.target.value;render(k)})}
bind("weightA","A","w");bind("concA","A","c");bind("weightB","B","w");bind("concB","B","c");
document.getElementById("lockA").onclick=()=>{S.locked=!S.locked;["weightA","concA"].forEach(id=>document.getElementById(id).disabled=S.locked);document.getElementById("cardA").classList.toggle("locked",S.locked);document.getElementById("lockA").textContent=S.locked?"🔒 基準":"🔓 変更できます"};
document.getElementById("reset").onclick=()=>{for(const k of ["A","B"]){S[k]={w:100,c:4};document.getElementById("weight"+k).value=100;document.getElementById("conc"+k).value=4;render(k)}};
render("A");render("B");