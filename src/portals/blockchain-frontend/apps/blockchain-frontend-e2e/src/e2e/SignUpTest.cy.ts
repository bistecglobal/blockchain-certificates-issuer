/// <reference types="Cypress" />

import SignUp from "../support/SignUp"
import Login from "../support/Login";
import Home from "../support/Home"

const signUp = new SignUp();
const home = new Home();
const login = new Login();

describe('User Signup', () => {

    let data //closure variable
    before(function () {
        cy.fixture('ProjectData').then(function (fdata) {
        data = fdata
        })
    })

    it('Valid user sign up', () => {
      cy.userSignUp(data.lastEmail, data.validPassword);
      login.getLoginHeader().should('be.visible').contains('Login')
    })

    it('Same user sign up again', () => {
        cy.userSignUp(data.lastEmail, data.validPassword);
        signUp.getSignUpWarning().should('be.visible').contains('Email address not available.')
    })

    it('Sign up with a non email text', () => {
        // Write tests by capturing validations
    })

    after(function () {
        cy.updateEmail()
    })

})