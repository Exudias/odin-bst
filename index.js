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

let tree = new Tree([1, 2, 6, 45, 7 , 10, 12 ,2, 40]);
prettyPrint(tree.root);
console.log(tree.find(10));
prettyPrint(tree.root);