export class FormName {

    static BLUESHEET = 'bluesheet';

    // Academic Accommodations Plan
  static AAP1 = 'aap1';
  
  static AAP2 = 'aap2';

    static formNames = [
      FormName.BLUESHEET,
      FormName.AAP1,
      FormName.AAP2
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
  
            FormUtil.formMap[FormName.AAP1] = "Academic Accommodations Plan Part 1";
            FormUtil.formMap[FormName.AAP2] = "Academic Accommodations Plan Part 2";
  
            // mongo collections are named intakeforms, etc.
            FormUtil.mongo2FormNameMap["bluesheets"] = FormName.BLUESHEET;
            FormUtil.mongo2FormNameMap["aap1s"] = FormName.AAP1;
            FormUtil.mongo2FormNameMap["aap2s"] = FormName.AAP2;
        
  
            FormUtil.initialized = true;
          }
  
    }
  
      // return the label/title for a formName
      static formTitle(formName) {
          try {
            FormUtil.initializeIfNecessary();
            return FormUtil.formMap[formName];
  
          } catch (err) { console.log(err); }
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
  
  