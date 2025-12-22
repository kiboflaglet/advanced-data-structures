type Filter = {
    field: "country" | "date" | "metric";
    value: string | number;
    operator: "=" | "<" | ">"
}

class FilterNode { // double link 
    value: Filter
    prev: FilterNode | null = null;
    next: FilterNode | null = null;

    constructor(value: Filter) {
        this.value = value
    }
}

class FilterNodeHistory {
    private head: FilterNode | null = null;
    private current: FilterNode | null = null

    applyFilter(filter: Filter): void {

        const newNode = new FilterNode(filter) // node2

        if (!this.current) {
            this.head = newNode;
            this.current = newNode;
            return;
        }

        this.current.next = null;

        newNode.prev = this.current
        this.current.next = newNode
        this.current = newNode

    }

    undo(): Filter | null {

        if (!this.current) return null

        this.current = this.current.prev
        return this.current?.value || null
    }

    redo(): Filter | null {

        if (!this.current) return null

        if (this.current.next) {
            this.current = this.current.next
            return this.current.value
        }

        return null
    }

    getCurrent(): Filter | null {

        return this.current?.value || null
    }

    isLastAction(): boolean {
        return !this.current?.next
    }

    showAll() {
        console.log("show all")
        let node = this.head
        while (node !== null) {
            console.log({ value: node.value })
            node = node.next
        }

    }
}

// process

const filters: Filter[] = [
    { field: 'country', operator: '=', value: 'AZ' },
    { field: 'metric', operator: '>', value: 1000 },
    { field: 'date', operator: '=', value: '2025-01-01' },
    { field: 'country', operator: '<', value: '2024-01-01' }
]

const history = new FilterNodeHistory()

history.applyFilter(filters[0] as Filter)
history.applyFilter(filters[1] as Filter)
history.undo()
history.applyFilter(filters[2] as Filter)
const isLastAction = history.isLastAction()
history.showAll()
history.getCurrent()



const current = history.getCurrent()

console.log({ current })
console.log({ isLastAction })

