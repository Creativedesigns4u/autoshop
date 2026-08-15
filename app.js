function toast(message){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.textContent=message;t.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}
function setApproval(id,status){
  localStorage.setItem('approval_'+id,status);
  document.querySelectorAll('[data-approval="'+id+'"]').forEach(el=>{
    el.textContent=status==='approved'?'Approved':'Declined';
    el.className='status '+(status==='approved'?'s-green':'s-red');
  });
  document.querySelectorAll('[data-approve-btn="'+id+'"],[data-decline-btn="'+id+'"]').forEach(b=>b.disabled=true);
  toast(status==='approved'?'Work approved — shop notified':'Work declined — saved for follow-up');
}
function loadApprovals(){
  ['1246','1251','1254'].forEach(id=>{
    const s=localStorage.getItem('approval_'+id); if(!s)return;
    document.querySelectorAll('[data-approval="'+id+'"]').forEach(el=>{el.textContent=s==='approved'?'Approved':'Declined';el.className='status '+(s==='approved'?'s-green':'s-red');});
    document.querySelectorAll('[data-approve-btn="'+id+'"],[data-decline-btn="'+id+'"]').forEach(b=>b.disabled=true);
  });
}
function updateInspection(){
  const selects=[...document.querySelectorAll('.inspection-status')]; if(!selects.length)return;
  const counts={Good:0,Caution:0,'Needs Attention':0}; selects.forEach(s=>counts[s.value]++);
  const g=document.getElementById('goodCount'),c=document.getElementById('cautionCount'),n=document.getElementById('attentionCount');
  if(g)g.textContent=counts.Good;if(c)c.textContent=counts.Caution;if(n)n.textContent=counts['Needs Attention'];
}
function saveInspection(){
  const note=document.getElementById('techNote');
  localStorage.setItem('inspection_note',note?note.value:'');
  toast('Inspection saved to vehicle record');
}
function sendInspection(){toast('Inspection link sent to customer');}
function simulatePayment(){
  localStorage.setItem('demo_payment','paid');
  const p=document.getElementById('paymentStatus');if(p){p.textContent='Paid';p.className='status s-green';}
  toast('Payment recorded — receipt ready');
}
function loadPayment(){if(localStorage.getItem('demo_payment')==='paid'){const p=document.getElementById('paymentStatus');if(p){p.textContent='Paid';p.className='status s-green';}}}
document.addEventListener('DOMContentLoaded',()=>{
  loadApprovals();loadPayment();
  const note=document.getElementById('techNote');if(note&&localStorage.getItem('inspection_note'))note.value=localStorage.getItem('inspection_note');
  document.querySelectorAll('.inspection-status').forEach(s=>s.addEventListener('change',updateInspection));updateInspection();
});
