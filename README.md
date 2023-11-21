# Toy Robot App

<!-- | o o |
     (| ^ |)
     | [_] | -->

A simple Toy Robot App implemented in Node.js with Jest for testing.

1. Clone the repository:

   git clone https://github.com/
   Navigate to the project directory:

cd the foldername

2. Install dependencies:
   npm install

3. Run the Toy Robot App with the following command:

npm start

Follow the instructions to input commands for the robot:

3. Testing

Before run testing, please remove or comment out the interactive loop from startSimulation function at app.js(line 90 - line 101).
startSimulation function, which contains the interactive part of asking for user input, is being executed when you run your tests. This can lead to an interactive prompt during the test execution, which is not wanted in a test environment.
To test the startSimulation function, please run the Toy Robot App and try some input commands.

The project uses Jest for testing. Run tests with:
npm test
