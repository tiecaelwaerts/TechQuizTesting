describe('User Experience', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3001/');
    })
    it('should allow a user to visit the home page', () => {
        cy.visit('http://127.0.0.1:3001/');
    });

    it('should start the quiz when the Start Quiz button is clicked', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2');
    })

    it('should display a new question when an answer is selected', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').as('question');
        cy.get('button').contains('1').click();
        cy.get('h2').should('not.have.text', '@question');
    })

    it('should display the user’s score after answering all questions', () => {
        cy.get('button').contains('Start Quiz').click();
        for (let i = 1; i <= 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    })
    
    it('should allow the user to start a new quiz after completion', () => {
        cy.get('button').contains('Start Quiz').click();
        for (let i = 1; i <= 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('button').contains('Take New Quiz').click();
        cy.get('h2').should('not.have.text', 'Quiz Completed');
    })
})