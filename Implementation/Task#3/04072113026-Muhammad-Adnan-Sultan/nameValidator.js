import chalk from 'chalk';
// const prompt = require('prompt');
import prompt from 'prompt';
// const validator = require('validator');
import validator from 'validator';

// Start the prompt
prompt.start();

// Define the schema to prompt for the name
const schema = {
  properties: {
    name: {
      description: 'Enter your name',
      type: 'string',
      required: true,
      message: 'Name is required'
    }
  }
};

// Prompt the user for their name
prompt.get(schema, (err, result) => {
  if (err) {
    console.error('Error occurred:', err);
    return;
  }

  const name = result.name;

  // Validate that the first letter is capitalized
  if (validator.isAlpha(name) && name[0] === name[0].toUpperCase()) {
    // If valid, display the name with chosen colors
    console.log(chalk.bgBlue.bold.yellow(`Hello, ${name}!`));
  } else {
    console.log(chalk.red('Error: Name should start with a capital letter.'));
  }
});
