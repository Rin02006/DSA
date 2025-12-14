/* =========================
   BST WITH PERSISTENT ANIMATION
========================= */

const canvas = document.getElementById("bst-canvas");
const ctx = canvas.getContext("2d");

let bstRoot = null;
let animationQueue = [];
let animating = false;

/* ===== NODE ===== */

function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.highlight = false; // current animation
    this.visited = false;   // stays colored
}

/* ===== INSERT ===== */

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

/* ===== SEARCH (STAYS HIGHLIGHTED) ===== */

function bstSearch() {
    if (!bstRoot) return;

    const value = Number(document.getElementById("bst-val").value);
    animationQueue = [];
    clearAllStates(bstRoot);

    let node = bstRoot;
    while (node) {
        animationQueue.push(node);
        if (node.val === value) break;
        node = value < node.val ? node.left : node.right;
    }

    animateSearch(value);
}

function animateSearch(target) {
    if (animating) return;
    animating = true;

    let index = 0;

    function step() {
        clearHighlightOnly(bstRoot);

        if (index >= animationQueue.length) {
            const last = animationQueue[animationQueue.length - 1];
            if (last && last.val === target) {
                last.visited = true; // stay highlighted
                document.getElementById("bst-message").innerText =
                    "Found: " + target;
            } else {
                document.getElementById("bst-message").innerText =
                    "Not found";
            }

            drawTree();
            animating = false;
            return;
        }

        const node = animationQueue[index];
        node.highlight = true;

        drawTree();
        index++;
        setTimeout(step, 700);
    }

    step();
}

/* ===== TRAVERSALS (STAY COLORED) ===== */

function bstInorder() {
    startTraversal("Inorder", inorder);
}

function bstPreorder() {
    startTraversal("Preorder", preorder);
}

function bstPostorder() {
    startTraversal("Postorder", postorder);
}

function startTraversal(label, fn) {
    if (!bstRoot || animating) return;

    animationQueue = [];
    clearAllStates(bstRoot);
    fn(bstRoot);

    animateTraversal(label);
}

function inorder(node) {
    if (!node) return;
    inorder(node.left);
    animationQueue.push(node);
    inorder(node.right);
}

function preorder(node) {
    if (!node) return;
    animationQueue.push(node);
    preorder(node.left);
    preorder(node.right);
}

function postorder(node) {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    animationQueue.push(node);
}

function animateTraversal(label) {
    animating = true;
    let index = 0;
    let result = [];

    function step() {
        if (index >= animationQueue.length) {
            animating = false;
            document.getElementById("bst-message").innerText =
                label + ": " + result.join(" → ");
            return;
        }

        const node = animationQueue[index];
        node.highlight = true;
        node.visited = true;
        result.push(node.val);

        drawTree();
        index++;

        setTimeout(step, 700);
    }

    step();
}

/* ===== CLEAR ===== */

function bstClear() {
    bstRoot = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("bst-message").innerText = "Tree cleared";
}

/* ===== HELPERS ===== */

function clearAllStates(node) {
    if (!node) return;
    node.highlight = false;
    node.visited = false;
    clearAllStates(node.left);
    clearAllStates(node.right);
}

function clearHighlightOnly(node) {
    if (!node) return;
    node.highlight = false;
    clearHighlightOnly(node.left);
    clearHighlightOnly(node.right);
}

/* ===== DRAW TREE ===== */

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!bstRoot) return;

    calculatePositions(bstRoot, canvas.width / 2, 50, canvas.width / 4);
    drawConnections(bstRoot);
    drawNodes(bstRoot);
}

function calculatePositions(node, x, y, gap) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - gap, y + 70, gap / 2);
    calculatePositions(node.right, x + gap, y + 70, gap / 2);
}

function drawConnections(node) {
    if (!node) return;

    if (node.left) {
        drawLine(node, node.left);
        drawConnections(node.left);
    }
    if (node.right) {
        drawLine(node, node.right);
        drawConnections(node.right);
    }
}

function drawLine(parent, child) {
    ctx.beginPath();
    ctx.moveTo(parent.x, parent.y);
    ctx.lineTo(child.x, child.y);
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

    if (node.highlight) ctx.fillStyle = "#ff6f91";     // active animation
    else if (node.visited) ctx.fillStyle = "#845ec2"; // stays colored
    else ctx.fillStyle = "#ff9a9e";

    ctx.fill();
    ctx.strokeStyle = "#6d597a";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}
