export class FormName {

    static BLUESHEET = 'bluesheet';

    // Academic Accommodations Plan
    static AAP = 'aap';

    static formNames = [
      FormName.BLUESHEET,
      FormName.AAP,
    ];

  }
  
export class FormUtil {
  
    private static initialized = false;
  
    private static formMap = {};
  
    // mongo collections are named intakeforms, etc.
    private static mongo2FormNameMap = {};
  
    private static initializeIfNecessary() {
          if (!FormUtil.initialized) {
  
            FormUtil.formMap[FormName.BLUESHEET] = "Bluesheet";
  
            FormUtil.formMap[FormName.AAP] = "Academic Accommodations Plan";
  
            // mongo collections are named intakeforms, etc.
            FormUtil.mongo2FormNameMap["bluesheets"] = FormName.BLUESHEET;
            FormUtil.mongo2FormNameMap["aaps"] = FormName.AAP;
        
  
            FormUtil.initialized = true;
          }
  
    }
  
      // return the label/title for a formName
      static formTitle(formName) {
          try {
              FormUtil.initializeIfNecessary();
              return FormUtil.formMap[formName];
  
          } catch (err) { }
      }
  
      static collection2Title(collectionName) {
        try {
  
            FormUtil.initializeIfNecessary();
            const formName =  FormUtil.collection2FormName(collectionName);
            return FormUtil.formMap[formName];
        } catch (err) { }
      }
  
      static collection2FormName(collectionName) {
        try {
  
            FormUtil.initializeIfNecessary();
            const formName =  FormUtil.mongo2FormNameMap[collectionName];
            return formName;
        } catch (err) { }
      }
  
  }
  
  