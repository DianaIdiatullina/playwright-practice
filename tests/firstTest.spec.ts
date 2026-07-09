import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})  

test.describe('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts').click();
    }) 

    test('navigate to form layouts', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    })

    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click();
    })
})

test.describe('suite2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
    }) 

    test('navigate to form layouts1', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    })

    test('navigate to datepicker page 1', async ({ page }) => {
        await page.getByText('Datepicker').click();
    })
})

test('locator syntax rules', async ({ page }) => {
    //CSS and XPath are not recommended as the DOM can often change leading to non resilient tests

    // by tag name
    await page.locator('input').first().click();

    // by id
    page.locator('inputEmail1')

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class value (full)
    page.locator('[class="input-full-width size-small status-success"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbInput]')

    //by XPath (NOT RECOMMENDED)
    page.locator('//input[@placeholder="Email1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign in' }).first().click();
})

test('Reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });  
    const passwordInput = basicForm.getByRole('textbox', { name: 'Password' });

    await emailInput.fill('test@example.com');
    await passwordInput.fill('Welcome123');

    await basicForm.locator('nb-checkbox').filter({ hasText: 'Check me out' }).click();
    await basicForm.getByRole('button', { name: 'Submit' }).click();
    await expect(emailInput).toHaveValue('test@example.com');
})

test('Extracting values', async ({ page }) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const buttonText = await basicForm.getByRole('button', { name: 'Submit' }).textContent();
    expect(buttonText).toEqual('Submit');

    //all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonLabels).toContain('Option 1');

    //input value
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });  
    await emailInput.fill('test@example.com');
    const emailInputValue = await emailInput.inputValue();
    expect(emailInputValue).toEqual('test@example.com');

    //placeholder value
    const emailInputPlaceholder = await emailInput.getAttribute('placeholder');
    expect(emailInputPlaceholder).toEqual('Email');
})


test('Assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button');

    //General assertions
    const value = 5
    expect(value).toEqual(5);

    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit');

    //Locator assertions
    await expect(basicFormButton).toHaveText('Submit');

    //Soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit1');
    await basicFormButton.click();
})