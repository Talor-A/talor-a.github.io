---
layout: post
title: Remaking 8-puzzle solver in python
custom-css: circuit-board
---

I [previously]({% post_url 2019-03-03-8-puzzle %}) wrote about making an 8-puzzle solver in java. See that post for an overview of the problem and my first implementation.

## Project Description

The included `solver.py` file contains an algorithm that finds the best way to go from any given scrambed puzzle to a solved one. The program uses the popular A* algorithm to find a solution in as few moves as possible. It uses a priority queue based on a minHeap named `frontier` to determine the next move, and a Set named `explored` to keep track of the moves we've already made. 

## Results

 When run from the terminal, the `__main__() ` method of `solver.py` will show this output, where each line is a successive move from initial state progressing to the goal state at the end. 

```shell
$ python solver.py
done! solution:
(1, 4, 2, 6, 7, 5, 8, 3, 0)
(1, 4, 2, 6, 7, 0, 8, 3, 5)
(1, 4, 2, 6, 0, 7, 8, 3, 5)
(1, 4, 2, 6, 3, 7, 8, 0, 5)
(1, 4, 2, 6, 3, 7, 0, 8, 5)
(1, 4, 2, 0, 3, 7, 6, 8, 5)
(1, 4, 2, 3, 0, 7, 6, 8, 5)
(1, 4, 2, 3, 7, 0, 6, 8, 5)
(1, 4, 2, 3, 7, 5, 6, 8, 0)
(1, 4, 2, 3, 7, 5, 6, 0, 8)
(1, 4, 2, 3, 0, 5, 6, 7, 8)
(1, 0, 2, 3, 4, 5, 6, 7, 8)
(0, 1, 2, 3, 4, 5, 6, 7, 8)
```

## Conclusion

I enjoyed implementing this program in python, and I learned a lot about the language that I didn't know before. The implementation ended up being similar to my Java one, but with a few key differences. First, I found that the lack of strong types gave me some errors, for example I had to change my puzzles from `list` to `tuple` halfway through and it would've been easier to track down everywhere I needed to make changes if the objects were typed. I also had to find a heap implementation online, rather than using a built in solution like Java's `PriorityQueue`. The part I enjoyed with Python was not having to store everything in a class. For example, I had the `solve()` method defined by itself, which makes more sense for a single algorithm than an entire class to encapuslate it.

When creating this project I learned a lot of new things about the Python language, even though I thought I already knew a fair amount. For example, I had to create a Node class to be used in the A* algorithm and the class needed many hidden methods implemented, for example   `__eq__()` for determining equality and `__hash__()` to place the node into a python `set()`.  I didn't know that many of these methods existed to be implemented, and it gave me a better understanding of how the language works. 

# Source Code

## Solver.py
```python
import queue
from node import Node
from heap import Heap

# determine if a node is the goal state (0..8 ascending)
def is_goal(node:Node):
  return node.puzzle == tuple(range(0,9))

# find the solution state for a certain puzzle
def solve(puzzle:tuple):

  # create root node
  root = Node(puzzle)

  # check if puzzle can be solved
  if(root.n() == 1):
    print("puzzle is unsolvable. exiting.")
    return None

  #frontier: priority queue of possible moves
  #explored: set of all moves we have already checked
  frontier = Heap()
  explored = set()
  frontier.push((root.f(),root))

  while(len(frontier) > 0):
    _, curr = frontier.pop()
    
    # stop if we have found the solution
    if is_goal(curr):
      return curr
    
    # we have now visited this node, so add it to explored set
    explored.add(curr)

    # find out what our next possible moves are
    children = curr.get_children()

    for child in children:
      #if we have not already visited this child and have not queued it for visiting
      if child not in explored and child not in frontier._heap:
        frontier.push((child.f(),child))
      
      #if we plan to visit this node already, but via a different route
      elif child in frontier._heap:
        i = frontier._heap.index(child)
        other = frontier._heap[i]
        # if this is a better path than the one we have planned, take this one instead
        if(child.f() < other.f()):
          frontier._heap[i] = child
          frontier.__heapify()
  
  # this will only happen if a solution is unreachable (puzzle may be malformed)
  print("queue emptied")
          
# tail-recursive print the moves we took to view them in order
def print_parent(node):
  if(node is not None):
    print_parent(node.parent)
    print(node)

if __name__ == "__main__":
    node = solve([1, 4, 2, 6, 7, 5, 8, 3, 0])
    if(node is not None):
      print('done! solution:')
      print_parent(node)
```


## Node.py
```python
class Node:
  """
    puzzle: a tuple of len(9) that this node will represent
    parent: another node or None if this is the root
  """
  def __init__(self, puzzle:tuple, parent = None):
    self.puzzle = tuple(puzzle)
    self.parent = parent

    # Calculate h(n) - estimated distance to goal
    self.h = 0
    for i in range(len(puzzle)):
      current = puzzle[i]

      if current != 0 and current != i:
        self.h = self.h + 1

    # Calculate g(n) - depth
    if self.parent is None:
      self.g = 0
    else:
      self.g = self.parent.g + 1
  
  """
      for a node n, f(n) is its estimated cost. 
      h(n) is the estimated cost to get to the goal.
      g(n) is the cost we have spent to get to this node.
      so, f(n) is an estimate of the total cost from start -> end.
  """
  def f(self):

    return self.h + self.g
  """
    if n % 2 = 1 for the root node, this puzzle is unsolvable.
  """
  def n(self): 
    inversions = 0

    for i in range(1, len(self.puzzle)):
      for j in range(0,i):
        prev = self.puzzle[j]
        curr = self.puzzle[i]
        if prev != 0 and prev > curr: 
          inversions += 1
    
    return inversions % 2
  """
  generate list of all possible nodes we can get to from here
  """
  def get_children(self): 
    children = []
    zpos = self.puzzle.index(0)

    neighbors =  [
        zpos - 1, #left
        zpos + 1, #right
        zpos - 3, #top
        zpos + 3  #bottom
    ]
    for npos in neighbors:

      if npos >= 0 and npos < 9:
        child = list(self.puzzle)
        child[zpos], child[npos] = child[npos], child[zpos]
        child = Node(child, self)

        children.append(child)
    
    return children

  """
    equality is based on the puzzle state
    but self.f() and other.f() can be different
  """
  def __eq__(self, other): 

    return type(other) == type(self) and self.puzzle == other.puzzle

  """
    uses tuple __str__
  """
  def __str__(self):
    return str(self.puzzle)
  """
    used to compute our place in the explored set
  """
  def __hash__(self):
    return hash(self.puzzle)
  """
    used to find the right order in the priority queue
  """
  def __lt__(self, other):
    return self.f() < other.f()
```

