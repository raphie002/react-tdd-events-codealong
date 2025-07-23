import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent for simulating user interactions
import App from "../App"; // Import the App component to be tested
import '@testing-library/jest-dom'; // Import jest-dom matchers for extended assertions

// Test the initial state of the page
test("pizza checkbox is initially unchecked", () => {
  render(<App />); // Render the App component
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i }); // Find the checkbox by its accessible role and name
  expect(addPepperoni).not.toBeChecked(); // Assert that the checkbox is not checked
});

test("toppings list initially contains only cheese", () => {
  render(<App />); // Render the App component

  // Assert that there's initially only one list item
  expect(screen.getAllByRole("listitem").length).toBe(1);
  // Assert that "Cheese" is present in the document
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  // Assert that "Pepperoni" is NOT present in the document initially
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

// Test the effect of clicking the checkbox
test("checkbox appears as checked when user clicks it", () => {
  render(<App />); // Render the App component
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i }); // Get the checkbox

  userEvent.click(addPepperoni); // Simulate a user click on the checkbox

  expect(addPepperoni).toBeChecked(); // Assert that the checkbox is now checked
});

test("topping appears in toppings list when checked", () => {
  render(<App />); // Render the App component
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i }); // Get the checkbox

  userEvent.click(addPepperoni); // Simulate clicking the checkbox to add pepperoni

  // Assert that there are now two list items
  expect(screen.getAllByRole("listitem").length).toBe(2);
  // Assert that both "Cheese" and "Pepperoni" are in the document
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

// Test the effect of clicking the checkbox a second time
test("selected topping disappears when checked a second time", () => {
  render(<App />); // Render the App component
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i }); // Get the checkbox

  // First click: add pepperoni
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  // Second click: remove pepperoni
  userEvent.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked(); // Assert checkbox is unchecked again
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument(); // Assert Pepperoni is no longer present
});