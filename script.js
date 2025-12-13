/* =========================
   1. ARRAY & BINARY SEARCH
========================= */

let arr = [10, 20, 30];

function renderArray() {
    const visual = document.getElementById("array-visual");
    visual.innerHTML = "";
    arr.forEach(v => {
        const d = document.createElement("div");
        d.className = "data-item";
        d.innerText = v;
        visual.appendChild(d);
    });
}

function arrayInsert() {
    const val = document.getElementById("array-input").value;
    if (val === "") return;
    arr.push(Number(val));
    document.getElementById("array-input").value = "";
    renderArray();
}

function arrayDelete() {
    const val = Number(document.getElementById("array-input").value);
    arr = arr.filter(x => x !== val);
    document.getElementById("array-input").value = "";
    renderArray();
}

function runBinarySearch() {
    const target = Number(document.getElementById("bs-input").value);
    arr.sort((a, b) => a - b);

    let low = 0, high = arr.length - 1, found = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            found = mid;
            break;
        }
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }

    document.getElementById("array-message").innerText =
        found !== -1 ? "Found at index " + found : "Not found";
}

renderArray();

/* =========================
   2. STACK (MAX 5)
========================= */

let stack = [];
const MAX_SIZE = 5;

function renderStack() {
    const visual = document.getElementById("stack-visual");
    visual.innerHTML = "";
    stack.slice().reverse().forEach(v => {
        const d = document.createElement("div");
        d.className = "data-item";
        d.innerText = v;
        visual.appendChild(d);
    });
}

function stackPush() {
    const val = document.getElementById("stack-input").value;
    if (val === "") return;

    if (stack.length >= MAX_SIZE) {
        document.getElementById("stack-message").innerText = "Stack Overflow!";
        return;
    }

    stack.push(val);
    document.getElementById("stack-input").value = "";
    renderStack();
}

function stackPop() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack Underflow!";
        return;
    }
    stack.pop();
    renderStack();
}

function stackPeek() {
    document.getElementById("stack-message").innerText =
        stack.length ? "Top: " + stack[stack.length - 1] : "Stack empty";
}

function stackDisplay() {
    document.getElementById("stack-message").innerText =
        stack.length ? stack.join(", ") : "Stack empty";
}

/* =========================
   2B. EXPRESSION CONVERTER
========================= */

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function infixToPostfix(exp) {
    let stack = [], output = "";

    for (let ch of exp) {
        if (/[A-Za-z0-9]/.test(ch)) output += ch;
        else if (ch === '(') stack.push(ch);
        else if (ch === ')') {
            while (stack.length && stack[stack.length - 1] !== '(')
                output += stack.pop();
            stack.pop();
        } else {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(ch))
                output += stack.pop();
            stack.push(ch);
        }
    }
    while (stack.length) output += stack.pop();
    return output;
}

function infixToPrefix(exp) {
    let rev = exp.split("").reverse().map(c =>
        c === '(' ? ')' : c === ')' ? '(' : c
    ).join("");
    let postfix = infixToPostfix(rev);
    return postfix.split("").reverse().join("");
}

function convertExpression() {
    const infix = document.getElementById("infix-input").value;
    document.getElementById("out-infix").innerText = infix;
    document.getElementById("out-postfix").innerText = infixToPostfix(infix);
    document.getElementById("out-prefix").innerText = infixToPrefix(infix);
}

/* =========================
   3. QUEUE (FIFO)
========================= */

let queue = [];

function renderQueue() {
    const visual = document.getElementById("queue-visual");
    visual.innerHTML = "";
    queue.forEach(v => {
        const d = document.createElement("div");
        d.className = "data-item";
        d.innerText = v;
        visual.appendChild(d);
    });
}

function queueEnqueue() {
    const val = document.getElementById("queue-input").value;
    if (val === "") return;
    queue.push(val);
    document.getElementById("queue-input").value = "";
    renderQueue();
}

function queueDequeue() {
    if (queue.length === 0) return;
    queue.shift();
    renderQueue();
}

/* =========================
   5. BST (LOGIC ONLY)
========================= */

let bst = [];

function bstInsert() {
    const val = Number(document.getElementById("bst-val").value);
    if (isNaN(val)) return;
    bst.push(val);
    document.getElementById("bst-message").innerText = "Inserted: " + val;
}

function bstSearch() {
    const val = Number(document.getElementById("bst-val").value);
    document.getElementById("bst-message").innerText =
        bst.includes(val) ? "Found in tree" : "Not found";
}

function bstInorder() {
    const sorted = bst.slice().sort((a, b) => a - b);
    document.getElementById("bst-message").innerText =
        "Inorder: " + sorted.join(", ");
}

function bstClear() {
    bst = [];
    document.getElementById("bst-message").innerText = "Tree cleared";
}

