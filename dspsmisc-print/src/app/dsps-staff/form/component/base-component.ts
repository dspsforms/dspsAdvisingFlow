export class BaseComponent {

    showRequired(mode: 'create' | 'view' | 'edit') {
        if (mode && mode === 'create' || mode === 'edit') {
          return true;
        } else {
          return false;
        }
    }
}