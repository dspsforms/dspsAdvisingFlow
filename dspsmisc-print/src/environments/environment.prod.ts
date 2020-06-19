export const environment = {
  production: true,

   // change this to your production server
   server: "http://qa.dsps-misc.missioncollege.edu",

   // during testing, this can be false, so personal emails can be used to test accounts
   enforceWvmEmail: false,

   // client side key for reCaptcha V3.
   // the data here is NOT a valid key. supply your own
   reCaptchaV3ClientKey: 'asdfghklzxcvbnmqwertyuiop'

};
