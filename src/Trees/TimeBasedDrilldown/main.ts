type Event = {
    timestamp: string,
    message: string
}
type EventPerMonth = {
    time: string;
    eventCount: number
}

type TopDayPerYear = {
    time: string;
    eventCount: number;
}
class TreeNode {
    key: number;
    label: string;
    children: Map<number, TreeNode>
    events: Event[]
    constructor(key: number, label: string = 'Year') {
        this.key = key
        this.children = new Map()
        this.events = []
        this.label = label
    }
}

class TimeBasedTree {
    private root = new Map<number, TreeNode>()

    addEvent(e: Event) {
        const date = new Date(e.timestamp)
        const yearKey = date.getUTCFullYear()
        const monthKey = date.getUTCMonth()
        const dayKey = date.getUTCDate()

        // year node
        let yearNode = this.root.get(yearKey) || new TreeNode(yearKey)
        this.root.set(yearKey, yearNode)

        // month node
        let monthNode = yearNode.children.get(monthKey) || new TreeNode(monthKey, 'Month')
        yearNode.children.set(monthKey, monthNode)

        // day node
        let dayNode = monthNode.children.get(dayKey) || new TreeNode(dayKey, 'Day')
        dayNode.events.push(e)
        monthNode.children.set(dayKey, dayNode)

    }

    totalEventsPerMonth(): EventPerMonth[] {

        const eventsPerMonth: EventPerMonth[] = []

        for (const yearNode of this.root.values()) {
            for (const monthNode of yearNode.children.values()) {
                let eventCount = 0
                for (const dayNode of monthNode.children.values()) {
                    eventCount += dayNode.events.length
                }
                eventsPerMonth.push({
                    time: new Date(Date.UTC(yearNode.key, monthNode.key)).toISOString(),
                    eventCount
                })
            }
        }

        return eventsPerMonth
    }

    topDayPerYear(): TopDayPerYear[] {

        let topDay: TopDayPerYear[] = []

        for (const yearNode of this.root.values()) {
            let time: string | null = null
            let eventCount = 0
            for (const monthNode of yearNode.children.values()) {
                for (const dayNode of monthNode.children.values()) {
                    if (eventCount < dayNode.events.length) {
                        eventCount = dayNode.events.length
                        time = new Date(Date.UTC(yearNode.key, monthNode.key, dayNode.key)).toISOString()
                    }
                }
            }
            if (eventCount > 0 && time) {
                topDay.push({
                    time,
                    eventCount,
                })
            }
        }

        return topDay
    }

    printTree() {
        for (const yearNode of this.root.values()) {
            this.printNode(yearNode, 0)
        }
    }

    private printNode(node: TreeNode, depth: number) {
        const indent = " ".repeat(depth)

        console.log(indent, "-", node.key, "->", node.label)

        if (node.events.length > 0) {
            console.log(`${indent} events:`)
            node.events.forEach((event, index) =>
                console.log(`${indent}${indent}${index + 1}) ${event.message}`)
            )
        }

        for (const child of node.children.values()) {
            this.printNode(child, depth + 1)
        }

    }
}

const tree = new TimeBasedTree()
tree.addEvent({ timestamp: '2023-10-01T10:00:00Z', message: "start coding" })
tree.addEvent({ timestamp: '2022-10-01T10:00:00Z', message: "go to book store" })
tree.addEvent({ timestamp: '2023-10-01T12:00:00Z', message: "meeting" })
tree.addEvent({ timestamp: '2023-11-05T09:30:00Z', message: "happy birthday" })
const totalEventsPerMonth = tree.totalEventsPerMonth()
const topDayPerYear = tree.topDayPerYear()
console.log({ totalEventsPerMonth })
console.log({ topDayPerYear })