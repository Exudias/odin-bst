class Node
{
    constructor(val)
    {
        this.data = val;
        this.left = null;
        this.right = null;
    }

    isleaf()
    {
        return this.left === null && this.right === null;
    }
}

class Tree
{
    constructor(arr)
    {
        this.root = this.buildTree(arr);
    }

    buildTree(arr)
    {
        if (arr.length === 0) return null;

        // Remove duplicates and sort
        arr = [...new Set(arr)];
        arr.sort((a, b) => a - b);
        
        let mid = Math.floor(arr.length / 2);
        let root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }

    insert(value)
    {
        let curr = this.root;

        while (curr !== null)
        {
            if (curr.data > value)
            {
                if (curr.left === null)
                {
                    curr.left = new Node(value);
                    break;
                }
                else
                {
                    curr = curr.left;
                }
            }
            else if (curr.data < value)
            {
                
                if (curr.right === null)
                {
                    curr.right = new Node(value);
                    break;
                }
                else
                {
                    curr = curr.right;
                }
            }
            else
            {
                break;
            }
        }
    }
    
    deleteItem(value)
    {
        this.deleteAt(value, this.root);
    }

    deleteAt(value, node)
    {
        if (node === null) return null;

        if (node.data > value)
        {
            node.left = this.deleteAt(value, node.left);
        }
        else if (node.data < value)
        {
            node.right = this.deleteAt(value, node.right);
        }
        else
        {
            if (node.left === null && node.right === null)
            {
                return null;
            }
            if (node.left === null)
            {
                return node.right;
            }
            if (node.right === null)
            {
                return node.left;
            }

            node.data = this.minimum(node.right);
            node.right = this.deleteAt(node.data, node.right);
        }

        return node;
    }

    minimum(node)
    {
        if (node.left === null) return node.data;

        return this.minimum(node.left);
    }

    find(value)
    {
        return this.findAt(value, this.root);
    }

    findAt(value, node)
    {
        if (node === null) return null;

        if (value > node.data)
        {
            return this.findAt(value, node.right);
        }
        else if (value < node.data)
        {
            return this.findAt(value, node.left);
        }

        return node;
    }

    levelOrder(callback)
    {
        let h = this.height(this.root);

        let out = []

        for (let i = 1; i <= h; i++)
        {
            let row = this.levelOrderAt(callback, this.root, i);
            if (!callback)
            {
                out = out.concat(row);
            }
        }
        if (!callback) return out;
    }

    levelOrderAt(callback, node, level)
    {
        if (node === null) return [];

        if (level === 1)
        {
            if (!callback)
            {
                return [node.data];
            }
            callback(node);
        }
        else
        {
            let l = this.levelOrderAt(callback, node.left, level - 1);
            let r = this.levelOrderAt(callback, node.right, level - 1);
            if (!callback) return l.concat(r);
        }
    }

    height(root)
    {
        if (root === null) return 0;

        let lheight = this.height(root.left);
        let rheight = this.height(root.right);

        if (lheight > rheight)
        {
            return lheight + 1;
        }
        else
        {
            return rheight + 1;
        }
    }

    depth(node)
    {
        return this.depthAt(node, this.root);
    }

    depthAt(node, root)
    {
        if (root === null || node.data === root.data) return 1;

        if (node.data > root.data)
        {
            return 1 + this.depthAt(node, root.right);
        }

        return 1 + this.depthAt(node, root.left);
    }

    inOrder(callback)
    {
        let res = this.inOrderAt(callback, this.root);
        if (!callback) return res;
    }

    inOrderAt(callback, root)
    {
        if (!root) return [];

        let l = this.inOrderAt(callback, root.left);
        if (callback)
        {
            callback(root);
        }
        let r = this.inOrderAt(callback, root.right);
        if (!callback) return (l.concat([root.data])).concat(r);
    }

    preOrder(callback)
    {
        let res = this.preOrderAt(callback, this.root);
        if (!callback) return res;
    }

    preOrderAt(callback, root)
    {
        if (!root) return [];

        if (callback)
        {
            callback(root);
        }
        let l = this.preOrderAt(callback, root.left);
        let r = this.preOrderAt(callback, root.right);
        if (!callback) return ([root.data].concat(l)).concat(r);
    }

    postOrder(callback)
    {
        let res = this.postOrderAt(callback, this.root);
        if (!callback) return res;
    }

    postOrderAt(callback, root)
    {
        if (!root) return [];

        let l = this.postOrderAt(callback, root.left);
        let r = this.postOrderAt(callback, root.right);
        if (callback)
        {
            callback(root);
        }
        if (!callback) return (l.concat(r)).concat([root.data]);
    }

    isBalanced(root)
    {
        return Math.abs(this.height(root.left) - this.height(root.right)) <= 1;
    }

    rebalance()
    {
        let arr = this.inOrder();
        this.root = this.buildTree(arr);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => 
{
    if (node === null) 
    {
        return;
    }
    if (node.right !== null) 
    {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) 
    {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const printText = (node) =>
{
    console.log(">> " + node.data + " <<");
}

function driver()
{
    console.log("Generating tree with 10 random numbers under 100...");
    let tree = new Tree(createArrayOfRandomNumbers(10));
    console.log("Checking if tree is balanced:");
    console.log(tree.isBalanced(tree.root));
    console.log("Printing in level order:");
    console.log(tree.levelOrder());
    console.log("Printing in pre order:");
    console.log(tree.preOrder());
    console.log("Printing in post order:");
    console.log(tree.postOrder());
    console.log("Printing in order:");
    console.log(tree.inOrder());
    console.log("Inserting several numbers above 100 to unbalance tree...");
    tree.insert(110);
    tree.insert(111);
    tree.insert(112);
    tree.insert(113);
    console.log("Checking if tree is balanced (it shouldn't be):");
    console.log(tree.isBalanced(tree.root));
    console.log("Balancing tree...");
    tree.rebalance();
    console.log("Checking if tree is balanced:");
    console.log(tree.isBalanced(tree.root));
    console.log("Printing in level order:");
    console.log(tree.levelOrder());
    console.log("Printing in pre order:");
    console.log(tree.preOrder());
    console.log("Printing in post order:");
    console.log(tree.postOrder());
    console.log("Printing in order:");
    console.log(tree.inOrder());
}

function createArrayOfRandomNumbers(length)
{
    out = [];
    for (let i = 0; i < length; i++)
    {
        out.push(getRandInt(100));
    }
    return out;
}

function getRandInt(max)
{
    return Math.floor(Math.random() * max);
}

driver();