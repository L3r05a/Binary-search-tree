import { Tree } from "./tree.js";

// helper
// prints structure of tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// const test = new Tree([]);
const test = new Tree([1, 2, 3]);
// test.insert(1);
// test.insert(9);
// test.insert(12);
// test.insert(0);
// test.insert(19);
// test.insert(90);
// test.deleteItem(1);
// test.deleteItem(2);
// test.deleteItem(4);
// test.deleteItem(99);

prettyPrint(test.root);
console.log(test.root);

const collected = [];

test.inOrderForEach((value) => {
  collected.push(value);
});

// test.levelOrderForEachRec((value) => {
//   collected.push(value);
// });

console.log(collected);
