# Nuxt subscription foundation

## Setup:
```sh
npm install
```
### Firebase:
  - Create a new project
  - Under the Build dropdown select Authentication
  - Click Get started
  - Under Native providers click Email/Password
  - Enable Email/password. Do not enable Email link
  - Click save
### MongoDB: 
  - 
  - 
  - 
### Recaptcha: 
  - Go to [this link](https://www.google.com/u/0/recaptcha/admin/create)
  - Enter a label
  - Choose Score based (v3)
  - Add 2 different domains
    - localhost
    - Your domain
  - Click submit
  - Repeat but choose challenge (v2) and checkbox option
### Run commands:
```sh
npm run nuxt_dev
```
```sh
npm run webhook_service_dev
```
```sh
npm run cronjob_service_dev
```
## MongoDB statuses:
- active: Set when subscription is active
- expired: Set when subscription is deleted / unpaid
- canceled: Set when subscription is canceled
- invoice-failed: Set when subscription hasnt been paid
- invoice-requires-action: Set when subscription hasnt been paid

## Cronjobs: 
  - expire_invoice_failed: Updates all invoice-unpaid statuses to expired after x days

## Rules:
  - Api 
    - Return:

      ```js
        return {
          data: 'Response',
          success: 'Boolean',
          message: 'If success false',
          code: 'If success false',
        }
      ```
    - Unless function is supposed to be called when user is not signed in send token with your request. 
  - Cronjob:
    - 400: Success

## Plug and Play functions:
  - Recaptcha verification:
      - Send callback function to recaptcha_verification. This will be called if verification is successfull. If checkbox is wanted add the verify-recaptcha component to your file.
  - Password verification:
      - Add the verify-password component. This will create a button, provide the component with a callback function that will run if password verification is successfull and a text that will be displayed as the button text.
  - Customer portal on Stripe:
      - Call the user_getPortalSession function. This will set the url to the one provided by Stripe.
