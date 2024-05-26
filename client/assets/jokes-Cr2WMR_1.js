import{j as e,L as j,F as b,r as u,h as S,u as D,O as C}from"./components-flXA8FWO.js";const O=({userData:o})=>e.jsx("header",{className:"jokes-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{className:"home-link",children:e.jsxs(j,{to:"/",title:"Remix Jokes","aria-label":"Remix Jokes",children:[e.jsx("span",{className:"logo",children:"🤪"}),e.jsx("span",{className:"logo-medium",children:"J🤪KES"})]})}),o?e.jsxs("div",{className:"user-info",children:[e.jsx("span",{children:`Hi ${o.username}`}),e.jsx(b,{action:"/logout",method:"post",children:e.jsx("button",{type:"submit",className:"button",children:"Logout"})})]}):e.jsx(j,{to:"/login",children:"Login"})]})}),U=()=>e.jsx("footer",{className:"jokes-footer",children:e.jsx("div",{className:"container",children:e.jsx(j,{reloadDocument:!0,to:"/jokes.rss",children:"RSS"})})}),A=({jokes:o,active:n,changeJoke:r})=>e.jsx("ul",{className:"jokes-list",children:o.length>0?o.map(({id:l,name:c})=>{const h=n===l?"active-joke":"";return e.jsx("li",{children:e.jsx(j,{className:h,prefetch:"intent",to:l,onClick:()=>{r(l)},children:c})},l)}):e.jsx("li",{children:"No jokes found"})}),F=({data:o})=>{var g,R;const{user:n,allUsersData:r,jokeListItems:l}=o,[c,h]=u.useState(l),[p,x]=u.useState((g=l[0])==null?void 0:g.id),m=S(),i=u.useRef(null),y=(s,t)=>{switch(t.type){case"KEYWORD_CHANGED":return{...s,keyword:t.value};case"USER_UPDATED":return i&&i.current&&(i.current.value=""),{...s,user:t.value,keyword:""}}},E={user:n.id,keyword:""},[f,N]=u.useReducer(y,E),L=s=>{const{value:t=""}=s.target;N({type:"USER_UPDATED",value:t})},J=()=>{var s;N({type:"KEYWORD_CHANGED",value:(s=i.current)==null?void 0:s.value})};u.useEffect(()=>{var w;const{user:s,keyword:t}=f;let a=[];s!=="all"?a=r[s].jokes:Object.values(r).forEach(k=>{a.push(...k.jokes)}),t!==""&&(a=a.filter(k=>!!k.name.toLowerCase().includes(t.toLowerCase()))),h(a);const d=(w=a[0])==null?void 0:w.id;x(d),m(d?`${d}`:"/jokes")},[f,r]);const v=()=>{if(c.length<2)return;const s=Math.round(Math.random()*(c.length-1)),t=c[s].id;t===p?v():(x(t),m(`${t}`))};return e.jsxs("div",{className:"left-panel",children:[e.jsxs("label",{children:["Select a user to see their jokes:",e.jsxs("select",{className:"user-dropdown",name:"selectedUser",defaultValue:n==null?void 0:n.id,onChange:L,children:[e.jsx("option",{value:"all",children:"All"},"all"),(R=Object.keys(r))==null?void 0:R.map(s=>{const{id:t,username:a}=r[s],d=t===n.id?`(You) ${a}`:a;return e.jsx("option",{value:t,children:d},t)})]})]}),e.jsx("input",{type:"text",ref:i,placeholder:"Search a joke",onChange:J}),e.jsx("p",{children:"Click on a joke to read it:"}),e.jsx(A,{jokes:c,active:p,changeJoke:s=>{x(s)}}),e.jsx("button",{className:"button",onClick:v,children:"See a random joke"}),e.jsx("p",{children:e.jsx("b",{children:"(OR)"})}),e.jsx(j,{to:"new",className:"button",children:"Add your own"})]})};function H(){var n;const o=D();return e.jsxs("div",{className:"jokes-layout",children:[e.jsx(O,{userData:o.user}),e.jsx("main",{className:"jokes-main",children:e.jsxs("div",{className:"container",children:[((n=o.user)==null?void 0:n.id)&&e.jsx(F,{data:o}),e.jsx("div",{className:"jokes-outlet",children:e.jsx(C,{})})]})}),e.jsx(U,{})]})}export{H as default};
