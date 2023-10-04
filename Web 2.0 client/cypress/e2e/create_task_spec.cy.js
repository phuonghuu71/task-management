describe("Create Task", () => {
  let initialCount = 0;

  // Visit Page
  it("Visit Task Management", () => {
    cy.visit("/");

    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  it("Count Task", () => {
    cy.get('[data-test="task-item"]').as("CountTask");
    cy.get("@CountTask")
      .its("length")
      .then((len) => {
        initialCount = len;
      });
  });

  // Click on Create Task
  it("Click on Create Task", () => {
    cy.get(`[data-test="add"]`).click();
  });

  // Enter Task Name
  it("Enter Task Name", () => {
    cy.get(`[data-test="input-name"]`).type("Go To Sleep");
  });

  // Select Priority Low
  it("Select Priority", () => {
    cy.get(`[data-test="dropdown-container-priority"]`).click();

    cy.get(`[data-test="dropdown-li-priority-2"]`).click();
  });

  // Select duedate
  it("Select Duedate", () => {
    // Click on Date Picker
    cy.get(".date-picker-container .date-picker").click();

    // Select a day = current day + 1
    const tomorrow = new Date().getDate() + 1;

    cy.get(
      `.react-datepicker__day.react-datepicker__day--0${tomorrow}`
    ).click();
  });

  // Create task
  it("Create task", () => {
    cy.intercept("POST", "**/task/*").as("CreateTask");

    // Click create task
    cy.get(`[data-test="submit"]`).click();

    cy.wait("@CreateTask").its("response.statusCode").should("eq", 200);
  });

  // Check if task is created
  it("Check Result", () => {
    cy.get('[data-test="task-item"]').as("CountTaskAfterCreate");

    cy.get("@CountTaskAfterCreate")
      .its("length")
      .then((len) => {
        expect(initialCount).to.be.lessThan(len);
      });
  });
});
