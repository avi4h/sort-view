# Sorting Visualizer

[Sorting Visualizer](https://avi4h.github.io/sorting-visualizer/) is a web application that provides an animated visualization of various sorting algorithms. With this tool, you can see how algorithms like Bubble Sort, Comb Sort, Heap Sort, Insertion Sort, Selection Sort, and Shell Sort work in action. This README file will guide you through the usage and features of the application.

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Algorithms](#algorithms)
- [How Does It Work](#how-does-it-work)
- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Sorting algorithms are fundamental in computer science, and understanding how they work is essential for any programmer. VisualSort aims to make this learning process more engaging and intuitive by providing animated visualizations of popular sorting algorithms. Whether you're a beginner looking to grasp the basics or an experienced developer wanting to explore algorithm behavior in depth, sorting visualizer can help.

## Demo

You can check out a live demo of sorting visualizer - [here](https://avi4h.github.io/sorting-visualizer/).

## Algorithms

It currently supports the following sorting algorithms:

- Bubble Sort
- Comb Sort
- Heap Sort
- Insertion Sort
- Selection Sort
- Shell Sort

These algorithms have been implemented and animated to help you visualize their inner workings step by step.

## How Does It Work

### Animation Object

The core here is animation object, which contains frames that store the indices of elements to be highlighted and/or swapped during the sorting process. These frames essentially represent the "steps" of the algorithm.

Here's an example of what an animation object might look like:

```javascript
animation = {
    "frames": [
        {
            "elements": [],
            "highlights": [0, 1]
        },
        {
            "elements": [0, 1],
            "highlights": [0, 1]
        },
        // Additional frames...
    ]
}
```

## Usage

The animation object is created within a sorting algorithm function. Specific events, such as element comparisons and swaps, are recorded as frames of the animation.
Here's an example of how the Bubble Sort algorithm is implemented :

```javascript
class Algorithms {
    static bubble(elements, order) {
        let solution = new Animation();
        let swapped = false;

        for (let i = 0; i < elements.length; ++i) {
            swapped = false;
            for (let j = 0; j < elements.length - 1; ++j) {
                solution.addFrame(new Frame([], [j, j + 1])); // Record to-be-highlighted elements

                if (order == "desc" ? elements[j] < elements[j + 1] : elements[j] > elements[j + 1]) {
                    swapped = true;

                    const temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    solution.addFrame(new Frame([j, j + 1], [j, j + 1])); // Record to-be-swapped & to-be-highlighted elements
                }
            }

            if (!swapped) {
                break;
            }
        }
        return solution;
    }
}
```

## Animating the Algorithm
The animation is played by a function that highlights the current elements in a frame and/or swaps them. This step-by-step animation helps users understand how the sorting algorithm progresses.

## Installation
If you want to run this visualizer locally or contribute to its development, follow these steps:

Clone the repository:
```
git clone https://github.com/yourusername/sorting-visualizer.git
```

Install the necessary dependencies:
```
npm install
```

Start the development server:
```
npm start
```

Access the application in your web browser at http://localhost:3000.

## Contributing

Contributions to this project are welcome! Whether you want to add support for new sorting algorithms, improve the user interface, or fix bugs, please feel free to fork the [repository](https://github.com/avi4h/sorting-visualizer/) and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/cpl1-0-txt/) file for details.


