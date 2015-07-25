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
