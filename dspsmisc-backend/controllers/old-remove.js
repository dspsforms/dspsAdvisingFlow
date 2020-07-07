createFormOld = (req) => {

    // the parameter isAgreement is optional
  
    // const captchaFree = removeCaptcha(req.body);
  
    let form;
    const currentTime = new Date();
  
    const formName = sanitize(req.params.formName);
  
    // legacy
    // const captchaScore = req.body.captchaScore;
  
    // if (isAgreement) {
    //   form = new FormAgreement({
    //     formName: formName,
    //     user: sanitize(req.body.user),
    //     form: sanitize(captchaFree.form), // "tmp form string",
    //     edited: false,
    //     created: currentTime,
    //     lastMod: currentTime,
    //     captchaScore: captchaScore
    //   });
  
    //   return form;
  
    // }
  
    // else. not user agreement
  
  
    if (formName === 'bluesheet') {
      form = new BluesheetForm({
        formName: formName,
        user: sanitize(req.body.user),
        formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
        formHistoryArr: sanitize(req.body.formHistoryArr), 
        versionDetails: sanitize(req.body.versionDetails), 
        currentVersion: sanitize(req.body.currentVersion),
        edited: false,
        created: currentTime,
        lastMod: currentTime,
        state: sanitize(req.body.state || 'current'),
        // captchaScore: captchaScore
      });
    } else if (req.params.formName === 'aap1') {
      form = new Aap1Form({
        formName: formName,
        user: sanitize(req.body.user),
        formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
        formHistoryArr: sanitize(req.body.formHistoryArr), 
        versionDetails: sanitize(req.body.versionDetails), 
        currentVersion: sanitize(req.body.currentVersion),
        edited: false,
        created: currentTime,
        lastMod: currentTime,
        state: sanitize(req.body.state || 'current' ),
        // captchaScore: captchaScore
      });
    }  else if (req.params.formName === 'aap2') {
      form = new Aap2Form({
        formName: formName,
        user: sanitize(req.body.user),
        formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
        formHistoryArr: sanitize(req.body.formHistoryArr), 
        versionDetails: sanitize(req.body.versionDetails), 
        currentVersion: sanitize(req.body.currentVersion),
        edited: false,
        created: currentTime,
        lastMod: currentTime,
        state: sanitize(req.body.state || 'current'),
        // captchaScore: captchaScore
      });
    } else if (req.params.formName === 'greensheet') {
      form = new GreensheetForm({
        formName: formName,
        user: sanitize(req.body.user),
        formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
        formHistoryArr: sanitize(req.body.formHistoryArr), 
        versionDetails: sanitize(req.body.versionDetails), 
        currentVersion: sanitize(req.body.currentVersion),
        edited: false,
        created: currentTime,
        lastMod: currentTime,
        state: sanitize(req.body.state || 'current'),
        // captchaScore: captchaScore
      });
    }
  
    // console.log("req.params=", req.params);
    // console.log("req.body=", req.body);
  
    //  console.log("req.body.form=", req.body.form);
  
    if (debug.CREATE_FORM) {
      console.log("createForm: before save", form);
    }
  
  
    return form;
  
  }
  
  // legacy
  // removeCaptcha = form => {
  //   // remove the reCaptchaV3Token field. also sanitize
  
  //   if (debug.CREATE_FORM) {
  //     console.log("removeCaptcha: form with captcha", form);
  //   }
  
  //   const form2Save = form;
  //   delete form2Save.reCaptchaV3Token;
  
  //   if (debug.CREATE_FORM) {
  //     console.log("removeCaptcha: form2Save with captcha removed", form2Save);
  //   }
  
  //   return form2Save;
  // }
  