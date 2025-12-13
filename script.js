/* =========================
   ARRAY & BINARY SEARCH
========================= */

let array = [];

function arrayInsert() {
    const input = document.getElementById("array-input");
    const value = input.value;
    if (value === "") return;

    array.push(Number(value));
    input.value = "";
    renderArray();
}

function arrayDelete() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);

    array = array.filter(v => v !== value);
    input.value = "";
    renderArray();
}

function runBinarySearch() {
    const target = Number(document.getElementById("bs-input").value);
    array.sort((a, b) => a - b);

    let low = 0, high = array.length - 1;
    let foundIndex = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (array[mid] === target) {
            foundIndex = mid;
            break;
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    document.getElementById("array-message").innerText =
        foundIndex !== -1 ? "Found at index " + foundIndex : "Not found";
}

function renderArray() {
    const visual = document.getElementById("array-visual");
    visual.innerHTML = "";

    array.forEach(value => {
        const item = document.createElement("div");
        item.className = "data-item";
        item.innerText = value;
        visual.appendChild(item);
    });
}

/* =========================
   STACK (MAX 5)
========================= */

let stack = [];
const MAX_STACK = 5;

function stackPush() {
    const input = document.getElementById("stack-input");
    const value = input.value;

    if (value === "") return;

    if (stack.length >= MAX_STACK) {
        document.getElementById("stack-message").innerText = "Stack Overflow!";
        return;
    }

    stack.push(value);
    input.value = "";
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
        stack.length ? "Top element: " + stack[stack.length - 1] : "Stack empty";
}

function stackDisplay() {
    document.getElementById("stack-message").innerText =
        stack.length ? stack.join(", ") : "Stack empty";
}

function renderStack() {
    const visual = document.getElementById("stack-visual");
    visual.innerHTML = "";

    stack.slice().reverse().forEach(value => {
        const item = document.createElement("div");
        item.className = "data-item";
        item.innerText = value;
        visual.appendChild(item);
    });
}

/* =========================
   QUEUE
========================= */

let queue = [];

function queueEnqueue() {
    const input = document.getElementById("queue-input");
    const value = input.value;
    if (value === "") return;

    queue.push(value);
    input.value = "";
    renderQueue();
}

function queueDequeue() {
    if (queue.length === 0) return;

    queue.shift();
    renderQueue();
}

function renderQueue() {
    const visual = document.getElementById("queue-visual");
    visual.innerHTML = "";

    queue.forEach(value => {
        const item = document.createElement("div");
        item.className = "data-item";
        item.innerText = value;
        visual.appendChild(item);
    });
}

/* =========================
   BST (LOGIC ONLY)
========================= */

let bst = [];

function bstInsert() {
    const input = document.getElementById("bst-val");
    const value = Number(input.value);

    if (isNaN(value)) return;

    bst.push(value);
    input.value = "";
    document.getElementById("bst-message").innerText = "Node inserted";
}

function bstSearch() {
    const value = Number(document.getElementById("bst-val").value);

    document.getElementById("bst-message").innerText =
        bst.includes(value) ? "Value found in tree" : "Value not found";
}

function bstInorder() {
    const sorted = bst.slice().sort((a, b) => a - b);
    document.getElementById("bst-message").innerText =
        "Inorder Traversal: " + sorted.join(", ");
}

function bstClear() {
    bst = [];
    document.getElementById("bst-message").innerText = "Tree cleared";
}
