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

