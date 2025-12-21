### Task 1 — **Undoable Analytics Filter Engine**

You’re building a dashboard where users apply filters.

- Each filter change is a **node**
- Support:
    - `applyFilter(filter)`
    - `undo()`
    - `redo()`
- Undo/redo must be **O(1)**
- No arrays allowed for history

**Goal:**

Model this as a **doubly linked list** where the current state is a pointer.

If you mess this up → infinite bugs in UI history.