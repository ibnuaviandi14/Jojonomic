///<reference types = "cypress" />

describe("Technical Test - Jojonomic",() =>{    
    beforeEach ('Visit the mainpage',() => {
        cy.visit('https://www.service.nsw.gov.au/ ') // visit the website
    })

    
    it("Check the conformance of the mainpage",() => {
        cy.url().should('contain','service.nsw.gov.au') // Check the correct URL
        cy.get('.MobileButton__menu-Zf6a9LYPkd').should('be.visible') // Menu should be visible
        cy.get('.MobileButton__search-w46mHdH9MS').should('be.visible') // Search should be visible
        cy.get('[data-personalisation-type="default"] > .page-hero > .container > .page-hero__title > .field > .field-item > #page-title').
        should('have.text','Service NSW makes it easier to find government information and services') // Assert the statement in the mainpage
    }) 

    it('Search for "Apply for a number plate" ',() =>{
        cy.get('#homeautosuggest4cUTSjoHt2k > .form__text').should('be.visible')
        .click().type('Apply for a number plate')// Search button should be visible
        cy.get('[data-personalisation-type="default"] > .page-hero > .container > .page-hero__title > .form--hero-search-group > .form__actions > .button').click() // Click the searh button
        cy.url().should('contain','Apply+for+a+number+plate') // Check the correct ULR
        cy.get('#page-title').should('contain','Search') // Assert the page to redirect to the correct page
        cy.get('.search__title').should('have.text',"91 results found for ‘Apply for a number plate’")// Asert the header to contain spesific text
    })

    it('Trying to find Marrickville Service Centre',() => {
        cy.scrollTo(0,6000) // Scroll down to find Find a Service NSW Location
        cy.get('.FooterNav__mobileList-dsHSTJTtPB > :nth-child(5) > .NavLink__link-M-HSy9SYcc')
        .should('have.text','Find a Service NSW location').click() // Asert the action icon has the correct name
        cy.scrollTo(0,500) // scroll down
        cy.get('.label--large',{timeout:5000}).should('contain','Search by suburb, postcode or current location') // Asert the Header have spesific text
        cy.fixture("Data").then(Data => {
            const location = Data.location
            const service = Data.service
        cy.get('#locatorTextSearch', {timeout: 10000}).should('be.visible').type(location) // Asert the visibility of the search box and then type the keyword
        cy.get('.form__actions > .button').click() // click the searh button
        cy.wait(5000)
        cy.scrollTo(0,1000) // scroll down
        cy.get('.pager > .button').click()
        cy.get('.landing-page > :nth-child(1) > .container').should('contain',service)

    })
    })
})