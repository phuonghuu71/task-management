describe("Filter by status Open", () => {
  it("Visit page", () => {
    cy.visit("/");
  });

  it("Open filter popup", () => {
    cy.get('[data-test="filter-modal"]').should("be.visible").as("Filter");

    cy.get("@Filter").click();

    cy.get('[data-test="filter-modal-popup"]').should("be.visible");
  });

  it("Click on Status", () => {
    cy.get('[data-test="category-status"]').should("be.visible").as("Category");

    cy.get("@Category").click();
  });

  it("Choose In Progress Filter", () => {
    cy.intercept("**/task").as("GetTask");

    cy.get('[data-test="filter-in progress"]').as("InProgress");

    cy.get("@InProgress").click();

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  it("Check Result", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('[data-test="task-item-status"] > p').each((item) => {
      cy.get(item).should("be.visible");
      cy.get(item).should("have.text", "In Progress");
    });
  });
}); 
