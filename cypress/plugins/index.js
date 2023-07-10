/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const axios = require('axios');
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on) => {
  on('task', {
    'db:reset': async () => {
      const { data } = await axios.post(`http://localhost:4320/tests/setup`);
      return data;
    },

    'db:remove': async (amountOfRecords) => {
      const ids = Array.from({ length: amountOfRecords }, (_, index) => (index + 1).toString());
      const { data } = await axios.delete(`http://localhost:4320/ledger`, { data: { ids } });
      return data;
    },

/*     'db:add': async (amountOfRecords) => {
      const records = Array.from({ length: amountOfRecords }, () => ({
        mode: 'INCOME',
        amountInCents: 0,
        categoryId: 'string',
        title: 'string'
      }));
      const { data } = await axios.post(`http://localhost:4320/ledger`, records);
      return data;
    } */
  });
};
