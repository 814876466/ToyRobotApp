# Toy Robot App

<!-- | o o |
     (| ^ |)
     | [_] | -->

A simple Toy Robot App implemented in Node.js with Jest for testing.

Make sure you have npm installed in your environment:

1. Clone the repository:

   git clone git@github.com:814876466/ToyRobotApp.git

cd ToyRobotApp

2. Install dependencies:
   npm install

3. Run the Toy Robot App with the following command:

   npm start

The following command is supported by the toy robot app:
PLACE X,Y,F: Place the robot at the specified coordinates (X, Y) and facing the specified direction (NORTH, SOUTH, EAST, WEST).
MOVE: Move the robot one step in the direction it is currently facing.
LEFT: Rotate the robot 90 degrees to the left.
RIGHT: Rotate the robot 90 degrees to the right.
REPORT: Report the current position and direction of the robot.
please note that PLACE command have to be the initial command, and one command means one action, you cannot enter mutiplie actions at the same time.

Here are some input examples:
a)
PLACE 0,0,NORTH
MOVE
REPORT

b)
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT

3. Testing

Before run testing, please comment out the interactive loop from startSimulation function at app.js(line 90 - line 101).
startSimulation function, which contains the interactive part of asking for user input, is being executed when you run your tests. This can lead to an interactive prompt during the test execution, which is not wanted in a test environment.
To test the startSimulation function, please run the Toy Robot App and try some input commands.

The project uses Jest for testing. Run tests with:
npm test
