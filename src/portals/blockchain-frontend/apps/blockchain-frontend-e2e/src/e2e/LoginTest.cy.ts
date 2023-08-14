/// <reference types="Cypress" />

import SignUp from "../support/SignUp"
import Login from "../support/Login";
import Home from "../support/Home"

const signUp = new SignUp();
const home = new Home();
const login = new Login();

describe('User Login', () => {

    before(function () {
        cy.updateEmail()
    })

    let data //closure variable
    before(function () {
        cy.fixture('ProjectData').then(function (fdata) {
        data = fdata
        })
    })

    before(function () {
        cy.userSignUp(data.lastEmail, data.validPassword)
        cy.wait(10000)
    })

    it('Dirrect Navigation to Home', () => {
        cy.visit('/dashboard')
        login.getLoginHeader().should('be.visible').contains('Login')
    })

    it('Valid user login', () => {
        cy.userLogin(data.lastEmail, data.validPassword);
        home.getHomeHeader().should('be.visible').contains('Welcome')
    })

    it('User login with invalid password', () => {
        cy.userLogin(data.lastEmail, data.invalidPassword);
        login.getLoginWarning().should('be.visible').contains('Invalid Email or Password.')
    })

    it('User login with invalid email', () => {
        // Write tests by capturing validations
    })

})


// describe('Login Bypass Test', () =>
// {
//     it('Dirrect Navigation to Home', () => {
//         cy.visit('/dashboard')
//         cy.get(".text-2xl.font-semibold.mb-6").contains("Login")
//     })
// })