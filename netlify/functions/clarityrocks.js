// clarityrock.mjs

import { generateSkylineSmartRock } from './skylineRockEngine.mjs';

// Grab elements from the page
const inputField = document.querySelector('#userInput');
const generateBtn = document.querySelector('#generate');
const outputField = document.querySelector('#output');
const loadingSpinner = document.querySelector('#loading');

// Hide the loading spinner on load
if (loadingSpinner) loadingSpinner.style.display = 'none';

// Handle button click
generateBtn.addEventListener('click', async () => {
  const userInput = inputField.value.trim();

  if (!userInput) {
    outputField.innerHTML = '<p style="color:red;">Please enter a Rock idea to get started.</p>';
    return;
  }

  // Show loading animation
  outputField.innerHTML = '';
  if (loadingSpinner) loadingSpinner.style.display = 'inline-block';

  try {
    const result = await generateSkylineSmartRock(userInput);
    outputField.innerHTML = result;
  } catch (err) {
    console.error('Error generating Rock:', err);
    outputField.innerHTML = '<p style="color:red;">Something went wrong. Please try again.</p>';
  } finally {
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = 'none';
  }
});
