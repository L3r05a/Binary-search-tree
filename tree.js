import { Node } from "./node.js";

export class Tree {
  root;
  constructor(array) {
    this.root = this.buildTree(array);
  }

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

  includes(value) {
    //returns boolean for value existence

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
}
