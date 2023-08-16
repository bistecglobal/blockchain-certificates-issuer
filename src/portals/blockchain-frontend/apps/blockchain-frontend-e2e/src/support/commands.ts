// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

let data //closure variable
before(function () {
  cy.fixture('ProjectData').then(function (fdata) {
    data = fdata
  })
})

import SignUp from "./SignUp"
import Login from "./Login"

const signUp = new SignUp();
const login = new Login();

Cypress.Commands.add('userSignUp', (email: string, password: string) => {
  cy.visit('/');
  login.getSignUpBtn().should('be.visible').click()
  signUp.getEmailAddress().type(email)
  signUp.getPassword().type(password)
  signUp.getVerifyPassword().type(password)
  signUp.getSignUpSubmitBtn().should('be.visible').click()
});

Cypress.Commands.add('userLogin', (email: string, password: string) => {
  cy.visit('/');
  login.getEmailAddress().type(email)
  login.getPassword().type(password)
  login.getLoginSubmitBtn().should('be.visible').click()
});


Cypress.Commands.add('updateEmail', () => {
  cy.fixture('ProjectData').then((emaildata) => {
    const lastEmailNumber = emaildata.lastEmailNumber + 1;
    const email = `testmail${lastEmailNumber}@gmail.com`;

    cy.readFile('src/fixtures/ProjectData.json').then((existingData) => {
      const updatedData = {
        ...existingData,
        lastEmailNumber,
        lastEmail: email,
      };

      cy.writeFile('src/fixtures/ProjectData.json', updatedData);
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      userSignUp(email: string, password: string): Chainable<Subject>;
      updateEmail(): Chainable<Subject>;
      userLogin(email: string, password: string): Chainable<Subject>;
    }
  }
}

