type EventSteam = {
    action: 'click' | 'view' | 'purchase'
}

class EventSteamNode {
    value: EventSteam;
    count: number = 1;
    next: EventSteamNode | null = null;
    constructor(value: EventSteam) {
        this.value = value
    }
}

class EventSteamActions {
    private head: EventSteamNode | null = null;
    private current: EventSteamNode | null = null;

    applyEvent(event: EventSteam) {
        const newNode = new EventSteamNode(event)

        if (!this.current) {
            this.head = newNode;
            this.current = newNode;
            return;
        }

        if (newNode.value.action === this.current?.value.action)  {
            this.current.count += 1;
            return;
        }


        this.current.next = newNode;
        this.current = newNode;

    }

    showAll() {
        let node = this.head
        while(node !== null) {
            console.log({node: `${node.value.action} - (${node.count}x)`})
            node = node.next
        }
    }
}

const actions: EventSteam[] = [
    {action: "click"},
    {action: "click"},
    {action: "click"},
    {action: "view"},
    {action: "view"},
    {action: "purchase"}
]

const eventSteamAction = new EventSteamActions();

actions.forEach(item => {
    eventSteamAction.applyEvent(item)
})

eventSteamAction.showAll()