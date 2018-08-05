import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent implements OnInit {
  addExpanseForm: FormGroup;
  nameFormControl;
  amountFormControl;
  patterns = {
    name: '^[a-zA-Z ]*$',
    amount: '^[0-9.]+$'
  }
  errorMessages = {
    namePattern : 'Value should contain only alphabets & blankspace',
    amountPattern: 'Value should contain only numbers and dot',
    required: 'This field is required',
    maxLength: 'Value should not be longer then 20 symbols'
  }

  @Output() rowData = new EventEmitter<Object>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addExpanseForm = this.initForm(this.fb);
    this.nameFormControl = this.addExpanseForm.get('name');
    this.amountFormControl = this.addExpanseForm.get('amount');
  }

   addItem() {
    const result = {...this.addExpanseForm.value};
    this.rowData.emit(result);
    this.addExpanseForm.setValue({name:'', amount:''});
   }

   onChange(control, controlName) {
     control.value ? this.setValidators(control, controlName) : this.clearValidators(control);
   }

   checkValidity(form) {
      const setValidation = !this.nameFormControl.value && !this.amountFormControl.value;
      const setDisabled = !form.valid ||  !this.nameFormControl.value || !this.amountFormControl.value;
      
      setValidation ? this.amountFormControl.clearValidators() && this.nameFormControl.clearValidators() : false;
      
      return setDisabled;
   }

  private initForm(formBuilder: FormBuilder){
    return formBuilder.group({
      name: new FormControl(''),
      amount: new FormControl('')
    });
   }

  private setValidators(control, formControlName) {
    control.setValidators([Validators.required,
                           Validators.pattern(this.patterns[formControlName]),
                           Validators.maxLength(20)]);
    control.updateValueAndValidity();
  }

  private clearValidators(control) {
    control.clearValidators();
    control.updateValueAndValidity();
  }
}
