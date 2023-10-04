describe("Delete Task", () => {
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

  // Delete First Task Go To Work
  it("Delete Task", () => {
    cy.intercept("DELETE", "**/task/delete/*").as("DeleteTask");

    cy.get(`[data-test="delete-item-go-to-work"]`).first().as("getFirstTask");

    cy.get("@getFirstTask").scrollIntoView({
      easing: "linear",
      duration: 2000, 
    });

    cy.get("@getFirstTask").click();

    cy.wait("@DeleteTask").its("response.statusCode").should("eq", 200);
  });

  // Check if task is deleted
  it("Check Result", () => {
    cy.get('[data-test="task-item"]').as("CountTaskAfterDelete");

    cy.get("@CountTaskAfterDelete")
      .its("length")
      .then((len) => {
        expect(initialCount).to.be.greaterThan(len);
      });
  });
});
