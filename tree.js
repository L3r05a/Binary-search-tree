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
    //recursive search down root
    //if node.data === value return true
    //
  }
}
