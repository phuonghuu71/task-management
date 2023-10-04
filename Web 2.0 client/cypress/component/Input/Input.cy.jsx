import TestInput from "./TestInput";

describe("Component Input Testing", () => {
  /**
   * We're using beforeEach 
   * In order to make it works for each it blocks
   */
  beforeEach(() => {
    /**
     * mounting is used to mount the component
     * this is used in the scenario when you want to test a specific component
     * and not the whole application
     */
    cy.mount(<TestInput />);
  });

  /**
   * Before we actually test the component
   * We have to make sure that the component doesn't throw errors
   */
  it('Checking before Testing', () => {
    cy.get('[data-test="input-input"]').as("Input");

    // The Input should be empty
    cy.get('@Input').should('have.value', "");

    cy.get('[data-test="input-input-label"]').as("InputLabel");
    
    // The label should not include active
    cy.get("@InputLabel").should("not.have.class", "active");
  })

  /**
   * Let's try focusing on input
   */
  it("Focus in Input", () => {
    cy.get('[data-test="input-input"]').as("Input");

    // We're focusing in input text
    cy.get("@Input").focus();

    cy.get('[data-test="input-input-label"]').as("InputLabel");

    // Then it should contain class active now
    cy.get("@InputLabel").should("have.class", "active");
  });

  /**
   * Now let's try to put some text
   * I'm gonna type:
   * Basic Simple Input Testing
   */
  it("Typing in Input", () => {
    cy.get('[data-test="input-input"]').as("Input");

    // Typing 
    cy.get("@Input").type("Basic Simple Input Testing");

    // The result should contain the word I just typed in
    cy.get("@Input").should("have.value", "Basic Simple Input Testing");
  });
});
