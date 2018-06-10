import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Empty test
   * @param field
   */
  public isEmpty(field: string): boolean {
    let error = false;
    const isEmptyRegex = /^\s*$/;
    error = isEmptyRegex.test(field);
    return error;
  }

  /**
   * Is Checked test
   * @param field 
   */
  public isChecked(field): boolean {
    let error = false;
    if(!field) error = true;
    return error;
  }

  /**
   * Empty & format test
   * @param email
   */
  public isEmail(email: string): string {
    let errorType = '';
    let empty = false;
    let format = false;

    const isEmptyRegex = /^\s*$/;
    empty = isEmptyRegex.test(email);
    if(empty) errorType = 'empty';

    if(!empty) {
      const isEmailRegex = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      format = !isEmailRegex.test(email);
      if(format) errorType = 'format';
    }
    
    return errorType;
  }
}