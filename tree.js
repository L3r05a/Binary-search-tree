import { Node } from "./node.js";

export class Tree {
  root;
  constructor(array) {
    this.root = this.buildTree(array);
  }
  //Methods
  buildTree(array) {
    //remove duplicates, sorts ascending
    const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);

    //base case for empty range
    function recursiveBST(uniqueSorted, start, end) {
      if (start > end) {
        return null;
      }
      //round down integer, mid node
      let mid = Math.floor(start + (end - start) / 2);

      //root node from mid
      let rootNode = new Node(uniqueSorted[mid]);

      //recursive left/right of root
      rootNode.left = recursiveBST(uniqueSorted, start, mid - 1);
      rootNode.right = recursiveBST(uniqueSorted, mid + 1, end);

      //root and left/right return
      return rootNode;
    }

    //call for recursive BST using sorted array
    function sortedArraytoBST(arr) {
      return recursiveBST(arr, 0, arr.length - 1);
    }

    return sortedArraytoBST(uniqueSorted);
  }
  //returns boolean for value existence
  includes(value) {
    //helper recursive function
    function recSearch(node, value) {
      if (node === null) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      if (node.data > value) {
        return recSearch(node.left, value);
      }

      return recSearch(node.right, value);
    }
    //helper call
    return recSearch(this.root, value);
  }
  //Inserts new node with (value)
  insert(value) {
    //insert node

    //recursive helper
    function recSearch(node, key) {
      //empty node, insert
      if (node === null) {
        return new Node(key);
      }
      //node already exists
      if (key === node.data) {
        return node;
      }
      //node is larger
      if (node.data > key) {
        node.left = recSearch(node.left, key);
      } else {
        node.right = recSearch(node.right, key);
      }

      return node;
    }
    //stores call result
    this.root = recSearch(this.root, value);
  }
  //Removes node from tree by (value)
  deleteItem(value) {
    //helper successor finder
    function getSuccessor(current) {
      //inorder successor(smallest in right subtree)
      current = current.right;
      while (current !== null && current.left !== null) {
        current = current.left;
      }
      return current;
    }
    //helper recursion
    function delNode(root, key) {
      //empty root
      if (root === null) {
        return root;
      }

      if (root.data > key) root.left = delNode(root.left, key);
      else if (root.data < key) root.right = delNode(root.right, key);
      else {
        //Node with 0 or 1 child
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        //node with 2 children
        const successor = getSuccessor(root);
        //replaces root with successor
        root.data = successor.data;
        //removes successor
        root.right = delNode(root.right, successor.data);
      }

      return root;
    }
    this.root = delNode(this.root, value);
  }
  //executes callback to each value in the tree nodes
  levelOrderForEach(callback) {
    //no callback parameter error
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    //empty root
    if (this.root === null) return;

    //seed queue
    const queue = [this.root];

    //while queue not empty
    while (queue.length !== 0) {
      //current replaced by next queue node and cleared from queue
      const current = queue.shift();

      //callback with current.data per pass
      callback(current.data);
      //block null children and push to queue
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }
  //Recursive version passing the queue
  levelOrderForEachRec1(callback) {
    //no callback parameter error
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    //empty root
    if (this.root === null) return;
    const queue = [this.root];
    //helper
    function rec(q) {
      //base case
      if (q.length === 0) return;
      const current = q.shift();
      callback(current.data);
      if (current.left !== null) q.push(current.left);
      if (current.right !== null) q.push(current.right);
      rec(q);
    }
    rec(queue);
  }

  //recursive version using height
  levelOrderForEachRec2(callback) {
    //no callback parameter error
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    //empty root
    if (this.root === null) return;

    //height function (nodes)
    function height(node) {
      //base case is height of no node
      if (node === null) return 0;
      //add 1 to the tallest subtree
      return 1 + Math.max(height(node.left), height(node.right));
    }

    function visitLevel(node, level) {
      //a recursive function that visits every level
      if (node === null) return;
      if (level === 0) {
        //callback every node
        callback(node.data);
        return;
      }
      visitLevel(node.left, level - 1);
      visitLevel(node.right, level - 1);
    }

    const levels = height(this.root);
    for (let level = 0; level < levels; level++) {
      visitLevel(this.root, level);
    }
  }

  // inorder(left,root,right)
  inOrderForEach(callback) {
    this.#traverse(callback, "in");
  }
  //preorder (root,left,right)
  preOrderForEach(callback) {
    this.#traverse(callback, "pre");
  }

  //postorder(left, right,root)
  postOrderForEach(callback) {
    this.#traverse(callback, "post");
  }

  #traverse(callback, order) {
    //no callback parameter error
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    function visit(node) {
      if (node === null) return;
      if (order === "pre") callback(node.data);
      visit(node.left);
      if (order === "in") callback(node.data);
      visit(node.right);
      if (order === "post") callback(node.data);
    }
    visit(this.root);
  }
  // number of edges from value to furthest leaf
  height(value) {
    function findNode(node, value) {
      if (node === null) return undefined;

      if (node.data === value) {
        return node;
      }
      if (node.data > value) {
        return findNode(node.left, value);
      }
      return findNode(node.right, value);
    }
    const target = findNode(this.root, value);

    function measure(node) {
      //to return 0 a leaf has to be +1 -1
      if (node === null) return -1;
      return 1 + Math.max(measure(node.left), measure(node.right));
    }
    if (target === undefined) return undefined;
    return measure(target);
  }
}
