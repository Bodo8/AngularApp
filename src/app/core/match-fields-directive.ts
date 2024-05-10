import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appMatchFields]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchFieldsDirective, multi: true }]
})
export class MatchFieldsDirective implements Validator {
  @Input('appMatchFields') matchFields: string[];

  validate(control: AbstractControl): { [key: string]: any } | null {
    const field1 = control.get(this.matchFields[0]);
    const field2 = control.get(this.matchFields[1]);

    if (field1 && field2 && field1.value !== field2.value) {
      return { matchFields: true };
    }

    if ((field1 && !field1.value) || (field2 && !field2.value)) {
      return { matchFields: true };
    }

    return null;
  }

  static valueGetter(control: AbstractControl, fieldName: string): string {
    return control.get(fieldName)?.value;
  }
}
