class Login {
    getLoginHeader(){
        return cy.get(".text-2xl.font-semibold.mb-6")
    }
    getSignUpBtn(){
        return cy.get("a[class='text-blue-500 hover:underline cursor-pointer']")
    } 

    getEmailAddress(){
        return cy.get("input[name='email']")
    } 

    getPassword(){
        return cy.get("input[name='password']")
    } 

    getLoginSubmitBtn(){
        return cy.get("button[type='submit']")
    }

    getLoginWarning(){
        return cy.get(".text-red-500.text-sm.mb-4")
    }


}
export default Login;