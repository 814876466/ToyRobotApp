const readlineSync = require("readline-sync");

class Robot {
  constructor() {
    this.x = null;
    this.y = null;
    this.facing = null;
    this.tableSize = 5;
    this.directions = ["NORTH", "EAST", "SOUTH", "WEST"];
  }

  place(x, y, facing) {
    this.x = x;
    this.y = y;
    this.facing = facing;
  }

  executeActions(action) {
    switch (action) {
      case "MOVE":
        this.move();
        break;
      case "LEFT":
        this.left();
        break;
      case "RIGHT":
        this.right();
        break;
      case "REPORT":
        this.report();
        break;
      default:
        console.warn("Invalid command! Please get instructions in README");
    }
  }

  move() {
    switch (this.facing) {
      case "NORTH":
        this.y = Math.min(this.y + 1, this.tableSize - 1);
        break;
      case "EAST":
        this.x = Math.min(this.x + 1, this.tableSize - 1);
        break;
      case "SOUTH":
        this.y = Math.max(this.y - 1, 0);
        break;
      case "WEST":
        this.x = Math.max(this.x - 1, 0);
        break;
    }
  }

  left() {
    const currentDirectionIndex = this.directions.indexOf(this.facing);
    const afterLeft = this.leftIndex(currentDirectionIndex);
    this.facing = this.directions[afterLeft];
  }

  leftIndex(leftIndex) {
    leftIndex = leftIndex - 1;
    if (leftIndex == -1) {
      return 3;
    }
    return leftIndex;
  }

  right() {
    const currentDirectionIndex = this.directions.indexOf(this.facing);
    const afterRight = this.rightIndex(currentDirectionIndex);
    this.facing = this.directions[afterRight];
  }
  rightIndex(rightIndex) {
    rightIndex = rightIndex + 1;
    if (rightIndex == 4) {
      return 0;
    }
    return rightIndex;
  }

  report() {
    console.log(`Report:${this.x},${this.y},${this.facing}`);
  }
}

const robot = new Robot();

function startSimulation() {
  console.log("Welcome to Toy Robot Simulation!\n");

  while (true) {
    const command = readlineSync.question(
      'Enter a command to play the toy robot (or "EXIT" to end): '
    );

    if (command.toUpperCase() === "EXIT") {
      console.log("Exiting the simulation.\n");
      process.exit(1);
    }

    processCommand(command);
  }
}

startSimulation();

function processCommand(command) {
  const parts = command.split(" ");
  const action = parts[0].toUpperCase();

  if (action == "PLACE") {
    isPlaceValidate(parts);
  } else if (parts.length !== 1) {
    console.warn("Invalid command. Please enter one action.");
  } else {
    isBeenPlaced(action);
  }
}
function isBeenPlaced(action) {
  if (
    !robot ||
    !robot.place ||
    robot.x === null ||
    robot.y === null ||
    robot.facing === null
  ) {
    console.warn("Warning: please PLACE the robot");
    return;
  } else {
    robot.executeActions(action);
  }
}
function isPlaceValidate(parts) {
  if (parts.length !== 4) {
    console.warn("please check the numbers of value of PLACE");
    return;
  } else {
    const x = parseInt(isPositionRight(parts[1]));
    const y = parseInt(isPositionRight(parts[2]));
    const facing = isFacingRight(parts[3]);

    robot.place(x, y, facing);
  }
}

function isPositionRight(input) {
  const intValue = parseFloat(input);

  if (Number.isInteger(intValue) && intValue >= 0 && intValue <= 4) {
    return intValue;
  } else {
    console.warn(`the robot position value ${input} is invalid`);
    return;
  }
}

function isFacingRight(input) {
  const validDirection = ["NORTH", "EAST", "SOUTH", "WEST"];
  const upperCaseInput = input.toUpperCase();
  if (validDirection.includes(upperCaseInput)) {
    return input;
  } else {
    console.warn(`The robot facing value ${input} is invalid`);
    return;
  }
}

module.exports = { robot, processCommand };
