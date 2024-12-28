import { Question } from '../types/questions';

export const questions: Question[] = [
  {
    id: 1,
    title: "Simple Print",
    description: "Write a Python program to print 'Hello, World!' and your name on separate lines.",
    example: "print('Hello, World!')\nprint('John')\n\nOutput:\nHello, World!\nJohn",
    defaultCode: "# Write your code here to print Hello, World! and your name\n",
  },
  {
    id: 2,
    title: "Basic Calculation",
    description: "Write a Python program that calculates the area of a rectangle given its length and width.",
    example: "length = 5\nwidth = 3\narea = length * width\nprint(f'Area of rectangle: {area}')\n\nOutput:\nArea of rectangle: 15",
    defaultCode: "# Calculate the area of a rectangle\nlength = 5\nwidth = 3\n\n# Write your code here\n",
  },
  {
    id: 3,
    title: "Simple Loop",
    description: "Write a Python program that prints the first 5 numbers and their squares using a for loop.",
    example: "for i in range(1, 6):\n    print(f'{i} squared is {i**2}')\n\nOutput:\n1 squared is 1\n2 squared is 4\n3 squared is 9\n4 squared is 16\n5 squared is 25",
    defaultCode: "# Write a loop to print numbers 1-5 and their squares\n",
  },
];