import{a as R}from"/build/_shared/chunk-XYRB6XSM.js";import{a as h}from"/build/_shared/chunk-2GJ3WNO2.js";import{a as A}from"/build/_shared/chunk-PGOH7JLP.js";import{a as x}from"/build/_shared/chunk-VAWQIAN7.js";import{a as I}from"/build/_shared/chunk-QVTEGN3F.js";import{c as p,f as g,g as v,i as E,k as y,p as k,s as b}from"/build/_shared/chunk-SLYZFWTH.js";import{c as o}from"/build/_shared/chunk-Q3IECNXJ.js";var w=o(A());var B=o(x()),L=o(R()),j=o(I()),e=o(b());function J(r){if(r.length<10)return"That joke is too short"}function F(r){if(r.length<3)return"That joke's name is too short"}function N(){var i,l,a,d,m,f,u,c;let r=k(),t=g();if(t.formData){let n=t.formData.get("content"),s=t.formData.get("name");if(typeof n=="string"&&typeof s=="string"&&!J(n)&&!F(s))return(0,e.jsx)(h,{canDelete:!1,isOwner:!0,joke:{name:s,content:n}})}return(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{children:"Add your own hilarious joke"}),(0,e.jsxs)(E,{method:"post",children:[(0,e.jsxs)("div",{children:[(0,e.jsxs)("label",{children:["Name:"," ",(0,e.jsx)("input",{defaultValue:(i=r==null?void 0:r.fields)==null?void 0:i.name,name:"name",type:"text","aria-invalid":Boolean((l=r==null?void 0:r.fieldErrors)==null?void 0:l.name),"aria-errormessage":(a=r==null?void 0:r.fieldErrors)!=null&&a.name?"name-error":void 0})]}),(d=r==null?void 0:r.fieldErrors)!=null&&d.name?(0,e.jsx)("p",{className:"form-validation-error",id:"name-error",role:"alert",children:r.fieldErrors.name}):null]}),(0,e.jsxs)("div",{children:[(0,e.jsxs)("label",{children:["Content:"," ",(0,e.jsx)("textarea",{defaultValue:(m=r==null?void 0:r.fields)==null?void 0:m.content,name:"content","aria-invalid":Boolean((f=r==null?void 0:r.fieldErrors)==null?void 0:f.content),"aria-errormessage":(u=r==null?void 0:r.fieldErrors)!=null&&u.content?"content-error":void 0})]}),(c=r==null?void 0:r.fieldErrors)!=null&&c.content?(0,e.jsx)("p",{className:"form-validation-error",id:"content-error",role:"alert",children:r.fieldErrors.content}):null]}),(0,e.jsxs)("div",{children:[r!=null&&r.formError?(0,e.jsx)("p",{className:"form-validation-error",role:"alert",children:r.formError}):null,(0,e.jsx)("button",{type:"submit",className:"button",children:"Add"})]})]})]})}function U(){let r=v();return console.error(r),p(r)&&r.status===401?(0,e.jsxs)("div",{className:"error-container",children:[(0,e.jsx)("p",{children:"You must be logged in to create a joke."}),(0,e.jsx)(y,{to:"/login",children:"Login"})]}):(0,e.jsx)("div",{className:"error-container",children:"Something unexpected went wrong. Sorry about that."})}export{U as ErrorBoundary,N as default};