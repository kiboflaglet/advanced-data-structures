### Task — **Event Stream Compaction**

You receive a real-time event stream (clicks, views).

- Events come as nodes in a linked list
- Multiple consecutive events of same type should be **merged**
- You must modify pointers, not rebuild the list

Example:

```
click → click → click → view → view → purchase

```

Becomes:

```
click(x3) → view(x2) → purchase(x1)

```


