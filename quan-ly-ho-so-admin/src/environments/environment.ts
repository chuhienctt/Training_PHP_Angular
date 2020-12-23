// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http'; 

const domain = "localhost:8200";
export const environment = {
  production: false,
  domain: domain,
  urlImg: "http://" + domain + "/",
  apiUrl: "http://" + domain + "/api/admin/"
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
// import { HttpHeaders } from '@angular/common/http';

// const Domain = "localhost:8200";

// export const environment = {
//   production: false,
//   domain: Domain,
//   urlImg: "http://" + Domain + "/",
//   apiUrl: "http://" + Domain + "/api/admin/",
//   headerOptions: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };