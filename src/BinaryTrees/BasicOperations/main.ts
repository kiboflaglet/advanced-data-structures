type TreeValue = {
    name: string
    count: number
}
class TreeNode {
    value: TreeValue;
    left: TreeNode | null
    right: TreeNode | null

    constructor(value: TreeValue) {
        this.value = value
        this.left = null
        this.right = null
    }
}

const root = new TreeNode({ name: "R", count: 3 })
const nodeA = new TreeNode({ name: "A", count: 4 })
const nodeB = new TreeNode({ name: "B", count: 7 })
const nodeC = new TreeNode({ name: "C", count: 10 })
const nodeD = new TreeNode({ name: "D", count: 6 })
const nodeK = new TreeNode({ name: "K", count: 10 })
const nodeS = new TreeNode({ name: "S", count: 18 })
const nodeE = new TreeNode({ name: "E", count: 8 })
const nodeF = new TreeNode({ name: "F", count: 9 })
const nodeG = new TreeNode({ name: "G", count: 11 })

root.left = nodeA
root.right = nodeB

nodeA.left = nodeC
nodeA.right = nodeD

nodeD.left = nodeK

nodeK.right = nodeS

nodeB.left = nodeE
nodeB.right = nodeF
nodeF.left = nodeG

const depthFirstSearchIteration = (root: TreeNode) => {
    let stack: TreeNode[] = [root]
    while (stack.length > 0) {
        const current = stack.pop()

        console.log({ val: current?.value })

        if (current?.right) {
            stack.push(current.right)
        }

        if (current?.left) {
            stack.push(current.left)
        }
    }
}

// depthFirstSearchIteration()


const depthFirstSearchRecursive = (node: TreeNode) => {
    if (!node) return;

    console.log({ val: node.value })

    if (node.left) depthFirstSearchRecursive(node.left)
    if (node.right) depthFirstSearchRecursive(node.right)
}

// depthFirstSearchRecursive(root)

const breadthFirstSearchIteration = (root: TreeNode) => {
    let queue: TreeNode[] = [root]

    while (queue.length > 0) {
        const current = queue.shift()

        console.log({ val: current?.value })

        if (current?.left) {
            queue.push(current.left)
        }

        if (current?.right) {
            queue.push(current.right)
        }
    }
}

breadthFirstSearchIteration(root)

const breadthFirstSearchRecursive = (node: TreeNode | null) => {
    if (!node) return

    const left = node.left
    const right = node.right

    console.log({ val: node.value })

    if (left) {
        console.log({ val: node.left?.value })
    }

    if (right) {
        console.log({ val: node.right?.value })
    }

    breadthFirstSearchRecursive(left?.left!)
    breadthFirstSearchRecursive(left?.right!)
    breadthFirstSearchRecursive(right?.left!)
    breadthFirstSearchRecursive(right?.right!)
}

// breadthFirstSearchRecursive(root)

const findValueDFSIteration = (val: string, root: TreeNode): boolean => {
    if (!root) return false

    const stack: TreeNode[] = [root]

    while (stack.length > 0) {
        const current = stack.pop() // pops up last item

        if (current?.value.name === val) {
            return true
        }

        if (current?.right) stack.push(current.right) // [right]
        if (current?.left) stack.push(current.left) // [right, left]
    }

    return false
}

const findValueDFSRecursive = (val: string, root: TreeNode): boolean => {
    if (!root) return false

    const node = searchDFS(root, val)

    return !!node
}

const searchDFS = (node: TreeNode, target: string): TreeNode | null => {
    if (!node) return null

    if (node.value.name === target) {
        return node
    }

    const leftResult = searchDFS(node.left!, target)
    if (leftResult) return leftResult
    const rightResult = searchDFS(node.right!, target)
    if (rightResult) return rightResult

    return null

}

// console.log({ resultIteration: findValueDFSIteration("A", root) })
// console.log({ resultRecursive: findValueDFSRecursive("A", root) })

const findValueBFS = (root: TreeNode, target: string): boolean => {

    if (!root) return false

    let queue: TreeNode[] = [root]

    while (queue.length > 0) {
        const current = queue.shift()

        if (current?.value.name === target) {
            return true
        }

        if (current?.left) queue.push(current.left)
        if (current?.right) queue.push(current.right)
    }

    return false

}


// console.log({ resultBFS: findValueBFS(root, "J") })


const treeSumDFSIteration = (root: TreeNode) => {

    if (!root) return 0

    let stack: TreeNode[] = [root]
    let result = 0

    while (stack.length > 0) {
        const current = stack.pop()
        if (current) result += current?.value.count

        if (current?.right) stack.push(current.right)
        if (current?.left) stack.push(current.left)
    }

    return result

}

// console.log({ treeSumDFS: treeSumDFSIteration(root) })

const treeSumDFSRecursive = (root: TreeNode | null): number => {
    if (!root) return 0

    const leftSum = treeSumDFSRecursive(root.left)
    const rightSum = treeSumDFSRecursive(root.right)

    return root.value.count + leftSum + rightSum
}

// console.log({ treeSumDFSRecursive: treeSumDFSRecursive(root) })

const findMinimumDFSIteration = (root: TreeNode) => {
    if (!root) return 0
    let stack: TreeNode[] = [root]
    let minimum = root.value.count
    while (stack.length > 0) {
        const current = stack.pop()
        if (current && current.value.count < minimum) {
            minimum = current.value.count
        }

        if (current?.right) stack.push(current.right)
        if (current?.left) stack.push(current.left)
    }

    return minimum
}

// console.log({ minimumDFSIteration: findMinimumDFSIteration(root) })

const findMinimumDFSRecursive = (node: TreeNode | null, minimum: number): number => {
    if (!node) return minimum
    return Math.min(
        findMinimumDFSRecursive(node.left, Math.min(minimum, node.value.count)),
        findMinimumDFSRecursive(node.right, Math.min(minimum, node.value.count))
    )
}


// console.log({ minimumDFSRecursive: findMinimumDFSRecursive(root, root.value.count) })

const findMinimumBFS = (root: TreeNode): number => {
    let queue: TreeNode[] = [root]
    let minimum = root.value.count

    while (queue.length > 0) {
        const current = queue.shift()

        if (current && current.value.count < minimum) {
            minimum = current.value.count
        }

        if (current?.left) queue.push(current.left)
        if (current?.right) queue.push(current.right)
    }

    return minimum
}

// console.log({ minimumBFS: findMinimumBFS(root) })


const findLongestPathDFSIteration = (root: TreeNode | null): number => {
    if (!root) return 0

    let maxDepth = 0
    let stack: Array<{ node: TreeNode, depth: number }> = [{ node: root, depth: 1 }]

    while (stack.length > 0) {

        const current = stack.pop()

        if (current && maxDepth < current?.depth) {
            maxDepth = current.depth
        }

        if (current?.node.right) {

            stack.push({ node: current.node.right, depth: current.depth + 1 })
        }
        if (current?.node.left) {

            stack.push({ node: current.node.left, depth: current.depth + 1 })
        }
    }

    return maxDepth

}


console.log({ maxPath: findLongestPathDFSIteration(root) })

const findLongestPathDFSRecursive = (root: TreeNode | null, maxDepth: number): number => {
    if (!root) return maxDepth
    return Math.max(findLongestPathDFSRecursive(root.left, maxDepth + 1), findLongestPathDFSRecursive(root.right, maxDepth + 1))
}

console.log({ maxPathRec: findLongestPathDFSRecursive(root, 0) })

const findLongestPathBFS = (root: TreeNode) => {

    let queue: Array<{ node: TreeNode | null, depth: number }> = [{ node: root, depth: 1 }]
    let maxDepth = 0

    while (queue.length > 0) {
        const current = queue.shift()

        if (current && maxDepth < current.depth) {
            maxDepth = current.depth
        }

        if (current?.node?.left) queue.push({node: current.node.left, depth: current.depth + 1})
        if (current?.node?.right) queue.push({node: current.node.right, depth: current.depth + 1})
    }

    return maxDepth

}
console.log({ maxPathBFS: findLongestPathBFS(root) })
