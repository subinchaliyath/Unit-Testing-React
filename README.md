# Getting Started with Unit Test

How to setup and use Jest and Enzyme to test a React application created with Create React App (CRA)

## Installation

npm install --save-dev enzyme enzyme-adapter-react-16

### Step 1
Create a setupTests.js file at ./src/setupTests.js:

```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

### Terms

#### Shallow
Renders only the single component, not including its children. This is useful to isolate the component for pure unit testing.

#### Jest will look for tests in any of the following places:
Files with .js suffix in __tests__ folders.
Files with .test.js suffix.
Files with .spec.js suffix.

