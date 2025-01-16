import { Question } from '../types/questions';
import { LANGUAGE_VERSIONS } from '../constants';

// Get supported languages from LANGUAGE_VERSIONS
const supportedLanguages = Object.keys(LANGUAGE_VERSIONS);

export const questions: Question[] = [
  {
    id: 1,
    title: "Python Function: Calculate Factorial",
    description: "Write a Python function to calculate the factorial of a number using recursion.",
    example: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

# Test the function
print(factorial(5))  # Output: 120
print(factorial(3))  # Output: 6`,
    defaultCode: `def factorial(n):
    # Write your recursive factorial function here
    pass

# Test cases
print(factorial(5))
print(factorial(3))`,
    language: "python"
  },
  {
    id: 2,
    title: "Rust Function: String Reversal",
    description: "Write a Rust function to reverse a string.",
    example: `fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}

fn main() {
    let result = reverse_string("Hello, Rust!");
    println!("{}", result);  // Output: !tsuR ,olleH
}`,
    defaultCode: `fn reverse_string(s: &str) -> String {
    // Write your string reversal function here
}

fn main() {
    let result = reverse_string("Hello, Rust!");
    println!("{}", result);
}`,
    language: "rust"
  },
  {
    id: 3,
    title: "C++ Function: Array Sum",
    description: "Write a C++ function to calculate the sum of an array of integers.",
    example: `#include <iostream>
using namespace std;

int array_sum(int arr[], int size) {
    int sum = 0;
    for(int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    cout << "Sum: " << array_sum(arr, size) << endl;  // Output: Sum: 15
    return 0;
}`,
    defaultCode: `#include <iostream>
using namespace std;

int array_sum(int arr[], int size) {
    // Write your array sum function here
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    cout << "Sum: " << array_sum(arr, size) << endl;
    return 0;
}`,
    language: "cpp"
  }
];