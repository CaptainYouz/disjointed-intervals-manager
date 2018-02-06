# Disjointed Intervals Manager

This program manage disjointed intervals of integers.
It is composed of two method `add` and `remove`, that allows user to manage the interval. When using those methods, the result should be an array of disjointed intervals.

### How to use?
This repository is composed by a simple javascript app.
You can start a simple webserver in the directory root, or just open the `index.thml` file in your Chrome browser and you are good to go! (or use the online demo with the link just bellow)

### Online Demo
https://github.com/CaptainYouz/disjointed-intervals-manager/tree/gh-pages

### Example
```
start: []

add(1, 5) => [[1, 5]]

remove(2, 3) => [[1, 2], [3, 5]]

add(6, 8) => [[1, 2], [3, 5], [6, 8]]

remove(4, 7) => [[1, 2], [3, 4], [7, 8]]

add(2, 7) => [[1, 8]]
```
