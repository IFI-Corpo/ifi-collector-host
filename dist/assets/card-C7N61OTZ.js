import{Q as y,U as j,V as Y,W as $,Z as G,_ as J,$ as U,a0 as Q,a1 as Z,a2 as M,a3 as q,a4 as L,a5 as x,a6 as I,r as c,a7 as K,a8 as D,a9 as N,aa as ee,R as te,j as h,m as ne,a as m,y as se}from"./index-BKU-kTC2.js";function F(e,t){let s;const n=()=>{const{currentTime:r}=t,i=(r===null?0:r.value)/100;s!==i&&e(i),s=i};return y.update(n,!0),()=>j(n)}const b=new WeakMap;let p;function re(e,t){if(t){const{inlineSize:s,blockSize:n}=t[0];return{width:s,height:n}}else return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}function oe({target:e,contentRect:t,borderBoxSize:s}){var n;(n=b.get(e))===null||n===void 0||n.forEach(r=>{r({target:e,contentSize:t,get size(){return re(e,s)}})})}function ie(e){e.forEach(oe)}function le(){typeof ResizeObserver>"u"||(p=new ResizeObserver(ie))}function ae(e,t){p||le();const s=Y(e);return s.forEach(n=>{let r=b.get(n);r||(r=new Set,b.set(n,r)),r.add(t),p==null||p.observe(n)}),()=>{s.forEach(n=>{const r=b.get(n);r==null||r.delete(t),r!=null&&r.size||p==null||p.unobserve(n)})}}const S=new Set;let w;function ce(){w=()=>{const e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};S.forEach(s=>s(t))},window.addEventListener("resize",w)}function fe(e){return S.add(e),w||ce(),()=>{S.delete(e),!S.size&&w&&(w=void 0)}}function ue(e,t){return typeof e=="function"?fe(e):ae(e,t)}const de=50,R=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),ge=()=>({time:0,x:R(),y:R()}),pe={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function O(e,t,s,n){const r=s[t],{length:o,position:i}=pe[t],l=r.current,a=s.time;r.current=e[`scroll${i}`],r.scrollLength=e[`scroll${o}`]-e[`client${o}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=$(0,r.scrollLength,r.current);const u=n-a;r.velocity=u>de?0:G(r.current-l,u)}function he(e,t,s){O(e,"x",t,s),O(e,"y",t,s),t.time=s}function me(e,t){const s={x:0,y:0};let n=e;for(;n&&n!==t;)if(n instanceof HTMLElement)s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const r=n.getBoundingClientRect();n=n.parentElement;const o=n.getBoundingClientRect();s.x+=r.left-o.left,s.y+=r.top-o.top}else if(n instanceof SVGGraphicsElement){const{x:r,y:o}=n.getBBox();s.x+=r,s.y+=o;let i=null,l=n.parentNode;for(;!i;)l.tagName==="svg"&&(i=l),l=n.parentNode;n=i}else break;return s}const W={start:0,center:.5,end:1};function T(e,t,s=0){let n=0;if(e in W&&(e=W[e]),typeof e=="string"){const r=parseFloat(e);e.endsWith("px")?n=r:e.endsWith("%")?e=r/100:e.endsWith("vw")?n=r/100*document.documentElement.clientWidth:e.endsWith("vh")?n=r/100*document.documentElement.clientHeight:e=r}return typeof e=="number"&&(n=t*e),s+n}const ye=[0,0];function ve(e,t,s,n){let r=Array.isArray(e)?e:ye,o=0,i=0;return typeof e=="number"?r=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?r=e.split(" "):r=[e,W[e]?e:"0"]),o=T(r[0],s,n),i=T(r[1],t),o-i}const xe={All:[[0,0],[1,1]]},we={x:0,y:0};function Ee(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function be(e,t,s){const{offset:n=xe.All}=s,{target:r=e,axis:o="y"}=s,i=o==="y"?"height":"width",l=r!==e?me(r,e):we,a=r===e?{width:e.scrollWidth,height:e.scrollHeight}:Ee(r),u={width:e.clientWidth,height:e.clientHeight};t[o].offset.length=0;let d=!t[o].interpolate;const g=n.length;for(let f=0;f<g;f++){const E=ve(n[f],u[i],a[i],l[o]);!d&&E!==t[o].interpolatorOffsets[f]&&(d=!0),t[o].offset[f]=E}d&&(t[o].interpolate=J(t[o].offset,U(n),{clamp:!1}),t[o].interpolatorOffsets=[...t[o].offset]),t[o].progress=Q(0,1,t[o].interpolate(t[o].current))}function Se(e,t=e,s){if(s.x.targetOffset=0,s.y.targetOffset=0,t!==e){let n=t;for(;n&&n!==e;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=t===e?t.scrollWidth:t.clientWidth,s.y.targetLength=t===e?t.scrollHeight:t.clientHeight,s.x.containerLength=e.clientWidth,s.y.containerLength=e.clientHeight}function Le(e,t,s,n={}){return{measure:()=>Se(e,n.target,s),update:r=>{he(e,s,r),(n.offset||n.target)&&be(e,s,n)},notify:()=>t(s)}}const v=new WeakMap,B=new WeakMap,z=new WeakMap,V=e=>e===document.documentElement?window:e;function H(e,{container:t=document.documentElement,...s}={}){let n=z.get(t);n||(n=new Set,z.set(t,n));const r=ge(),o=Le(t,e,r,s);if(n.add(o),!v.has(t)){const l=()=>{for(const f of n)f.measure()},a=()=>{for(const f of n)f.update(Z.timestamp)},u=()=>{for(const f of n)f.notify()},d=()=>{y.read(l,!1,!0),y.read(a,!1,!0),y.update(u,!1,!0)};v.set(t,d);const g=V(t);window.addEventListener("resize",d,{passive:!0}),t!==document.documentElement&&B.set(t,ue(t,d)),g.addEventListener("scroll",d,{passive:!0})}const i=v.get(t);return y.read(i,!1,!0),()=>{var l;j(i);const a=z.get(t);if(!a||(a.delete(o),a.size))return;const u=v.get(t);v.delete(t),u&&(V(t).removeEventListener("scroll",u),(l=B.get(t))===null||l===void 0||l(),window.removeEventListener("resize",u))}}function ze({source:e,container:t,axis:s="y"}){e&&(t=e);const n={value:0},r=H(o=>{n.value=o[s].progress*100},{container:t,axis:s});return{currentTime:n,cancel:r}}const C=new Map;function _({source:e,container:t=document.documentElement,axis:s="y"}={}){e&&(t=e),C.has(t)||C.set(t,{});const n=C.get(t);return n[s]||(n[s]=q()?new ScrollTimeline({source:t,axis:s}):ze({source:t,axis:s})),n[s]}function Ce(e){return e.length===2}function X(e){return e&&(e.target||e.offset)}function We(e,t){return Ce(e)||X(t)?H(s=>{e(s[t.axis].progress,s)},t):F(e,_(t))}function He(e,t){if(e.flatten(),X(t))return e.pause(),H(s=>{e.time=e.duration*s[t.axis].progress},t);{const s=_(t);return e.attachTimeline?e.attachTimeline(s,n=>(n.pause(),F(r=>{n.time=n.duration*r},s))):M}}function Ne(e,{axis:t="y",...s}={}){const n={axis:t,...s};return typeof e=="function"?We(e,n):He(e,n)}function P(e,t){K(!!(!t||t.current))}const Re=()=>({scrollX:x(0),scrollY:x(0),scrollXProgress:x(0),scrollYProgress:x(0)});function Oe({container:e,target:t,layoutEffect:s=!0,...n}={}){const r=L(Re);return(s?I:c.useEffect)(()=>(P("target",t),P("container",e),Ne((i,{x:l,y:a})=>{r.scrollX.set(l.current),r.scrollXProgress.set(l.progress),r.scrollY.set(a.current),r.scrollYProgress.set(a.progress)},{...n,container:(e==null?void 0:e.current)||void 0,target:(t==null?void 0:t.current)||void 0})),[e,t,JSON.stringify(n.offset)]),r}function Te(e){const t=L(()=>x(e)),{isStatic:s}=c.useContext(D);if(s){const[,n]=c.useState(e);c.useEffect(()=>t.on("change",n),[])}return t}function Be(e,t={}){const{isStatic:s}=c.useContext(D),n=c.useRef(null),r=L(()=>N(e)?e.get():e),o=L(()=>typeof r=="string"?r.replace(/[\d.-]/g,""):void 0),i=Te(r),l=c.useRef(r),a=c.useRef(M),u=()=>{d(),n.current=ee({keyframes:[k(i.get()),k(l.current)],velocity:i.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...t,onUpdate:a.current})},d=()=>{n.current&&n.current.stop()};return c.useInsertionEffect(()=>i.attach((g,f)=>s?f(g):(l.current=g,a.current=E=>f(A(E,o)),y.postRender(u),i.get()),d),[JSON.stringify(t)]),I(()=>{if(N(e))return e.on("change",g=>i.set(A(g,o)))},[i,o]),i}function A(e,t){return t?e+t:e}function k(e){return typeof e=="number"?e:parseFloat(e)}const Ve=te.forwardRef(({className:e,...t},s)=>{const{scrollYProgress:n}=Oe(),r=Be(n,{stiffness:200,damping:50,restDelta:.001});return h.jsx(ne.div,{ref:s,className:m("fixed inset-x-0 top-0 z-[1000] h-[2px] origin-left bg-gradient-to-r from-[#262626] via-[#727272] to-[#b8b8b8]",e),style:{scaleX:r},...t})});Ve.displayName="ScrollProgress";const Pe=se("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function _e({className:e,variant:t,...s}){return h.jsx("div",{className:m(Pe({variant:t}),e),...s})}const Ae=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("rounded-xl border bg-card text-card-foreground shadow-sm",e),...t}));Ae.displayName="Card";const ke=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("flex flex-col space-y-1.5 p-1",e),...t}));ke.displayName="CardHeader";const je=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("font-semibold leading-none tracking-tight",e),...t}));je.displayName="CardTitle";const Me=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("text-sm text-muted-foreground",e),...t}));Me.displayName="CardDescription";const Ie=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("pt-0",e),...t}));Ie.displayName="CardContent";const De=c.forwardRef(({className:e,...t},s)=>h.jsx("div",{ref:s,className:m("flex items-center p-2 pt-0",e),...t}));De.displayName="CardFooter";export{_e as B,Ae as C,Ve as S,ke as a,je as b,Me as c,Ie as d,De as e};
