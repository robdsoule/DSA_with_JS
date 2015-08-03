# Week 2

## The Master Method

#### Algorithm #1
* T(n) = maximum number of operations this algorithm needs to multiply two n-digit numbers.
* Recurrence: express T(n) in terms of running time of recursive calls.
* Base case: T(1) <= a constant.
* For all n > 1: T(n) <= 4T(n/2) + O(n)

#### Algorithm #2 (Gauss)
* recursively compute ac, bd, (a+b)(c+d), ad+bc = 3 - 1 - 2
* Base case: T(1)<= a constant.
* For all n>1: T(n) <= 3T(n/2) + O(n)

## The Master Method AKA Master Theorem
* Cool feature: a "black box" for solving recurrences.
* Assumption: all subproblems have equal size.
* Recurrence Format
  - Base case: T(n) <= a constant for all sufficiently small n.
  - For all larger n: T(n) <= a * T(n/b) + O(n^d)
  - where a = number of recursive calls (>= 1)
  - b = input size shrinkage factor ( > 1)
  - d = exponent in running time of "combine step" (>= 0)
  - a, b, d are independent of n
```
       { O(n^d * log(n))  }    if a = b^d (case 1)
T(n) = { O(n^d)           }    if a < b^d (case 2)
       { O(n^log.b(a))    }    if a > b^d (case 3)
```
Note: in case 1 we don't have to factor in for the log base be it 2 or e but in case 3 where it is in the exponent we most certainly have to take it into account.

### Examples

#### Ex #1 Merge Sort
```
a = 2
b = 2  ]_ b^d = 2 => case 1
d = 1  ]

=> T(n) <= O(n^d * log(n)) = O(n * log(n))
```
#### Ex #2 Binary Search
```
a = 1
b = 2  ]_ b^d = 1 => case 1
d = 0  ]

=> T(n) <= O(n^d * log(n)) = O(1 * log(n)) = O(log(n))
```
#### Ex #3 Algo #1
```
a = 4
b = 2  ]_ b^d = 2 < a  so case 3
d = 1  ]

=> T(n) <= O(n^log.2(4)) = O(n^2)
```
#### Ex #4 Gauss
```
a = 3
b = 2  ]_ b^d = 2 < a case 3
d = 1  ]

=> T(n) <= O(n^log.2(3)) = O(n^1.59)
```
#### Ex #5 Strassen's Matrix Multiplication Algorithm
```
a = 7
b = 2  ]_ b^d = 4 < a  case 3
d = 2  ]

=> T(n) <= O(n^log.2(7)) = O(n^2.81)
- beats the naive iterative algorithm
```
#### Ex #6 Fictitious For Case 2
```
T(n) <= 2T(n/2) + O(n^2)
a = 2
b = 2  ]_ case 1
d = 2  ]

=> T(n) = O(n^2)
```
___

## Quicksort
* O(n log(n)) time 'on average', works in place (minimal extra memory needed
* KEY IDEA: partition array around a -> Pivot Element <-
  - Pick element of array (first) for simplicity sake to start)
  - rearrange array so that:
    * left of pivot => less than pivot
    * right of pivot => greater than pivot
    * Put's Pivot in its 'rightful position'

##### 2 Facts about Partition Subroutine
1) linear O(n) time, no extra memory
2) reduces problem size

#### High-Level Description of Quicksort
```
Quicksort(arrayA, lengthN)
  if n = 1 return
  p = choose Pivot(A,n) naive way choose first element
  Partition A around p
  recursively sort 1st part
  recursively sort 2nd part
```
#### Partitioning around a Pivot

##### In-Place Implementation
* Assume: pivot = 1st element of array, if not swap pivot <-> 1st element as preprocessing step
* High Level Idea:
```
| p |  <p   | >p  |  ?      ?     |
    | partitioned | unpartitioned |
```
* Single scan through array
* invariant: everything looked at so far is partitioned
* Partition Subroutine:
```
Partition (A, l, r) [input ~ A[l...r]]
 p := A[l]
 i := l + 1
 for j = l + 1 to r
   if A[j] < p       //if A[j]>p, do nothing
     swap A[j] and A[i]
     i := i + 1
  swap A[l] and A[i-1]
```
* Running Time = O(n), where n = r-l+1 is the length of the input (sub)array.
* Reason: O(1) work per array entry.
* Also: clearly works in place (repeated swaps)

##### Importance of the Pivot
* Question: running time of Quicksort?
* Answer: depends on the quality of the pivot.
* Suppose Quicksort always selects first element of the array.  What is the running time of this algorithm on an input array that is already sorted?
  - O(n^2)
  - Reason: Only one recursive call on a size of 1 less. (2...n) then (3...n) then (4...n) etc.
  - Runtime: >= n + (n-1) + (n-2) ..... + 1 = O(n^2)

* Suppose Quicksort selects the median of the array for the pivot.
  - O(n*log(n))
  - T(n) <= 2T(n/2) + O(n)
  - => T(n)= O(nlogn) [Like mergesort]

##### How to Choose Random Pivots
* Key Question: How to choose pivots?? Big Idea: Random Pivots!
* In every recursive call, choose the pivot randomly. (each element equally likely)
* Hope: a random pivot is 'pretty good' 'often enough'.
* Intuition:
  1) if always get a 25-75 split, good enough for O(nlogn) running time
  2) half of elements give a 25-75 split or better

#### Average Running Time of QuickSort
* Quicksort Theorem: for every input array of length n, the average running time of Quicksort (with random pivots) is O(nlog(n))
* Note: holds for -every- input. [no assumptions on the data]
  - "average" is over random choices made by the algorithm (i.e. pivot choices)

Fix input array A of length n
* Sample Space Omega = all possible outcomes of random choices in Quicksort (ie, pivot sequences)
* Key Random variable:
  - C(a) = # of comparisons between two input elements made by Quicksort (given random choices a)
* Remaining Goal: E[C] = O(n logn)
  - Note: Can't apply MasterMethod (random unbalanced subproblems)
  - [A = fixed input array]
  - Notation: Z.i = i^th smallest element of A
```
  [ 6 ,  8 ,  10,  2 ]
  [Z.2, Z.3, Z.4, Z.1]

For a element Omega, indices i < j, let
  X.ij(a) = # of times Z.i, Z.j get compared in Quicksort with pivot sequence a
```

###### Proof Of Key Claim
* Fix Z.i, Z.j with i < j
* Consider the set Z.i, Z.i+1,...,Z.j-1, Z.j
* Inductively: as long as none of these are chosen as a pivot, all are passed to the same recursive call.
* Consider the first among this set that gets chosen as a pivot
  - if Z.i or Z.j gets chosen first, then Z.i and Z.j get compared
  - if one of Z.i+1,...,Z.j-1 gets chosen first, then Z.i & Z.j are ->NEVER<- compared [split into different recursive calls]
  - Note: since pivots always chosen uniformly at random, each of the set is equally likely to be the first
  - => Pr[Z.i, Z.j get compared] = 2 / (j-i + 1)

