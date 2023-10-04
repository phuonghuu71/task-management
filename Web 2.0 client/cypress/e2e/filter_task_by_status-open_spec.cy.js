describe("Filter by status Open", () => {
  it("Visit page", () => {
    cy.visit("/");
    
    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
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

  it("Choose Open Filter", () => {
    cy.intercept("GET", "**/task").as('GetTask');

    cy.get('[data-test="filter-open"]').as("Open");

    cy.get("@Open").click();

     cy.wait('@GetTask').its('response.statusCode').should('eq', 200);
  });

  it("Check Result", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('[data-test="task-item-status"]').each((item) => {
      cy.get(item).children("p").as("Text");
      cy.get("@Text").should("have.text", "Open");
    });
  });
});
