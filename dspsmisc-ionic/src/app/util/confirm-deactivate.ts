import { Injectable } from '@angular/core';
import { IHasChanges } from './has-changes.interface';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeactivate implements CanDeactivate<IHasChanges> {

  canDeactivate(target: IHasChanges) {
    if (target.hasChanges()) {
        return window.confirm("This page has unsaved data. Are you sure you want to discard those?");
    }
    return true;
  }

}
