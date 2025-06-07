---
layout: post
title: "Software Testing"
date: 2025-05-22
custom_excerpt: "Introduction"
---

Status: #review  #knowledge \
Tags: #SAT #testing #softwaredev

# CS6340 SAT - Introduction to Software Testing
## Observations
### the need for specifications
- testing checks whether program implementation agrees with program specification
- without a specification, there's nothing to test
- testing a form of consistency checking between implementation and specification
	- recurring theme for software quality checking approaches
	- what if implementation and specification are wrong?
### developer !=Tester
- developer writes implementation, tester writes specification
- unlikely that both will independently make the same mistake
- Specifications useful even if written by developer itself 
	- much simpler than implementation
	- specification unlikely to have same mistake as implementation
### Other observations
- resources are finite
	- limit how many tests are written
	- specifications evolve over time
		- tests must be updated over time
	- an idea: automated testing
### Landscape of Testing
#### Specifications
- Pre- and Post-conditions
#### Measuring Test Suite Quality
- Coverage Metrics
- Mutation Analysis
#### Classification of Testing Approaches
<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2025-05-22-01.png" alt="Description">
  <figcaption>Testing Approaches Matrix</figcaption>
</figure>
- **Manual vs Automated** based on human participation, if the software require more human interaction => more manual testing
- **black-box:** tester can see nothing about the tested program internal mechanisms. Testers can only issue inputs to the program, observe program outputs and determine whether the observed outputs meet the specifications required. 
- **White-box** refers to testing in which the internal details of the program being tested are fully available to the tester. The tester can use these internal details to perform a more precise analysis of the tested program and uncover inputs that are more likely to trigger buggy behavior. 
- **Gray box approaches:** testing behaviors need to not be strictly black box or white box. 
- feedback directed random testing
- symbolic execution that needs to inspect source code
- dynamic analysis in order to discover future tests

### Automated vs Manual Testing
Automated Testing:
- find bugs more quickly
- no need to write tests
- if software changes, no need to maintain tests
Manual Testing
- efficient test suite
- potentially better coverage

### Black-box vs white-box testing
Black-box testing:
- can work with code that cannot be modified
- doesn't need to analyze or study code
- code can be in any format (managed, binary, obfuscated)
White-box
- efficient test suite
- potentially better coverage

### Automated testing problem
- automated testing is hard to do
- probably impossible for entire systems
- certainly impossible without specifications
### Pre- and post-conditions
A pre-condition is a predicate assumed to hold before a function executes, one use of it is to ensure that a function does not operate in an undefined way on inputs that it was not designed to handle.
A post-condition is a predicate expected to hold after a function executes whenever the pre-condition also holds, one use of it is to ensure that a function's output matches its specification (i.e. a function that squares a real number should not output a negative number).

pre- and post-condition can be considered as a special case of assertions, which we saw in the first lesson
#### Condition Example
<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2025-05-22-02.png" alt="Description">
  <figcaption>Testing Approaches Matrix</figcaption>
</figure>

This code defines a generic Stack class template with a single method. Let me break it down:
**Class Structure:**
- `class Stack<T>` - This is a template class where `T` is a placeholder for any data type
- `T[] array` - An array that stores elements of type `T`
- `int size` - Tracks the current number of elements in the stack
- `pop()` is a **stack operation** that removes and returns the top element from the stack.

**The pop() method:**
- **Precondition:** `s.size() > 0` - The stack must not be empty before calling pop
- **Implementation:** `return array[--size];` - This decrements the size counter and returns the element at that position
- **Postcondition:** `s'.size() == s.size() - 1` - After the operation, the new size is one less than the original size

**How it works:** The `--size` is key here - it's pre-decrement, so if the stack originally has 3 elements (size = 3), calling pop() will:
1. Decrement size from 3 to 2
2. Return `array[2]` (the top element, since array indices are 0-based)

**The size() method:** Simply returns the current value of the `size` variable.

**Preconditions and Postconditions** are formal specifications that define what must be true before and after a method executes. They're part of **Design by Contract**, a programming methodology that treats software components like legal contracts.

**Preconditions**
- **What:** Conditions that must be true when a method is called
- **Who's responsible:** The caller must ensure these are met
- **Purpose:** Define valid inputs and system states

**Postconditions**
- **What:** Conditions guaranteed to be true when a method returns successfully
- **Who's responsible:** The method implementation must ensure these hold
- **Purpose:** Define what the method promises to deliver

**How They Work with Assertions**
Assertions are runtime checks that verify these contracts:
```java
public T pop() {
    // Precondition assertion
    assert size > 0 : "Stack is empty - cannot pop";
    
    T result = array[--size];
    
    // Postcondition assertion  
    assert size >= 0 : "Size became negative after pop";
    
    return result;
}
```

#### More..
Pre- and post-conditions 
- Most useful if they are executable 
	- written in the programming language itself
	- a special case of assertions
- Need not be precise
	-  may become more complex than the code
	- but useful even if they do not cover every situation
#### Process of using Pre- and post-conditions 
<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2025-05-22-03.png" alt="Description">
  <figcaption>Pre- and Post-Condition</figcaption>
</figure>
this framework doesn't help write tests, but help with automating testing runs

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2025-05-22-04.png" alt="Description">
  <figcaption>Executable Post-conditions</figcaption>
</figure>


### How good is your test suit?
- how do we know that our test suite is good?
	- too few tests: may miss bugs
	- too many tests.: costly to run, bloat and redundancy, harder to maintain
- two approaches
	- code coverage metrics
	- mutation analysis (or mutation testing)
#### Code coverage
- Metric to quantify extent to which a program's code is tested by a given test suite
- Given as percentage of some aspect of the program executed in the tests
- Function coverage: fucntions called
- statement coverage: statements executed
- branch coverage: branches taken
- 
#### Mutation Analysis



---

# References