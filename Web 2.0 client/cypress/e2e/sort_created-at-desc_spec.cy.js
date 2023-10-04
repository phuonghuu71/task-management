describe("Sort By Created At Descending", () => {
  // Visit Page
  it("Visit Task Management", () => {
    cy.visit("/");

    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  // Click Sort Task
  it("Sort Task", () => {
    cy.get('[data-test="task-sort"]').as("Sort");

    cy.get("@Sort").click();

    cy.get('[data-test="task-sort-modal"]').as("SortModal");

    cy.get("@SortModal").should("be.visible");
  });

  // Choose Descending Sort
  it("Choose Descending Sort", () => {
    cy.get('[data-test="task-sort-descending"]').as("Descending");

    cy.get("@Descending").click();
  });

  // Create Initial Array
  it("Check Result", () => {
    cy.get('[data-test="task-item-createdAt"]').as("CreatedAt");

    cy.get("@CreatedAt")
      .then(($el) => {
        return $el.map((index, value) => {
          const date = value.textContent;

          return new Date(date);
        });
      })
      .then(($el) => {
        expect($el.toArray()).deep.equal($el.toArray().reverse());
      });
  });
});
