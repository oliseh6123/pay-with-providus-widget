exports.id=913,exports.ids=[913],exports.modules={7737:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{h:()=>PayWithBankTransfer});var a=r(997),l=r(6689),x=r(5675),c=r.n(x),i=r(2807),n=r(3590),d=r(4449),p=r.n(d),o=r(4384),m=r.n(o),h=r(8215),u=r(1001),y=e([n,u]);[n,u]=y.then?(await y)():y;let PayWithBankTransfer=({setType:e,customerDetails:t,accountDetails:r,paymentDetails:s,generateAccountNumberFn:x,loading:d,error:o,resetDetailsFn:y,setError:b})=>{let[w,f]=(0,l.useState)("details"),[j,g]=(0,l.useState)(0),[N,v]=(0,l.useState)("ml-[0%]"),[k,C]=(0,l.useState)(Date.now());(0,l.useEffect)(()=>{"payment sent"===w&&setTimeout(()=>{0===j?(g(20),v("ml-[20%]")):20===j?(g(40),v("ml-[40%]")):40===j?(g(60),v("ml-[60%]")):(g(0),v("ml-[0%]"))},500),"payment sent"===w&&s&&f("payment received"),"payment received"===w&&setTimeout(()=>{f("payment success")},300)},[w,j,s]),(0,l.useEffect)(()=>{r?.accountNumber&&C(Date.now()+18e5)},[r?.accountNumber]);let renderDetails=()=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 2xs:px-4 py-4 flex items-center justify-between border-line-gray border-b-[1px]",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),d?(0,a.jsxs)("div",{className:"w-full flex flex-col items-center py-20 px-8 2xs:px-4",children:[a.jsx(h.a,{}),a.jsx("p",{className:"text-[16px] text-black/80 text-center mt-3",children:"Loading..."})]}):o?(0,a.jsxs)("div",{className:"w-full py-20 px-8 flex flex-col items-center 2xs:px-4",children:[a.jsx("p",{className:"text-[16px] text-black/80 text-center",children:o}),a.jsx("div",{className:"w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[5px] text-center cursor-pointer",onClick:()=>{x()},children:"Retry"})]}):(0,a.jsxs)("div",{className:"w-full px-8 pt-4 pb-14 text-center 2xs:px-4",children:[(0,a.jsxs)("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center",children:["Please make payment to"," ",a.jsx("span",{className:"text-primary-black",children:t?.customerName})]}),(0,a.jsxs)("p",{className:"text-[24px] leading-[21px] text-primary-yellow text-center mt-2",children:[u.oj,(0,u.uf)(`${r?.amount}`)]}),(0,a.jsxs)("div",{className:"w-full mt-8 border-yellow-border border-dashed border-[1px] bg-yellow-bg rounded-[5px] py-6 px-4 flex flex-col items-center gap-y-3",children:[a.jsx("p",{className:"text-primary-black text-[16px] text-center",children:"Providus Bank"}),(0,a.jsxs)("div",{className:"flex items-center gap-x-2",children:[a.jsx("p",{className:"text-[24px] text-primary-black",children:r?.accountNumber}),a.jsx(i.CopyToClipboard,{text:r?.accountNumber,onCopy:()=>n.toast.success("Account number copied successfully"),children:a.jsx(c(),{src:"/icons/copy-icon.svg",alt:"",width:15,height:16.36,className:"cursor-pointer"})})]}),a.jsx("p",{className:"text-[16px] text-center",children:r?.accountName})]}),a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>{f("payment sent")},children:"I’ve made payment"}),a.jsx("p",{className:"mx-auto text-center cursor-pointer text-primary-yellow underline mt-4 inline-block",onClick:()=>{e("card")},children:"Pay with Card"})]})]}),renderPaymentSuccess=()=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-8 pt-4 pb-14 text-center 2xs:px-4",children:[a.jsx("div",{className:"flex justify-center",children:a.jsx(c(),{src:"/img/success-gif.gif",alt:"",width:286,height:161})}),a.jsx("p",{className:"text-[20px] text-center text-primary-green mt-10",children:"Payment Successful"}),(0,a.jsxs)("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center mt-2",children:["Your payment of"," ",(0,a.jsxs)("span",{className:"text-primary-black text-[17px]",children:[u.oj,(0,u.uf)(`${s?.amount||0}`)]})," ","has been received by"," ",a.jsx("span",{className:"text-primary-black",children:s?.accountName})]}),a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>{f("payment receipt")},children:"Show Receipt"})]})]}),renderPaymentError=()=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-8 pt-4 pb-14 text-center 2xs:px-4",children:[a.jsx("div",{className:"flex justify-center",children:a.jsx(c(),{src:"/img/payment-decline.gif",alt:"",width:197,height:198})}),a.jsx("p",{className:"text-[20px] text-center text-primary-red mt-10",children:"Payment Failed"}),a.jsx("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center mt-2",children:o}),a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-red bg-primary-red border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>{(0,u.Xv)("close"),y()},children:"Close"})]})]}),renderPaymentSent=()=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-8 pt-4 pb-14 2xs:px-4",children:[a.jsx(p(),{date:k,onComplete:()=>{s||(f("payment error"),b("Transaction could not be completed"),g(0),v("ml-[0%]"))},renderer:({minutes:e,seconds:t})=>(0,a.jsxs)("p",{className:"text-[18px] text-primary-yellow text-center mb-3",children:[e,":",t," ",e>0?"minutes":t>0?"seconds":""]})}),(0,a.jsxs)("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center",children:["Please make payment to"," ",a.jsx("span",{className:"text-primary-black",children:r?.accountName})]}),(0,a.jsxs)("p",{className:"text-[24px] leading-[21px] text-primary-yellow text-center mt-2",children:[u.oj,(0,u.uf)(`${r?.amount||0}`)]}),(0,a.jsxs)("div",{className:"w-full mt-10 mb-4",children:[(0,a.jsxs)("p",{className:"text-primary-black text-[16px] text-center leading-[20.83px]",children:["Your transfer is being confirmed and it ",a.jsx("br",{}),"may take a few minutes"]}),(0,a.jsxs)("div",{className:"w-full flex items-center gap-x-3 pl-1 pr-3 mt-10",children:[a.jsx(c(),{src:"/icons/circled-check-green.svg",alt:"",width:30,height:30}),a.jsx("div",{className:"flex-1 h-[5px] bg-line-gray rounded-[5px] overflow-hidden",children:a.jsx("div",{className:`w-[40%] h-full bg-primary-green rounded-[5px] inline-animation ${N}`})}),a.jsx("div",{className:"w-[29px] h-[29px] rounded-[50%] border-gray-300 border-[1px]"})]}),(0,a.jsxs)("div",{className:"w-full flex items-center justify-between mt-[2px]",children:[a.jsx("p",{className:"text-[14px] text-primary-green",children:"Sent"}),a.jsx("p",{className:"text-[14px] text-status-black",children:"Received"})]})]}),a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>f("details"),children:"Show account number"})]})]}),renderPaymentReceived=()=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-8 pt-4 pb-14 2xs:px-4",children:[(0,a.jsxs)("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center",children:["Please make payment to"," ",a.jsx("span",{className:"text-primary-black",children:r?.accountName})]}),(0,a.jsxs)("p",{className:"text-[24px] leading-[21px] text-primary-yellow text-center mt-2",children:[u.oj,(0,u.uf)(`${r?.amount}`)]}),(0,a.jsxs)("div",{className:"w-full mt-10 mb-4",children:[(0,a.jsxs)("p",{className:"text-primary-black text-[16px] text-center leading-[20.83px]",children:["Your transfer is being confirmed and it ",a.jsx("br",{}),"may take a few minutes"]}),(0,a.jsxs)("div",{className:"w-full flex items-center gap-x-3 pl-1 pr-3 mt-10",children:[a.jsx(c(),{src:"/icons/circled-check-green.svg",alt:"",width:30,height:30}),a.jsx("div",{className:"flex-1 h-[5px] bg-primary-green rounded-[5px] overflow-hidden"}),a.jsx(c(),{src:"/icons/circled-check-green.svg",alt:"",width:30,height:30})]}),(0,a.jsxs)("div",{className:"w-full flex items-center justify-between mt-[2px]",children:[a.jsx("p",{className:"text-[14px] text-primary-green",children:"Sent"}),a.jsx("p",{className:"text-[14px] text-primary-green",children:"Received"})]})]}),a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>f("details"),children:"Show account number"})]})]}),renderPaymentReceipt=()=>a.jsx("div",{className:"2xs:w-full rounded-[7px] border-gray-200 border-[1px] overflow-hidden",children:(0,a.jsxs)("div",{className:"w-[500px] 2xs:w-full max-h-[95vh] overflow-y-auto relative z-[100] bg-white",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-6 pt-6 pb-10 text-center 2xs:px-4",children:[(0,a.jsxs)("div",{className:"w-full rounded-[5px] bg-card-gray-bg pt-6",children:[a.jsx("p",{className:"text-[14px] text-tertiary-black text-center",children:"Transaction Amount"}),(0,a.jsxs)("p",{className:"text-[18px] text-primary-yellow text-center mt-1",children:[u.oj,(0,u.uf)(`${s?.amount||0}`)]}),(0,a.jsxs)("div",{className:"mt-6 w-full flex flex-col gap-y-3",children:[(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Beneficiary Details"}),(0,a.jsxs)("div",{className:"w-[55%] text-right",children:[a.jsx("p",{className:"text-[14px] text-primary-black",children:s?.accountName}),(0,a.jsxs)("p",{className:"text-[12px] text-tertiary-black",children:["PROVIDUS BANK | ",s?.accountNumber]})]})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Sender Details"}),(0,a.jsxs)("div",{className:"w-[55%] text-right",children:[a.jsx("p",{className:"text-[14px] text-primary-black",children:s?.payerAccountName}),(0,a.jsxs)("p",{className:"text-[12px] text-tertiary-black",children:[s?.payerBankName," |"," ",s?.payerAccountNumber]})]})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Date and Time"}),(0,a.jsxs)("div",{className:"w-[55%] text-right",children:[a.jsx("p",{className:"text-[14px] text-primary-black",children:s?.createdAt?m()(new Date(s?.createdAt),"dd MMMM yyyy"):null}),a.jsx("p",{className:"text-[12px] text-tertiary-black",children:s?.createdAt?m()(new Date(s?.createdAt),"p"):null})]})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Transaction Reference"}),a.jsx("div",{className:"w-[55%] text-right",children:a.jsx("p",{className:"text-[14px] text-primary-black w-[99.99%] break-words",children:s?.reference})})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Session ID"}),a.jsx("div",{className:"w-[55%] text-right",children:a.jsx("p",{className:"text-[14px] text-primary-black w-[99.99%] break-words",children:s?.sessionId})})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Settlement ID"}),a.jsx("div",{className:"w-[55%] text-right",children:a.jsx("p",{className:"text-[14px] text-primary-black w-[99.99%] break-words",children:s?.settlementId})})]}),(0,a.jsxs)("div",{className:"px-4 flex items-start gap-x-2 mt-1 pb-4",children:[a.jsx("p",{className:"flex-1 text-[14px] text-tertiary-black text-left",children:"Status"}),a.jsx("div",{className:"w-[55%] text-right",children:a.jsx("p",{className:"text-[14px] text-primary-green w-[99.99%] break-words",children:s?.transactionStatus})})]})]})]}),!!s?.downloadURL&&a.jsx("div",{className:"w-full mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>window.open(s?.downloadURL,"_blank"),children:"Download Receipt"})]})]})});return(()=>{switch(w){case"payment sent":return renderPaymentSent();case"payment received":return renderPaymentReceived();case"payment success":return renderPaymentSuccess();case"payment error":return renderPaymentError();case"payment receipt":return renderPaymentReceipt();default:return renderDetails()}})()};s()}catch(e){s(e)}})},8215:(e,t,r)=>{"use strict";r.d(t,{a:()=>Loader});var s=r(997);r(6689);let Loader=({className:e})=>s.jsx("div",{className:`${e||"w-10 h-10 border-primary-yellow"} loader__container`})},322:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{v:()=>PayWithCard});var a=r(997),l=r(6689),x=r(5675),c=r.n(x),i=r(8215),n=r(5843),d=r(1001),p=e([n,d]);[n,d]=p.then?(await p)():p;let PayWithCard=({setStatus:e,customerDetails:t})=>{let[r,s]=(0,l.useState)(!0),[x,p]=(0,l.useState)(""),[o,m]=(0,l.useState)(!1),getCardSessionId=async()=>{s(!0),p("");let e={currency:t?.currency||"NGN",amount:t?.amount,email:t?.email};t?.description&&(e.description=t?.description),t?.showBillingAddress?e.showBillingAddress="YES":e.showBillingAddress="NO",t?.showEmail?e.showEmail="YES":e.showEmail="NO";try{let{data:r}=await n.u.post("/hosted-card/session",{data:(0,d.HI)(JSON.stringify(e),t.publicKey)},{headers:{"x-public-key":t.publicKey}});m(!0),window.Checkout.configure({session:{id:r?.data?.sessionId}}),window.Checkout.showEmbeddedPage("#embed-target")}catch(e){p(e?.response?.data?.message||e?.message),m(!1)}finally{s(!1)}};return(0,l.useEffect)(()=>{getCardSessionId()},[]),a.jsx("div",{className:"2xs:w-full rounded-[7px] overflow-hidden border-gray-200 border-[1px]",children:(0,a.jsxs)("div",{className:"w-[445px]  2xs:w-full relative z-[100] max-h-[95vh] overflow-y-auto bg-white",children:[(0,a.jsxs)("div",{className:"w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4",children:[a.jsx(c(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),r?(0,a.jsxs)("div",{className:"w-full flex flex-col items-center py-20 px-8 2xs:px-4",children:[a.jsx(i.a,{}),a.jsx("p",{className:"text-[16px] text-black/80 text-center mt-3",children:"Processing..."})]}):x?(0,a.jsxs)("div",{className:"w-full py-20 px-8 flex flex-col items-center 2xs:px-4",children:[a.jsx("p",{className:"text-[16px] text-black/80 text-center",children:x}),a.jsx("div",{className:"w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[5px] text-center cursor-pointer",onClick:()=>{s(!0),p(""),getCardSessionId()},children:"Retry"})]}):null,a.jsx("div",{id:"embed-target",className:`${o&&"card__target"}`})]})})};s()}catch(e){s(e)}})},4819:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{C:()=>Providers});var a=r(997),l=r(6689),x=r(3590),c=e([x]);x=(c.then?(await c)():c)[0];let Providers=({children:e})=>(0,a.jsxs)(l.Fragment,{children:[e,a.jsx(x.ToastContainer,{})]});s()}catch(e){s(e)}})},2437:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{D:()=>SelectPaymentType});var a=r(997);r(6689);var l=r(5675),x=r.n(l),c=r(8215),i=r(1001),n=e([i]);i=(n.then?(await n)():n)[0];let SelectPaymentType=({setStatus:e,customerDetails:t,generateAccountNumberFn:r,resetDetailsFn:s,loading:l,error:n,optionDetails:d,getPaymentOptions:p})=>(0,a.jsxs)("div",{className:"w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]",children:[(0,a.jsxs)("div",{className:"w-full px-8 2xs:px-4 py-4 flex items-center justify-between border-line-gray border-b-[1px]",children:[a.jsx(x(),{src:"/img/providus-logo.png",alt:"Providus Logo",width:82,height:40}),a.jsx("p",{className:"text-[14px] uppercase text-primary-black font-medium",children:"PROVIDUS CHECKOUT"})]}),(0,a.jsxs)("div",{className:"w-full px-8 2xs:px-4 pt-4 pb-14",children:[!!d?.length&&(0,a.jsxs)("p",{className:"text-[15px] leading-[21px] text-secondary-black text-center",children:["Kindly select any of the payment options provided below to make a payment of"," ",(0,a.jsxs)("span",{className:"text-primary-yellow",children:[t?.currency,(0,i.uf)(`${t?.amount||0}`)]})," ","to ",a.jsx("br",{}),a.jsx("span",{className:"text-primary-black",children:t?.customerName})]}),l?(0,a.jsxs)("div",{className:"w-full flex flex-col items-center py-20 px-8 2xs:px-4",children:[a.jsx(c.a,{}),a.jsx("p",{className:"text-[16px] text-black/80 text-center mt-3",children:"Loading..."})]}):n?(0,a.jsxs)("div",{className:"w-full py-20 px-8 flex flex-col items-center 2xs:px-4",children:[a.jsx("p",{className:"text-[16px] text-black/80 text-center",children:n}),a.jsx("div",{className:"w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[5px] text-center cursor-pointer",onClick:()=>{p()},children:"Retry"})]}):d&&d?.length?(0,a.jsxs)("div",{className:"w-full mt-8",children:[!!d?.includes("BANK_TRANSFER")&&(0,a.jsxs)("div",{className:"w-full flex items-center gap-x-3 border-line-gray border-b-[1px] pb-2 cursor-pointer",onClick:()=>{r(),e("transfer")},children:[(0,a.jsxs)("div",{className:"flex-1 flex items-center gap-x-4",children:[a.jsx(x(),{src:"/icons/bank-transfer-icon.svg",alt:"",width:38,height:38}),a.jsx("p",{className:"text-[16px] text-secondary-black",children:"Pay with Bank Transfer"})]}),a.jsx(x(),{src:"/icons/chevron-right.svg",alt:"",width:14,height:7})]}),!!d?.includes("CARD")&&(0,a.jsxs)("div",{className:"w-full flex items-center gap-x-3 border-line-gray border-b-[1px] mt-8 pb-2 cursor-pointer",onClick:()=>{e("card")},children:[(0,a.jsxs)("div",{className:"flex-1 flex items-center gap-x-4",children:[a.jsx(x(),{src:"/icons/card-icon.svg",alt:"",width:38,height:38}),a.jsx("p",{className:"text-[16px] text-secondary-black",children:"Pay with Card"})]}),a.jsx(x(),{src:"/icons/chevron-right.svg",alt:"",width:14,height:7})]})]}):(0,a.jsxs)("div",{className:"w-full py-20 px-8 flex flex-col items-center 2xs:px-4",children:[a.jsx("p",{className:"text-[16px] text-black/80 text-center",children:"Your merchant has not been configured to receive payments. Please visit the merchant portal to complete your account configuration"}),a.jsx("div",{className:"w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-red-500 bg-red-500 border-[1px] rounded-[5px] text-center cursor-pointer",onClick:()=>{(0,i.Xv)("close"),s()},children:"Close"})]}),!!d?.length&&a.jsx("div",{className:"w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer",onClick:()=>{(0,i.Xv)("close"),s()},children:"Cancel Payment"})]})]});s()}catch(e){s(e)}})},5556:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{Cl:()=>a.C,DH:()=>c.D,hB:()=>l.h,vu:()=>x.v});var a=r(4819),l=r(7737),x=r(322),c=r(2437);r(8215);var i=e([a,l,x,c]);[a,l,x,c]=i.then?(await i)():i,s()}catch(e){s(e)}})},7085:(e,t,r)=>{"use strict";r.d(t,{v:()=>s});let s={SERVER_URL:process.env.NEXT_PUBLIC_SERVER_URL}},5913:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{default:()=>App});var a=r(997),l=r(5556);r(8819),r(6764);var x=e([l]);function App({Component:e,pageProps:t}){return a.jsx(l.Cl,{children:a.jsx(e,{...t})})}l=(x.then?(await x)():x)[0],s()}catch(e){s(e)}})},5843:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{u:()=>c});var a=r(9648),l=r(7085),x=e([a]);a=(x.then?(await x)():x)[0];let c=a.default.create({baseURL:l.v.SERVER_URL,headers:{"ngrok-skip-browser-warning":"any","Content-Type":"application/json"}});s()}catch(e){s(e)}})},1001:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{HI:()=>encrypt,Xv:()=>handleIframeAction,oj:()=>n,uf:()=>formatNumber});var a=r(997),l=r(3590),x=r(5666),c=r.n(x),i=e([l]);l=(i.then?(await i)():i)[0];let n=a.jsx(a.Fragment,{children:"₦"}),formatNumber=e=>{let t=!!e?.includes(".");return t?Intl.NumberFormat("NGN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(e)):Intl.NumberFormat("NGN").format(Number(e))},encrypt=(e,t)=>{let r=c().AES.encrypt(e,t).toString();return r},handleIframeAction=e=>{let t=window.location!=window.parent.location?document.referrer:document.location.href;console.log({windowLocation:window.location,windowParentLocation:window.parent.location,documentReferrer:document.referrer,documentLocationHref:document.location.href,url:t,windowTop:window.top}),window.parent.postMessage({type:e},t)};s()}catch(e){s(e)}})},6764:()=>{}};