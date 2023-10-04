describe("Create Task", () => {
  /**
   * TODO: 1: Visit URL
   * TODO: 2: Wait for response to GET request
   */
  it("Visit Task Management", () => {
    cy.visit("/");

    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  /**
   * TODO: 1: Get The First item contain Title "Go To Sleep"
   * TODO: 2: Scroll into that Item
   * TODO: 3: Check the item to be visible
   */
  it("Search for Task", () => {
    cy.get(`[data-test="edit-item-go-to-sleep"]`).first().as("getFirstTask");

    cy.get("@getFirstTask").scrollIntoView({
      easing: "linear",
      duration: 2000,
      offset: {
        top: -100,
      },
    });

    cy.get("@getFirstTask").should("be.visible");
  });

  /**
   * TODO: 1: Get the first Item Edit Button which the title contain word "Go To Sleep"
   * TODO: 2: Click on it
   * TODO: 3: Get the edit modal Input Field
   * TODO: 4: Replace the word Sleep with Work
   */
  it("Edit Input", () => {
    cy.get(`[data-test="edit-item-go-to-sleep"]`).first().as("getFirstTask");

    cy.get("@getFirstTask").click();

    cy.get(`[data-test="input-name"]`).as("getInput");

    cy.get("@getInput").type(
      "{moveToEnd}{backspace}{backspace}{backspace}{backspace}{backspace}Work"
    );
  });

  /**
   * TODO: 1: Click on priority field
   * TODO: 2: Choose High Priority
   */
  it("Select Priority", () => {
    cy.get(`[data-test="dropdown-container-priority"]`).click();

    cy.get(`[data-test="dropdown-li-priority-0"]`).click();
  });

  /**
   * TODO: 1: Click on Duedate field
   * TODO: 2: Choose a day which is the current day + 1
   */
  it("Select Duedate", () => {
    // Click on Date Picker
    cy.get(".date-picker-container .date-picker").click();

    // Select a day = current day + 1
    const tomorrow = new Date().getDate() + 1;

    cy.get(
      `.react-datepicker__day.react-datepicker__day--0${tomorrow}`
    ).click();
  });

  /**
   * TODO: 1: Intercept to PUT event
   * TODO: 2: Click on Edit Task Button
   * TODO: 3: Check for response status code to be 200
   */
  it("Edit task", () => {
    cy.intercept("PUT", "**/task/update/*").as("EditTask");

    // Click Edit task
    cy.get(`[data-test="submit"]`).click();

    cy.wait("@EditTask").its("response.statusCode").should("eq", 200);
  });

  /**
   * TODO: 1: Get the first item which contain title "Go To Work"
   * TODO: 2: Check if the item contain that word or not
   */
  it("Check Result", () => {
    cy.get(`[data-test="task-item-title-go-to-work"]`)
      .first()
      .as("GetEditTask");

    cy.get("@GetEditTask").then(($el) => {
      cy.get($el)
        .invoke("text")
        .then(($el) => {
          expect($el).to.equal("Go To Work");
        });
    });
  });
});
