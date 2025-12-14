/* =========================
   BST WITH FULL ANIMATIONS
========================= */

const canvas = document.getElementById("bst-canvas");
const ctx = canvas.getContext("2d");

let bstRoot = null;
let animationQueue = [];
let animating = false;

/* ===== NODE STRUCTURE ===== */

function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.highlight = false;
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

    bstRoot = insertBST(bstRoot, value);
    drawTree();
    document.getElementById("bst-message").innerText = "Inserted: " + value;
}

/* ===== SEARCH (ANIMATED PATH) ===== */

function bstSearch() {
    const value = Number(document.getElementById("bst-val").value);
    animationQueue = [];
    let node = bstRoot;

    while (node) {
        animationQueue.push(node);
        if (node.val === value) break;
        node = value < node.val ? node.left : node.right;
    }

    animateNodes("Search Path");
}

/* ===== TRAVERSALS ===== */

function bstInorder() {
    animationQueue = [];
    inorder(bstRoot);
    animateNodes("Inorder");
}

function bstPreorder() {
    animationQueue = [];
    preorder(bstRoot);
    animateNodes("Preorder");
}

function bstPostorder() {
    animationQueue = [];
    postorder(bstRoot);
    animateNodes("Postorder");
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

/* ===== ANIMATION ENGINE ===== */

function animateNodes(label) {
    if (animating) return;
    animating = true;

    let index = 0;
    let result = [];

    function step() {
        clearHighlights(bstRoot);

        if (index >= animationQueue.length) {
            animating = false;
            document.getElementById("bst-message").innerText =
                label + ": " + result.join(" → ");
            drawTree();
            return;
        }

        const node = animationQueue[index];
        node.highlight = true;
        result.push(node.val);

        drawTree();
        index++;

        setTimeout(step, 700); // animation speed
    }

    step();
}

function clearHighlights(node) {
    if (!node) return;
    node.highlight = false;
    clearHighlights(node.left);
    clearHighlights(node.right);
}

/* ===== CLEAR TREE ===== */

function bstClear() {
    bstRoot = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("bst-message").innerText = "Tree cleared";
}

/* ===== DRAWING ===== */

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
    ctx.fillStyle = node.highlight ? "#ff6f91" : "#ff9a9e";
    ctx.fill();
    ctx.strokeStyle = "#6d597a";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}
