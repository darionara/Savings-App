context('Navigate through table pages using pagination element', () => {
  beforeEach(() => {
    cy.task('db:reset');

    cy.visit('/');
  });

  it('should display the table pagination element', () => {
    cy.get('[data-test="table-pagination"]')
      .should('be.visible');
  });

  it('should have buttons "Go to first page" and "Go to previuos page" disabled on first page', () => {
    cy.get('[data-test="table-pagination"]').within(() => {
      cy.get('button[title="Go to first page"]')
        .should('be.disabled');
      cy.get('button[title="Go to previous page"]')
        .should('be.disabled');
    })
  });

  it('should have all buttons disabled when records amount is lower than 10', () => {
    cy.task('db:remove', 8);

    cy.visit('/');

    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 9);

    cy.get('[data-test="table-pagination"]').within(() => {
      cy.get('button[title="Go to first page"]')
        .should('be.disabled');
      cy.get('button[title="Go to previous page"]')
        .should('be.disabled');
      cy.get('button[title="Go to last page"]')
        .should('be.disabled');
      cy.get('button[title="Go to next page"]')
        .should('be.disabled');
    })
  });

  it('should have buttons "Go to last page" and "Go to next page" disabled on last page', () => {
    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to last page"]')
      .click();
    cy.get('[data-test="table-pagination"]').within(() => {
      cy.get('button[title="Go to last page"]')
        .should('be.disabled');
      cy.get('button[title="Go to next page"]')
        .should('be.disabled');
    })
  });

  it('should check if "Go to next page" and "Go to last page" buttons navigate to next page and last page respectively', () => {
    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to next page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('.MuiTablePagination-displayedRows')
      .contains('11–17 of 17');

    cy.task('db:reset');
    cy.visit('/');

    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to last page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('.MuiTablePagination-displayedRows')
      .contains('11–17 of 17');
  });

  it('should check if "Go to previous page" and "Go to first page" buttons navigate to previous page and first page respectively', () => {
    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to last page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to previous page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('.MuiTablePagination-displayedRows')
      .contains('1–10 of 17');

    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to last page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('button[title="Go to first page"]')
      .click();
    cy.get('[data-test="table-pagination"]')
      .find('.MuiTablePagination-displayedRows')
      .contains('1–10 of 17');
  });

  it ('should change the amount of records per page after selecting new "Rows per page" option from the list and disable all pagination buttons', () => {
    cy.task('db:remove', 2);
    cy.visit('/');

    cy.get('[data-test="table-pagination"]')
      .find('.MuiInputBase-root')
      .click()
      .get('ul > li[data-value=20]')
      .click();

    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 15);  

    cy.get('[data-test="table-pagination"]').within(() => {
      cy.get('button[title="Go to first page"]')
        .should('be.disabled');
      cy.get('button[title="Go to previous page"]')
        .should('be.disabled');
      cy.get('button[title="Go to last page"]')
        .should('be.disabled');
      cy.get('button[title="Go to next page"]')
        .should('be.disabled');
    });
  });
})