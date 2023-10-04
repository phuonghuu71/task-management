describe("Search for task", () => {
  /**
   * TODO: 1: Visit URL
   * TODO: 2: Wait for response to GET request
   */
  it("Visit Task Management", () => {
    cy.intercept("GET", "**/task").as("GetTask");
    
    cy.visit("/");

    cy.wait("@GetTask").its("response.statusCode").should("eq", 200);
  });

  /**
   * TODO: 1: Get Input Search
   * TODO: 2: Type Go To
   * TODO: 3: Check if input field contains "Go To"
   * TODO: 4: Type Enter
   */
  it("Searching", () => {
    cy.get('[data-test="input-search"]').as("Search");

    cy.get("@Search").type("Go To");
    
    cy.get("@Search")
    .invoke("val")
    .then(($el) => {
      expect($el).to.not.be.empty;
      expect($el).to.equal("Go To");
    });

    cy.get("@Search").type("{enter}")
  });

  /**
   * TODO 1: Get Task Items
   * TODO 2: Check if all items title include word "Go To" 
   */  
  it("Check Result", () => {
    cy.get('[data-test*="task-item-title"]').each(($el) => {
      cy.get($el).contains("Go To");
    });
  });
});
