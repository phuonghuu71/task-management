describe("Filter by status Open", () => {
  // Beforehand, let's vist the page
  it("Visit page", () => {
    cy.visit("/");
    
    cy.intercept("GET", "**/task").as("GetTask");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  /**
   * TODO: 1. Check if the filter button is visible
   * TODO: 2. Click on filter button
   * TODO: 3. Check filter modal is visible
   */
  it("Open filter popup", () => {
    cy.get('[data-test="filter-modal"]').should("be.visible").as("Filter");

    cy.get("@Filter").click();

    cy.get('[data-test="filter-modal-popup"]').should("be.visible");
  });

  /**
   * TODO: 1. Check if Priority Category is visible
   * TODO: 2. Click on Priority Category
   */
  it("Click on Priority", () => {
    cy.get('[data-test="category-priority"]')
      .should("be.visible")
      .as("Category");

    cy.get("@Category").click();
  });

  /**
   * TODO: 1. Get High value priority
   * TODO: 2. Click on it
   * TODO: 3. Waiting for xhr to return data
   * TODO: 4. Check for status code to equal 200
   */
  it("Choose High Filter", () => {
    // intercept is used to spy and stub network requests and responses
    cy.intercept("GET", "**/task", (req) => {
      // req.reply is used to dynamically control the response to a request
      req.reply({
        // We receive the response after 1000ms
        delay: 1000,
      });
    }).as("GetTask");

    cy.get('[data-test="filter-high"]').as("High");

    cy.get("@High").click();

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  /**
   * TODO: 1. Get all Tasks priority
   * TODO: 2. Check each item to see if it includes text 'High'
   */
  it("Check Result", () => {
    cy.get('[data-test="task-item-priority"] > p').as("Priority");

    cy.get("@Priority").each((item) => {
      cy.get(item).should("have.text", "High");
    });
  });
});
