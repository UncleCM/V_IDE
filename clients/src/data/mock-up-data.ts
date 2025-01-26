const mockQuestions: Record<string, Question> = {
    'question-1': {
      id: 1,
      name: 'Implement Quicksort Algorithm',
      number: '1',
      language: 'Python',
      duration: {
        hours: '0',
        minutes: '45'
      },
      tags: ['sorting', 'recursion'],
      tutorial: 'This question covers the implementation of the Quicksort algorithm. Quicksort is a divide-and-conquer algorithm that works by selecting a "pivot" element from the array, and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.',
      question: 'Write a Python function to implement the Quicksort algorithm. The function should take a list of numbers as input and return the sorted list.',
      fullCodeTest: 'The full code test will involve passing in unsorted lists of various lengths and checking that the function returns the correct sorted list.',
      score: '5',
      testCases: [
        {
          id: 1,
          description: 'Sort a list of 10 random integers',
          score: 2
        },
        {
          id: 2,
          description: 'Sort a list of 50 random integers',
          score: 3
        }
      ],
      testData: [
        {
          id: 1,
          description: 'List of 10 random integers',
          score: 2
        },
        {
          id: 2,
          description: 'List of 50 random integers',
          score: 3
        }
      ]
    },
    'question-2': {
      id: 2,
      name: 'Implement Merge Sort Algorithm',
      number: '2',
      language: 'Python',
      duration: {
        hours: '1',
        minutes: '0'
      },
      tags: ['sorting', 'divide-and-conquer'],
      tutorial: 'This question covers the implementation of the Merge Sort algorithm. Merge Sort is a divide-and-conquer algorithm that works by dividing the input array into two halves, calling itself for the two halves, and then merging the two sorted halves.',
      question: 'Write a Python function to implement the Merge Sort algorithm. The function should take a list of numbers as input and return the sorted list.',
      fullCodeTest: 'The full code test will involve passing in unsorted lists of various lengths and checking that the function returns the correct sorted list.',
      score: '6',
      testCases: [
        {
          id: 1,
          description: 'Sort a list of 20 random integers',
          score: 3
        },
        {
          id: 2,
          description: 'Sort a list of 100 random integers',
          score: 3
        }
      ],
      testData: [
        {
          id: 1,
          description: 'List of 20 random integers',
          score: 3
        },
        {
          id: 2,
          description: 'List of 100 random integers',
          score: 3
        }
      ]
    }
  };
  
  export { mockQuestions };