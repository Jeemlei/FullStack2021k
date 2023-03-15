describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'test',
			name: 'testperson',
			password: 'SalainenSana',
		})
		cy.visit('http://localhost:3000/')
	})

	it('Login form is shown', function () {
		cy.contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('test')
			cy.get('#password').type('SalainenSana')
			cy.get('#login-button').click()
			cy.contains('testperson logged in')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('test')
			cy.get('#password').type('VääräSana')
			cy.get('#login-button').click()
			cy.contains('wrong username or password')
			cy.contains('login')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('test')
			cy.get('#password').type('SalainenSana')
			cy.get('#login-button').click()
		})

		it('A blog can be created', function () {
			cy.contains('new note').click()
			cy.get('#title').type('Test blog')
			cy.get('#author').type('Cypress')
			cy.get('#url').type('test')
			cy.get('#create-button').click()
			cy.contains('Test blog by Cypress added')
			cy.contains('Test blog Cypress')
		})

		describe('and a blog is created, the new blog can be', function () {
			beforeEach(function () {
				cy.contains('new note').click()
				cy.get('#title').type('Test blog')
				cy.get('#author').type('Cypress')
				cy.get('#url').type('test')
				cy.get('#create-button').click()
			})

			it('liked', function () {
				cy.get('#show-Testblog').click()
				cy.get('#Testblog').contains('likes 0')
				cy.get('#like-Testblog').click()
				cy.get('#Testblog').contains('likes 1')
			})

			it('deleted by the user who created it', function () {
				cy.visit('http://localhost:3000/')
				cy.contains('Test blog Cypress')
				cy.get('#show-Testblog').click()
				cy.get('#delete-Testblog').click()
				cy.contains('Test blog Cypress').not()
			})
		})

		it('blogs are sorted by likes', function () {
			cy.contains('new note').click()
			cy.get('#title').type('Test blog')
			cy.get('#author').type('Cypress')
			cy.get('#url').type('test')
			cy.get('#create-button').click()

			cy.get('#show-Testblog').click()
			cy.get('#like-Testblog').click()

			cy.contains('new note').click()
			cy.get('#title').type('Test blog 2')
			cy.get('#author').type('Cypress')
			cy.get('#url').type('test')
			cy.get('#create-button').click()

			cy.get('#blogs div').first().contains('Test blog Cypress')

			cy.get('#show-Testblog2').click()
			cy.get('#like-Testblog2').click()

			cy.get('#blogs div').first().contains('Test blog Cypress')

			cy.get('#like-Testblog2').click()

			cy.get('#blogs div').first().contains('Test blog 2 Cypress')
		})
	})
})
