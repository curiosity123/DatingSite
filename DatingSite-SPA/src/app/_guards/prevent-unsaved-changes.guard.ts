import { UserEditComponent } from '../users/user-edit/user-edit.component';
import { CanDeactivate } from '@angular/router';


export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent> {
    
    
    canDeactivate(component: UserEditComponent) {
      if (component.editForm.dirty) {
      return confirm('Are you sure? your changes might be lost');
      }
      return true;

    }


}
