# Array

An extended `Array` class with additional utility methods for formatting, comparison, and normalization.

## Installation

```bash
npm install @superhero/array
```

## Usage

### Conjunction and Disjunction Formatting

Locale-aware string formatting using `Intl.ListFormat`:

```javascript
import SuperArray from '@superhero/array'

const list = new SuperArray('apple', 'orange', 'banana')

list.conjunction() // 'apple, orange and banana'
list.disjunction() // 'apple, orange or banana'
```

#### Configure the list formatters:

```javascript
list.locale = 'es'
list.style  = 'short'

list.conjunction() // 'apple, orange y banana'
```

### Array Utilities

Convenient methods for working with arrays:

```javascript
const list = new SuperArray('a', 'b', 'c')

list.last()   // 'c'
list.last(1)  // 'b'

list.intersection(['b', 'c', 'd'], ['c', 'b']) // ['b', 'c']
list.xor(['b', 'x'], ['c', 'y'])               // ['a', 'x', 'y']
list.unique(['a', 'b', 'd'])                   // ['a', 'b', 'c', 'd']
```

### Normalization

Ensure a value is treated as an extended array instance:

```javascript
SuperArray.normalize('x')        // ['x']
SuperArray.normalize(['x', 'y']) // ['x', 'y']
```

## API

### Instance Methods

- `.conjunction(config)`      : Format as conjunction list
- `.disjunction(config)`      : Format as disjunction list
- `.intersection(...arrays)`  : Shared values across all arrays
- `.xor(...arrays)`           : Values exclusive to one array
- `.unique(...arrays)`        : Distinct values across arrays
- `.last(offset)`             : Get the last or offset-last value

### Static Methods

- `Array.normalize(input)`    : Normalize a value into a proper array instance

### Configurations

Set formatting behavior:

```javascript
list.locale = 'en-GB'
list.style  = 'short'
```

## Test Suite

Run tests using:

```bash
npm test
```

### Test Coverage

```
────────────────────────────────── ⋅⋆ Suite ⋆⋅ ─────────────────────────────────


@superhero/array
├─ should format a list using conjunction
│  └─ ✔ passed 19.196708ms
├─ should format a list using disjunction
│  └─ ✔ passed 0.452016ms
├─ should set configuration for "locale" affecting the formatters
│  └─ ✔ passed 0.318799ms
├─ should return correct last item with and without offset
│  └─ ✔ passed 0.391488ms
├─ should compute intersection correctly
│  └─ ✔ passed 1.322853ms
├─ should throw error if non-array passed to intersection
│  └─ ✔ passed 0.756649ms
├─ should compute xor correctly
│  └─ ✔ passed 0.51159ms
├─ should throw error if non-array passed to xor
│  └─ ✔ passed 1.472181ms
├─ should return unique values
│  └─ ✔ passed 0.565676ms
├─ should throw error if non-array passed to unique
│  └─ ✔ passed 0.506743ms
├─ normalize should wrap single values into array
│  └─ ✔ passed 0.308307ms
├─ normalize should return instance unchanged
│  └─ ✔ passed 0.24679ms
├─ normalize should wrap plain array into instance
│  └─ ✔ passed 0.189833ms
└─ ✔ suite passed 28.219359ms


──────────────────────────────── ⋅⋆ Coverage ⋆⋅ ────────────────────────────────


Files                                            Coverage   Branches   Functions
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
index.js                                              95%       100%         85%
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
index.test.js                                        100%       100%        100%
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Total                                                 97%       100%         91%


───────────────────────────────── ⋅⋆ Summary ⋆⋅ ────────────────────────────────


Suites                                                                         1
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Tests                                                                         13
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Passed                                                                        13
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Failed                                                                         0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Cancelled                                                                      0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Skipped                                                                        0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Todo                                                                           0
```

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests for improvements or additional features.
