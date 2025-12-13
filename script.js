let stack = [];
let queue = [];
let bst = null;

function stackPush() {
  const i = document.getElementById("stack-input");
  if (!i.value) return;
  stack.push(i.value);
  i.value = "";
  render(stack, "stack-visual");
  document.getElementById("stack-message").textContent = "Stack size: " + stack.length;
}

function stackPop() {
  stack.pop();
  render(stack, "stack-visual");
}

function queueEnqueue() {
  const i = document.getElementById("queue-input");
  if (!i.value) return;
  queue.push(i.value);
  i.value = "";
  render(queue, "queue-visual");
}

function queueDequeue() {
  queue.shift();
  render(queue, "queue-visual");
}

function Node(v){this.v=v;this.l=null;this.r=null;}
function insert(n,v){
  if(!n) return new Node(v);
  v<n.v ? n.l=insert(n.l,v) : n.r=insert(n.r,v);
  return n;
}

function bstInsert(){
  const i=document.getElementById("bst-input");
  if(!i.value) return;
  bst=insert(bst,parseInt(i.value));
  i.value="";
}

function traverse(n,a=[]){
  if(!n) return;
  traverse(n.l,a);a.push(n.v);traverse(n.r,a);
  return a;
}

function bstTraverse(){
  document.getElementById("bst-output").textContent =
    bst ? traverse(bst).join(" → ") : "Empty";
}

function bstClear(){
  bst=null;
  document.getElementById("bst-output").textContent="Cleared";
}

function render(arr,id){
  const v=document.getElementById(id);
  v.innerHTML="";
  arr.forEach(x=>{
    const d=document.createElement("div");
    d.className="box";d.textContent=x;
    v.appendChild(d);
  });
}
