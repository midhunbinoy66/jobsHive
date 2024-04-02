// // Define the type of the environment variables.
// declare interface Env {
//   readonly NODE_ENV: string;
//   // Replace the following with your own environment variables.
//   // Example: NGX_VERSION: string;
//   [key: string]: any;
// }

// // Choose how to access the environment variables.
// // Remove the unused options.

// // 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
// declare interface ImportMeta {
//   readonly env: Env;
//   readonly NG_APP_ENV: string
//   readonly NG_APP_BASE_URL: string
// }

// // 2. Use _NGX_ENV_.YOUR_ENV_VAR in your code. (customizable)
// // You can modify the name of the variable in angular.json.
// // ngxEnv: {
// //  define: '_NGX_ENV_',
// // }
// declare const _NGX_ENV_: Env;

// // 3. Use process.env.YOUR_ENV_VAR in your code. (deprecated)
// declare namespace NodeJS {
//   export interface ProcessEnv extends Env {}
// }


interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
   */
  readonly NG_APP_ENV: string
  readonly NG_APP_BASE_URL: string
  readonly NG_APP_GOOGLE_CLIENT_ID: string
  // Add your environment variables below
  // readonly NG_APP_API_URL: string;
  [key: string]: any
}
