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
                `Found ${target} at index ${mid}`;
            return;
        }
        sorted[mid] < target ? low++ : high--;
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

const canvas = document.getElementById("bst-canvas");
const ctx = canvas.getContext("2d");

let bstRoot = null;
let isBusy = false;

/* ---- NODE ---- */
function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.visited = false;
    this.highlight = false;
}

/* ---- INSERT ---- */
function insertBST(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = insertBST(node.left, val);
    else node.right = insertBST(node.right, val);
    return node;
}

function bstInsert() {
    const value = Number(document.getElementById("bst-val").value);
    if (isNaN(value)) return;

    clearAllStates(bstRoot);
    bstRoot = insertBST(bstRoot, value);
    drawTree();
    document.getElementById("bst-message").innerText = "Inserted: " + value;
}

/* ---- CLEAR STATES ---- */
function clearAllStates(node) {
    if (!node) return;
    node.visited = false;
    node.highlight = false;
    clearAllStates(node.left);
    clearAllStates(node.right);
}

/* ---- SEARCH (ANIMATED, STAYS) ---- */
function bstSearch() {
    if (!bstRoot || isBusy) return;
    isBusy = true;

    clearAllStates(bstRoot);
    let value = Number(document.getElementById("bst-val").value);
    let path = [];
    let node = bstRoot;

    while (node) {
        path.push(node);
        if (node.val === value) break;
        node = value < node.val ? node.left : node.right;
    }

    let i = 0;
    function step() {
        if (i > 0) path[i - 1].highlight = false;
        if (i >= path.length) {
            const last = path[path.length - 1];
            if (last && last.val === value) last.visited = true;
            document.getElementById("bst-message").innerText =
                last && last.val === value ? "Found: " + value : "Not found";
            drawTree();
            isBusy = false;
            return;
        }
        path[i].highlight = true;
        drawTree();
        i++;
        setTimeout(step, 600);
    }
    step();
}

/* ---- TRAVERSALS (ANIMATED & STAY) ---- */

function inorderTraversal(node, arr) {
    if (!node) return;
    inorderTraversal(node.left, arr);
    arr.push(node);
    inorderTraversal(node.right, arr);
}

function preorderTraversal(node, arr) {
    if (!node) return;
    arr.push(node);
    preorderTraversal(node.left, arr);
    preorderTraversal(node.right, arr);
}

function postorderTraversal(node, arr) {
    if (!node) return;
    postorderTraversal(node.left, arr);
    postorderTraversal(node.right, arr);
    arr.push(node);
}

function animateTraversal(list, label) {
    if (isBusy) return;
    isBusy = true;
    clearAllStates(bstRoot);

    let i = 0;
    let result = [];

    function step() {
        if (i >= list.length) {
            document.getElementById("bst-message").innerText =
                `${label}: ` + result.join(" → ");
            isBusy = false;
            return;
        }
        list[i].visited = true;
        result.push(list[i].val);
        drawTree();
        i++;
        setTimeout(step, 600);
    }
    step();
}

function bstInorder() {
    let list = [];
    inorderTraversal(bstRoot, list);
    animateTraversal(list, "Inorder");
}

function bstPreorder() {
    let list = [];
    preorderTraversal(bstRoot, list);
    animateTraversal(list, "Preorder");
}

function bstPostorder() {
    let list = [];
    postorderTraversal(bstRoot, list);
    animateTraversal(list, "Postorder");
}

function bstClear() {
    bstRoot = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("bst-message").innerText = "Tree cleared";
}

/* ---- DRAW TREE ---- */

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    calculatePositions(bstRoot, canvas.width / 2, 40, canvas.width / 4);
    drawEdges(bstRoot);
    drawNodes(bstRoot);
}

function calculatePositions(node, x, y, gap) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - gap, y + 70, gap / 2);
    calculatePositions(node.right, x + gap, y + 70, gap / 2);
}

function drawEdges(node) {
    if (!node) return;
    if (node.left) drawLine(node, node.left);
    if (node.right) drawLine(node, node.right);
    drawEdges(node.left);
    drawEdges(node.right);
}

function drawLine(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = "#a18cd1";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawNodes(node) {
    if (!node) return;
    drawCircle(node);
    drawNodes(node.left);
    drawNodes(node.right);
}

function drawCircle(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);

    if (node.highlight) ctx.fillStyle = "#ffd166";
    else if (node.visited) ctx.fillStyle = "#ff9a9e";
    else ctx.fillStyle = "#b56576";

    ctx.fill();
    ctx.strokeStyle = "#6d597a";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
                            }
