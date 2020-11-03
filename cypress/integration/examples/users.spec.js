/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("views users table", () => {
    cy.contains("User Details");

    cy.get(".table").within(() => {
      cy.contains("Last updated");
      cy.contains("Name");
      cy.contains("Email");
      cy.contains("Title");
      cy.contains("Phone");
      cy.contains("Status");
      cy.contains("Actions");
    });
  });
});
