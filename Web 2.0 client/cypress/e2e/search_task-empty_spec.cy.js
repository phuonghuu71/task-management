describe("Search for task", () => {
  let initialCount = 0;

  // Visit Page
  it("Visit Task Management", () => {
    cy.visit("/");

    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  // Count Task before searching
  it("Count Task", () => {
    cy.get('[data-test="task-item"]').as("CountTask");
    cy.get("@CountTask")
      .its("length")
      .then((len) => {
        initialCount = len;
      });
  });

  // Start Searching
  it("Searching", () => {
    cy.intercept("GET", "**/task").as("GetTask");

    cy.get('[data-test="input-search"]').as("Search");

    cy.get("@Search").type("{enter}");
    
    cy.get("@Search")
    .invoke("val")
    .then(($el) => {
      expect($el).to.equal("");
    });
    
    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  // Check task list
  it("Check Result", () => {
    cy.get('[data-test="task-item"]').as("CountTaskAfterSearch");
    cy.get("@CountTaskAfterSearch")
      .its("length")
      .then((len) => {
        expect(len).to.equal(initialCount);
      });
  });
});
