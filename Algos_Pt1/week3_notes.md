## Week 3
### Randomized Selection
* Can't sort any faster than O(n log n) but this isn't sorting
  - IE Quicksort mergesort etc
* Next: O(n) time randomized by modifying Quicksort.
```
Randomized Selection
Rselect(arrayA, length n, order statistic i) {
  if (n = 1) { return A[0] }
  - choose pivot p from A uniformly at random
  - partition A around p, let j = new index of p
  if (j = i) { return p; }
  if (j > i) { return RSelect(1st part of A, j-1, i); }
  if (j < i) { return RSelect(2nd part of A, n-j, i-j); }
}
```
* WORST Case Running Time: O(n^2)  Quadratic, just like Quicksort, if each pivot chosen is the smallest element, only peels off one element each recursive call
* Best pivot: the median, can be circular if that is the element we are looking for
* If pivot is median => would get recurrence T(n) <= T(n/2) + O(n);
  - Plug into Master Method and shows T(n) = O(n)
* Hope: Random selection is 'good enough'
* RSelect Theorem:
  - for every input array of length n, the average running time of RSelect is O(n).
  - holds for EVERY input [no assumptions on data]
  - "average" is over random pivot choices made by the algorithm

### Deterministic Selection
* Goal: find pivot guaranteed to be pretty good
* Key Idea: use 'median of medians'
* A deterministic choose pivot:
```
ChoosePivot(A, n) {
  logically break A into n/5 groups of size 5 each
  sort each group (e.g., using MergeSort)
  copy n/5 medians (i.e., middle element of each sorted group) into new array C
  recursively compute median of C (!)
  return this as pivot
}

note need base case below
DSelect(array A, length n, order statistic i) {
  break A into groups of 5, sort each group
  C = the n/5 "middle elements"
  p = Select(C, n/5, n/10) [recursively computes median of C]
  Partition A around p
  if (j = i) { return p; }

  if (j < i) { return Select(1st part of A, j-1, i); }
  elseif (j > i) { return Select(2nd part of A, n-j, i-j); }
}
```
* DSelect Theorem: for every input array of length n, DSelect runs in O(n) time.
* Warning: not as good as RSelect in practice
  - worse constants (hidden within O() notation)
  - not in place
___

* Asymptotic running time of Step 1 of dselect:
  - O(n), Note: sorting an array with 5 elements takes <= 120 operations, so tiny it's constant time (n / 5) * 120 = 1
* Step 2: O(n)
* Step 3: T(n/5))
* Step 5: constant time
* Step 6 & 7: T( ?? )  don't know the input size so can't know complexity of this step
  - Rough Recurrence:
  - Let T(n) = maximum running time of DSelect on an input array of length n.
  - There is a constant C >= 1 such that :
    1) T(1) = 1
    2) T(n) <= Cn + T(n/5) + T(?)

### Graphs and the Contraction Algorithm
#### Two Ingredients
* vertices aka nodes (V)
* edges (E) = pairs of vertices
  - can be undirected (unordered pair)
  - can be directed (ordered pair) aka arcs
#### Cuts of Graphs
* Definition: a cut of a graph (V, E) is a partition of V into two non-empty sets A and B.
* The Crossing Edges: of a cut(A, B) are those with:
  - one endpoint in each of (A, B) -[undirected]-
  - tail in A, head in B -[directed]-
##### Minimum Cut Problem
* Input: an undirected graph G = (V, E)
  - parallel edges allowed
* Goal: compute a cut with fewest number of crossing edges

* Applications:
  - identify network bottleneck / weaknesses
  - community detection in social networks
  - image segmentation
    * input = graph of pixels
    * use edge weights
    * hope: repeated min cuts identifies the primary objects in picture

* Graph Representation:
  - Sparse Vs. Dense Graphs
```
Let n = # of vertices, m = # of edges   COMMON LABELING DON'T REVERSE
In most(but not all) applications, m is Omega(n), and O(n^2)

- in a 'sparse graph', m is O(n) or close to it
- in a 'dense graph', m is closer to Theta(n^2)
```
  - The Adjacency Matrix
```
Represent G by a nxn O-1 matrix A, where
A.ij = 1 <=> G has an i-j edge i--j

variants:
- A.ij = #of i-j edges (if parallel edges)
- A.ij = weight of i-j edge (if any)
- A.ij = { +1 if i-->j || -1 if i<--j }

- Generally speaking space for an adjacency matrix is Theta(n^2)
- In a sparse graph this is a wasteful representation
```
  - Adjacency Lists
```
Ingredients:
- array (or list) of vertices (n)
- array (or list) of edges (m)
- each edge points to its endpoints
- each vertex points to edges incident on it

- Space for a adjacency list = Theta(n + m)
```
  - Which is better?
    * Depends on graph density and operations needed.
    * This course: focus on adjacency lists

##### Random Contraction Algorithm
```
While there are more than 2 vertices:
- pick a remaining edge (u, v) uniformly at random
- merge (or "contract") u and v into a single vertex
- remove self-loops
return cut represented by final 2 vertices

--------
What is probability of Success??

Fix a graph G=(V,E) with n vertices, m edges.
Fix a minimum cut (A,B)
Let k = # of edges crossing (A, B)  (call these edges F)

What could go wrong?
1) Suppose an edge of F is contracted at some point => algorithm WILL NOT output (A, B)
2) Suppose only edges inside A or inside B get contracted => algorithm WILL output (A, B)

Thus: Pr[output is (A, B)] = Pr[never contracts an edge of F]
Let S.i = event that an edge of F contracted in iteration i
Pr of screwing up: (# of crossing edges / # of total edges)  ~ k/m
First Iteration: chance of screwing up  <= 1 - 2/n
Second Iteration: chance of screwing up (1 - 2/n-1)
Third Iteration: chance of screwing up (1 - 2/n-2) etc etc

Reduced probability >= 1/n^2 sorta sucks
Problem: low success probability BUT: non-trivial
Solution: run the basic algorithm a large number N times, remember smallest cut found

Question: how many trials needed?
Let T.i = event that the cut (A,B) is found on the i`th try
  => by definition, different T.i's are independent

Probability by running independent random = 1/n
-----------------------------------------
-->>> Trials needed: O(n^2 * log n) <<<--
-----------------------------------------
Claim: Using adjacency matrices, it's possible to run Karger's algorithm once in time O(n^2)

Running time: polynomial in n and m but slow Omega(n^2 m)
  But: can get big speedups to roughly O(n^2) with more ideas

prg #3 ans: 17
```

