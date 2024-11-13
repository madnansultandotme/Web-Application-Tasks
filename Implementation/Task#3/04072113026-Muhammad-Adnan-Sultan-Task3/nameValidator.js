import chalk from 'chalk';

import prompt from 'prompt';

import validator from 'validator';

prompt.start();

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

prompt.get(schema, (err, result) => {
  if (err) {
    console.error('Error occurred:', err);
    return;
  }

  const name = result.name;


  if (validator.isAlpha(name) && name[0] === name[0].toUpperCase()) {
    console.log(chalk.bgBlue.bold.yellow(`Hello, ${name}!`));
  } else {
    console.log(chalk.red('Error: Name should start with a capital letter.'));
  }
});
