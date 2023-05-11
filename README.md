# Template for Nuxt Vuetify

- Setup:
    - npm install
    - npm run nuxt_dev
    - npm run webhook_service_dev
    - npm run cronjob_service_dev

- Rules:
    - Api respone:
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
