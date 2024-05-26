import{c as j,e as c,j as r,F as f,L as x}from"./components-flXA8FWO.js";const v=()=>{const e="Login to submit your own jokes to Remix Jokes!";return[{name:"description",content:e},{name:"twitter:description",content:e},{title:"Remix Jokes | Login"}]};function w(){var s,l,i,d,o,n,m,u,p,t,a;const e=j(),[h]=c();return r.jsxs("div",{className:"container",children:[r.jsxs("div",{className:"content","data-light":"",children:[r.jsx("h1",{children:"Login"}),r.jsxs(f,{method:"post",children:[r.jsx("input",{type:"hidden",name:"redirectTo",value:h.get("redirectTo")??void 0}),r.jsxs("fieldset",{children:[r.jsx("legend",{className:"sr-only",children:"Login or Register?"}),r.jsxs("label",{children:[r.jsx("input",{type:"radio",name:"loginType",value:"login",defaultChecked:!((s=e==null?void 0:e.fields)!=null&&s.loginType)||((l=e==null?void 0:e.fields)==null?void 0:l.loginType)==="login"})," ","Login"]}),r.jsxs("label",{children:[r.jsx("input",{type:"radio",name:"loginType",value:"register",defaultChecked:((i=e==null?void 0:e.fields)==null?void 0:i.loginType)==="register"})," ","Register"]})]}),r.jsxs("div",{children:[r.jsx("label",{htmlFor:"username-input",children:"Username"}),r.jsx("input",{type:"text",id:"username-input",name:"username",defaultValue:(d=e==null?void 0:e.fields)==null?void 0:d.username,"aria-invalid":!!((o=e==null?void 0:e.fieldErrors)!=null&&o.username),"aria-errormessage":(n=e==null?void 0:e.fieldErrors)!=null&&n.username?"username-error":void 0}),(m=e==null?void 0:e.fieldErrors)!=null&&m.username?r.jsx("p",{className:"form-validation-error",role:"alert",id:"username-error",children:e.fieldErrors.username}):null]}),r.jsxs("div",{children:[r.jsx("label",{htmlFor:"password-input",children:"Password"}),r.jsx("input",{id:"password-input",name:"password",type:"password",defaultValue:(u=e==null?void 0:e.fields)==null?void 0:u.password,"aria-invalid":!!((p=e==null?void 0:e.fieldErrors)!=null&&p.password),"aria-errormessage":(t=e==null?void 0:e.fieldErrors)!=null&&t.password?"password-error":void 0}),(a=e==null?void 0:e.fieldErrors)!=null&&a.password?r.jsx("p",{className:"form-validation-error",role:"alert",id:"password-error",children:e.fieldErrors.password}):null]}),r.jsx("div",{id:"form-error-message",children:e!=null&&e.formError?r.jsx("p",{className:"form-validation-error",role:"alert",children:e.formError}):null}),r.jsx("button",{type:"submit",className:"button",children:"Submit"})]})]}),r.jsx("div",{className:"links",children:r.jsxs("ul",{children:[r.jsx("li",{children:r.jsx(x,{to:"/",children:"Home"})}),r.jsx("li",{children:r.jsx(x,{to:"/jokes",children:"Jokes"})})]})})]})}export{w as default,v as meta};
