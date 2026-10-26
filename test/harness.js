// ชุดทดสอบ: สร้างฟอร์มจำลองด้วย canvas แล้วเสียบแทน openSource (ใช้ตอนพัฒนาเท่านั้น)
window.T = {};
(function(){
const F=2.126, W=2339, H=1654, L={ answers:[], id:[], code:[], gender:[] };
for(let b=0;b<5;b++) for(let r=0;r<20;r++){ const row=[]; for(let c=0;c<5;c++) row.push([345+148*b+24.3*c, 267+20.7*r]); L.answers.push(row); }
for(let r=0;r<10;r++){ const row=[]; for(let c=0;c<10;c++) row.push([75+21.2*c,181+21.7*r]); L.id.push(row); }
for(let r=0;r<10;r++){ const row=[]; for(let c=0;c<3;c++) row.push([82+21.5*c,480+21.1*r]); L.code.push(row); }
L.gender=[[[219,413]],[[219,435]]];
const rnd=seed=>{ let s=seed; return ()=> (s=(s*1664525+1013904223)%4294967296)/4294967296; };
const groups=[L.answers,L.id,L.code,L.gender];
T.make=function(marks,dx,dy,rot,seed){
  const R=rnd(seed), c=document.createElement('canvas'); c.width=W;c.height=H; const x=c.getContext('2d',{willReadFrequently:true});
  x.fillStyle='#fdfdfb'; x.fillRect(0,0,W,H);
  x.translate(W/2+dx,H/2+dy); x.rotate(rot); x.translate(-W/2,-H/2); x.scale(F,F);
  x.strokeStyle='rgb(110,185,140)'; x.lineWidth=1.1; x.fillStyle='rgb(110,185,140)';
  x.strokeRect(298,35,747,655); x.fillRect(297,35,4,655); x.strokeRect(52,110,235,285);
  x.font='9px sans-serif'; x.textAlign='center'; x.textBaseline='middle';
  x.fillStyle='#333'; x.fillRect(1052,660,16,14); x.fillRect(1052,680,16,14);
  for(let i=0;i<60;i++) x.fillRect(52+i*17.2,703,6,14);
  for(const g of groups) g.forEach(row=>row.forEach((p,ci)=>{
    x.beginPath(); x.arc(p[0],p[1],8.2,0,7); x.strokeStyle='rgb(110,185,140)'; x.stroke();
    x.fillStyle='rgb(90,170,120)'; x.fillText(String((ci%5)+1),p[0],p[1]+0.5);
  }));
  for(const [gi,ri,ci] of marks){ const p=groups[gi][ri][ci]; x.beginPath(); x.arc(p[0]+(R()-.5)*1.2,p[1]+(R()-.5)*1.2,8.6,0,7); x.fillStyle=`rgba(${60+R()*40|0},${60+R()*40|0},${60+R()*40|0},${0.75+R()*.2})`; x.fill(); }
  return c;
};
T.keyAns=i=>(i*3+1)%5;
const keyMarks=[]; for(let i=0;i<80;i++) keyMarks.push([0,i,T.keyAns(i)]);
for(let c=0;c<10;c++) keyMarks.push([1,0,c]); for(let c=0;c<3;c++) keyMarks.push([2,0,c]);
T.key=T.make(keyMarks,0,0,0,1);
T.stu=[];
for(let s=0;s<4;s++){
  const R=rnd(100+s), m=[]; let expect=0;
  for(let i=0;i<80;i++){
    let o=T.keyAns(i), right=true; if(s>0 && R()<0.25){ o=(o+1+(R()*4|0))%5; right=false; }
    if(s===2 && i===5) continue;
    m.push([0,i,o]);
    if(s===3 && i===7){ m.push([0,i,(o+2)%5]); continue; }
    if(right) expect++;
  }
  const id=[...Array(10)].map(()=>R()*10|0); id.forEach((d,c)=>m.push([1,d,c]));
  [1,2,3].forEach((d,c)=>m.push([2,d,c])); m.push([3,s%2,0]);
  T.stu.push({ id:id.join(''), expect, canvas:T.make(m,[23,-17,5,-30][s],[-17,12,20,8][s],[0.007,-0.004,0,0.01][s],200+s) });
}
window.openSource=async f=>f==='KEY'?{n:1,render:async()=>T.key}:{n:4,render:async i=>T.stu[i-1].canvas};
})();
