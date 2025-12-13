/* =========================
   1. ARRAY & BINARY SEARCH
========================= */

let arrayData = [10, 20, 30];

function renderArray() {
    const visual = document.getElementById("array-visual");
    visual.innerHTML = "";
    arrayData.forEach(val => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = val;
        visual.appendChild(box);
    });
}

renderArray();

function arrayInsert() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);
    if (isNaN(value)) return;

    arrayData.push(value);
    renderArray();
    document.getElementById("array-message").innerText = "Inserted: " + value;
    input.value = "";
}

function arrayDelete() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);

    const index = arrayData.indexOf(value);
    if (index === -1) {
        document.getElementById("array-message").innerText = "Value not found";
        return;
    }

    arrayData.splice(index, 1);
    renderArray();
    document.getElementById("array-message").innerText = "Deleted: " + value;
    input.value = "";
}

function runBinarySearch() {
    const target = Number(document.getElementById("bs-input").value);
    const sorted = [...arrayData].sort((a, b) => a - b);

    let low = 0, high = sorted.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (sorted[mid] === target) {
            document.getElementById("array-message").innerText =
                "Found " + target + " at index " + mid + " (sorted array)";
            return;
        }
        sorted[mid] < target ? low = mid + 1 : high = mid - 1;
    }
    document.getElementById("array-message").innerText = "Not found";
}

/* =========================
   2. STACK (LEFT → RIGHT)
========================= */

const MAX_SIZE = 5;
let stack = [];

function renderStack() {
    const visual = document.getElementById("stack-visual");
    visual.innerHTML = "";
    stack.forEach(item => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = item;
        visual.appendChild(box);
    });
}

function stackPush() {
    const input = document.getElementById("stack-input");
    const value = input.value.trim();
    if (!value) return;

    if (stack.length >= MAX_SIZE) {
        document.getElementById("stack-message").innerText = "Stack Overflow!";
        return;
    }

    stack.push(value);
    renderStack();
    document.getElementById("stack-message").innerText = "Pushed: " + value;
    input.value = "";
}

function stackPop() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack Underflow!";
        return;
    }

    const removed = stack.pop();
    renderStack();
    document.getElementById("stack-message").innerText = "Popped: " + removed;
}

function stackPeek() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack is empty";
        return;
    }
    document.getElementById("stack-message").innerText =
        "Top element: " + stack[stack.length - 1];
}

function stackDisplay() {
    document.getElementById("stack-message").innerText =
        "Stack: " + stack.join(", ");
}

/* =========================
   EXPRESSION CONVERTER
========================= */

function convertExpression() {
    const infix = document.getElementById("infix-input").value;
    document.getElementById("out-infix").innerText = infix;
    document.getElementById("out-postfix").innerText = "(demo output)";
    document.getElementById("out-prefix").innerText = "(demo output)";
}

/* =========================
   3. QUEUE (FIFO)
========================= */

let queue = [];

function renderQueue() {
    const visual = document.getElementById("queue-visual");
    visual.innerHTML = "";
    queue.forEach(item => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = item;
        visual.appendChild(box);
    });
}

function queueEnqueue() {
    const input = document.getElementById("queue-input");
    const value = input.value.trim();
    if (!value) return;

    queue.push(value);
    renderQueue();
    input.value = "";
}

function queueDequeue() {
    if (queue.length === 0) return;
    queue.shift();
    renderQueue();
}

/* =========================
   4 & 5. BST VISUALIZATION
========================= */

let bstRoot = null;

function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function insertBST(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = insertBST(node.left, val);
    else node.right = insertBST(node.right, val);
    return node;
}

function bstInsert() {
    const value = Number(document.getElementById("bst-val").value);
    if (isNaN(value)) return;

    bstRoot = insertBST(bstRoot, value);
    document.getElementById("bst-message").innerText =
        "Inserted: " + value;
}

function bstSearch() {
    const value = Number(document.getElementById("bst-val").value);
    let node = bstRoot;

    while (node) {
        if (node.val === value) {
            document.getElementById("bst-message").innerText = "Found: " + value;
            return;
        }
        node = value < node.val ? node.left : node.right;
    }
    document.getElementById("bst-message").innerText = "Not found";
}

function inorderTraversal(node, result) {
    if (!node) return;
    inorderTraversal(node.left, result);
    result.push(node.val);
    inorderTraversal(node.right, result);
}

function bstInorder() {
    let result = [];
    inorderTraversal(bstRoot, result);
    document.getElementById("bst-message").innerText =
        "Inorder: " + result.join(", ");
}

function bstClear() {
    bstRoot = null;
    document.getElementById("bst-message").innerText = "Tree cleared";
}
