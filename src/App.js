import { useState } from "react"; // Import the useState hook from React

function App() {
  // Declare a state variable `pepperoniIsChecked` and a function to update it `setPepperoniIsChecked`.
  // Initialize `pepperoniIsChecked` to `false`, meaning the checkbox is unchecked by default.
  const [pepperoniIsChecked, setPepperoniIsChecked] = useState(false);

  // Event handler for the checkbox's `onChange` event.
  // It receives the event object, from which we can get the checkbox's new checked status.
  function togglePepperoni(e) {
    setPepperoniIsChecked(e.target.checked); // Update the state with the checkbox's current checked value
  }

  return (
    <div>
      <h1>Select Pizza Toppings</h1>

      {/* Input element for the "Add pepperoni" checkbox */}
      <input
        type="checkbox" // Specifies that this is a checkbox input
        id="pepperoni" // Unique ID to link with the label for accessibility
        checked={pepperoniIsChecked} // Controls the checked state of the checkbox based on React state
        aria-checked={pepperoniIsChecked} // ARIA attribute for assistive technologies, mirrors `checked`
        onChange={togglePepperoni} // Assign the handler function to update state when the checkbox is clicked
      />
      {/* Label for the checkbox, associated via `htmlFor` attribute */}
      <label htmlFor="pepperoni">Add pepperoni</label>

      <h2>Your Toppings:</h2>
      <ul>
        {/* "Cheese" topping is always present */}
        <li>Cheese</li>
        {/* Conditionally render "Pepperoni" list item ONLY if `pepperoniIsChecked` is true */}
        {pepperoniIsChecked ? <li>Pepperoni</li> : null}
      </ul>
    </div>
  );
}

export default App; // Export the App component so it can be used in other files (like `index.js` or `App.test.js`)