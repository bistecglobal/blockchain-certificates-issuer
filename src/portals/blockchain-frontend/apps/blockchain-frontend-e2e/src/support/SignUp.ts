class SignUp {
    getSignUpBtn(){
        return cy.get("a[class='text-blue-500 hover:underline cursor-pointer']")
    } 

    getEmailAddress(){
        return cy.get("input[name='email']")
    } 

    getPassword(){
        return cy.get("input[name='password']")
    } 

    getVerifyPassword(){
        return cy.get("input[name='passwordConfirmation']")
    } 

    getSignUpSubmitBtn(){
        return cy.get("button[type='submit']")
    }

    getSignUpWarning(){
        return cy.get(".text-red-500.text-sm.mb-4")
    }

}
export default SignUp;