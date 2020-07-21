/*
describe('My First ok Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
  })
describe('My First fail Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(false)
    })
})
*/
// käynnistä ensin backend ja frontend
// run with command  %npm run cypress:open
describe('Connect to server', () => {
    it('Visits tecnoforum', () => {
      cy.visit('http://localhost:3000')
    })
    it('finds the link to  "Login"', () => {
       // cy.visit('http://localhost:3000')
    
        cy.contains('Login')
    })    
    it('opens register new user page', () => {
        //cy.visit('http://localhost:3000')
    
        cy.contains('Register').click()
        cy.url().should('include', '/register')
        // Get an input, type into it and verify that the value has been updated
        cy.get('input[name="email"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
      })  
    it('logins with user details', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input[name="email"]')
            .type('mocha.admin@gmail.com')
        cy.get('input[name="password')
            .type('salasana')
        cy.contains('Log In').click()
        cy.contains('Logout')
    })
})
