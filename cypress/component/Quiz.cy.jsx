import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getRandomQuestion');
    mount(<Quiz />);
  });

  it('should render the start button initially', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display the first question', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getRandomQuestion');
    
    cy.get('h2').should('be.visible')
      .and('contain', 'What is the output of print(2 ** 3)?');

    cy.get('.mt-3').children().should('have.length', 4)
      .each(($el, index) => {
        const answers = ['6', '8', '9', '12'];
        cy.wrap($el).children().eq(1).should('contain', answers[index]);
      });
  });

  it('should render the score when the quiz ends', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getRandomQuestion');

    // Simulate answering 10 questions
    for (let i = 0; i < 10; i++) {
      cy.get('button').contains('1').click();
    }

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'Your score: 2/10');
  });
});