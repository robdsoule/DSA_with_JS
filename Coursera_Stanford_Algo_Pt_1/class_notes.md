Day 1
====
### Why Study Algorithms
- key role in modern technological innovation
- novel 'lens' on processes outside of computer scient and technology
- challenging
- important for all branches of computer science

## Course Topics
*  Vocab, mainly 'Big-Oh'
*  Divide and conquer algorithm design paradigm
  - Will apply to: integer multiplication, sorting, matrix multiplication, closest pair
  - General analysis methods("Master Method/Theorem")
*  Randomization in algorithm design
  - Will apply to: QuickSort, primality testing, graph partitioning, hashing
*  Primitives for reasoning about graphs
  - Connectivity information, shortest paths, structure of information and social networks
*  Use and implementation of data structures
  - Heaps, balanced binary search trees, hashing, and some variants (e.g., bloom filters)

___
### Integer Multiplications
Input: two n-digit numbers x and y.
Output: the product x * y

#### Karatsuba Multiplication
x = 5678     a=56  b=78
y = 1234     c=12  d=34
- Step 1: a * c = 672
- Step 2: b * d = 2652
- Step 3: (a + b)(c + d) = 134 * 46 = 6164
- Step 4: steps: 3 - 2 - 1 = 2840
- Step 5: pad Step1 w/ 4 zeros 6720000, step2 w/ no zeros 2652, step 4 with 2 zeros and add them together.

- Recall: x * y = 10^n * ac + 10^n/2(ad + bc) + bd
- Step 1: recursively compute ac
- Step 2: recursively compute bd
- Step 3: recursively compute (a+b)(c+d) = ~ac~ + ad + bc + ~bd~
- Gauss's trick: step3 - step1 - step2 = ad + bc
- only need 3 recursive multiplication calls and some addition

#### Recursive Algorithm
Write: x = 10^n/2 * a + b  and y = 10^n/2 * c + d
  where a,b,c,d are n/2 - digit numbers.
Then: x * y = (10^n/2 * a + b) * (10^n/2 * c + d)
            = 10^n * ac + 10^n/2(ad + bc) + bd
Idea: recursively compute ac, ad, bc, bd, then compute in straightforward way
Base Case: single digit numbers multiplied together
___
___
### Merge Sort
#### Pseudocode
- Recursively sort 1st half of input array
- Recursively sort 2nd half of input array
- Merge two sorted sublists into one
- Things to Consider:
  *  base case
  *  odd input array
  *  check when you drop off 1st or 2nd array on the merge step
#### RUNNING TIME:
- Running time of merge on array of m numbers is: <= 4m + 2 reduce to 6m 'close enough'
- Claim: merge sort requires <= 6n*log2(n) + 6n operations to sort n numbers
##### Proof Of Claim(assuming n = power of 2):
using 'recursion tree'
level 0: outer call to mergesort-- root o (entire input)
                                    /   \
                                   /     \
level 1: 1st recursive calls     left | right
                                /   \ | /    \
level 2: 2nd recursive calls   L     R|L      R
                               .     . .      .
                               .     . .      .
                               .     . .      .
level log2(n):       (leaves) o o  o o o o   o o

At each level, there are 2^j sub-problems with n/(2^j) items in each sub-problem

<= 2^j+6(n / 2^j) =  6n (independent of j)
    ^---------^ cancels out when reducing
Total:  6n(log2(n))+6n
