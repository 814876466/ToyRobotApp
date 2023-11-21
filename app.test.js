const { robot, processCommand } = require("./app");
describe("test the robot executeActions method", () => {
  test("action MOVE, it should move to NORTH correctly", () => {
    robot.place(2, 2, "NORTH");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(3);
    expect(robot.facing).toBe("NORTH");
  });
  test("action MOVE to NORTH at the edge, it should not move", () => {
    robot.place(0, 4, "NORTH");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(4);
    expect(robot.facing).toBe("NORTH");
  });
  test("action MOVE, it should move to EAST correctly", () => {
    robot.place(0, 0, "EAST");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(0);
    expect(robot.facing).toBe("EAST");
  });
  test("action MOVE to EAST at the edge, it should not move", () => {
    robot.place(4, 0, "EAST");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(0);
    expect(robot.facing).toBe("EAST");
  });
  test("action MOVE, it should move to SOUTH correctly", () => {
    robot.place(2, 2, "SOUTH");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
    expect(robot.facing).toBe("SOUTH");
  });
  test("action MOVE to SOUTH at the edge, it should not move", () => {
    robot.place(4, 0, "SOUTH");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(0);
    expect(robot.facing).toBe("SOUTH");
  });
  test("action MOVE, it should move to WEST correctly", () => {
    robot.place(1, 1, "WEST");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(1);
    expect(robot.facing).toBe("WEST");
  });
  test("action MOVE to WEST at the edge, it should not move", () => {
    robot.place(0, 0, "WEST");
    robot.executeActions("MOVE");
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.facing).toBe("WEST");
  });
  test("action LEFT, It should turn LEFT correctly", () => {
    robot.place(2, 2, "NORTH");
    robot.executeActions("LEFT");
    expect(robot.facing).toBe("WEST");
  });

  test("action LEFT, it should turn LEFT correctly", () => {
    robot.place(2, 2, "SOUTH");
    robot.executeActions("LEFT");
    expect(robot.facing).toBe("EAST");
  });

  test("action RIGHT, It should turn RIGHT correctly", () => {
    robot.place(2, 2, "WEST");
    robot.executeActions("RIGHT");
    expect(robot.facing).toBe("NORTH");
  });

  test("action RIGHT, it should turn RIGHT correctly", () => {
    robot.place(2, 2, "NORTH");
    robot.executeActions("RIGHT");
    expect(robot.facing).toBe("EAST");
  });
});

describe("test processCommand function", () => {
  test("test the validate PLACE, ", () => {
    processCommand("PLACE 1 0 NORTH");
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(0);
    expect(robot.facing).toBe("NORTH");
  });

  test("test with valid POSITION, ACTION and REPORT , ", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    processCommand("PLACE 1 0 NORTH");
    processCommand("MOVE");
    processCommand("RIGHT");
    processCommand("LEFT");
    processCommand("move");
    processCommand("REpoRT");
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
    expect(robot.facing).toBe("NORTH");
    expect(consoleLogSpy).toHaveBeenCalledWith("Report:1,2,NORTH");

    consoleLogSpy.mockRestore();
  });
});

describe("test the invalid command", () => {
  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  test("test the sitution of no valild PLACE, it should return a warning ", () => {
    robot.facing = null;

    processCommand("move");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Warning: please PLACE the robot"
    );
  });

  test("test the PLACE validation, it should return a warning", () => {
    processCommand("PLACE 1");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "please check the numbers of value of PLACE"
    );
  });
  test("test the PLACE position validation, it should return a warning", () => {
    processCommand("PLACE 1 -1 NORTH");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "the robot position value -1 is invalid"
    );
  });

  test("test the PLACE facing validation, it should return a warning", () => {
    processCommand("PLACE 1 0 abc");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "The robot facing value abc is invalid"
    );
  });

  test("test the invalid ACTION, it should return a warning ", () => {
    processCommand("PLACE 1 0 NORTH");
    processCommand("ABC");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Invalid command! Please get instructions in README"
    );
  });
  test("test the invalid ACTION number,it should return a warning ", () => {
    processCommand("PLACE 1 0 NORTH");
    processCommand("MOVE LEFT");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Invalid command. Please enter one action."
    );
  });
});
