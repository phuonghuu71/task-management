describe("Get Task", () => {
  // Vist Page
  it("Visit Task Management", () => {
    cy.visit("/");

    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });
});
