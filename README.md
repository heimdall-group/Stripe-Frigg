# Nuxt subscription foundation

### Setup:
```sh
npm install
```
```sh
npm run nuxt_dev
```
```sh
npm run webhook_service_dev
```
```sh
npm run cronjob_service_dev
```
### MongoDB statuses:
- active: Set when subscription is active
- expired: Set when subscription is deleted / unpaid
- canceled: Set when subscription is canceled
- invoice-failed: Set when subscription hasnt been paid
- invoice-requires-action: Set when subscription hasnt been paid

### Cronjobs: 
  - expire_invoice_unpaid: Updates all invoice-unpaid statuses to expired after x days

### Rules:
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
  - Cronjob:
    - 400: Success