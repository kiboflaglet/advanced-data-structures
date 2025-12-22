### Task — **Time-Based Drilldown Tree**

Build a tree like:

```
Year
 └─ Month
     └─ Day
         └─ Events

```

Requirements:

- Insert events dynamically
- Query:
    - total events per month
    - top day per year
- Traversal must be **DFS-based**
- No pre-flattening data