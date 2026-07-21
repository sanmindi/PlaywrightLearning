// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
reporter:'html',
  timeout:120000,
 expect:{
 
  timeout:120000


},

  use: {
    browserName:'chromium',
     viewport:null
  }







});

