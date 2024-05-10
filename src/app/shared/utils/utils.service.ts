import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
class Action { }

type Dispatches<AG extends Record<string, new (payload: any) => Action>> = {
  [K in keyof AG]: ConstructorParameters<AG[K]>[0] extends undefined
  ? () => void
  : (payload: ConstructorParameters<AG[K]>[0]) => void;
};

type Selections<Selectors extends Record<string, any>> = {
  [K in keyof Selectors & string as `${K}$`]: Observable<
    ReturnType<Selectors[K]>
  >;
};

type Sources<AG extends Record<string, new (payload: any) => Action>> = {
  [K in keyof AG]: Observable<ConstructorParameters<AG[K]>[0]>;
};
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor(
    private router: Router
  ) {
  }

  public navigateAfter(route: Array<string>, ms = 500) {
    setTimeout(() => {
      this.router.navigate(route);
    }, ms);
  }

  public validateFormFields(formGroup: RxFormGroup) {
    if (formGroup && formGroup.controls) {
      Object.keys(formGroup.controls).forEach((field: any) => {
        const control: any = formGroup.get(field);
        const controlsForm: any = control ? control['controls'] : {};
        if (controlsForm) {
          Object.keys(controlsForm).forEach((f: any) => {
            const ct: any = control?.get(f);
            ct?.markAllAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
      return false;
    } else {
      return true;
    }
  }

  public parseObjectFaValues(obj: any) {
    let tempObj = obj;

    for (const key in tempObj) {
      if (typeof tempObj[key] === 'object') {
        this.parseObjectFaValues(tempObj[key]);
      } else {
        tempObj = { ...tempObj, [key]: this.parseNumberToEn(tempObj[key]) };
      }
    }

    return tempObj;
  }

  public getFilterValues(values: any) {
    let filterStr = '';
    const filledValues: any = {};

    Object.keys(values).forEach((key: any, index: number) => {
      const value = values[key];
      if (Array.isArray(value)) {
        value.forEach((element: any, arrayIndex: number) => {
          const paramName = key + '=' + element;
          const lastParam = Object.keys(values).length - 1 === index && value.length - 1 === arrayIndex ? '' : '&';
          filterStr += paramName + lastParam;
        });
      } else if (value !== null && value !== '') {
        filledValues[key] = value;
      }
    });

    Object.keys(filledValues).forEach((key: any, index: number) => {
      const value = filledValues[key];
      const lastParam = index === Object.keys(filledValues).length - 1 ? '' : '&';
      filterStr += key + '=' + String(value) + lastParam;
    });

    return filterStr;
  }

  public fileDownloader(file: Blob, fileDownloadNameWithSuffix: string = 'myFile.pdf', type: string = "application/pdf") {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    let newBlob = new Blob([file], { type });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(newBlob);
    //   return;
    // }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    let link = document.createElement("a");
    link.href = data;
    link.download = fileDownloadNameWithSuffix;
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  private parseNumberToEn(str: any) {
    if (typeof str === 'string') {
      str = str.replace(/[۰-۹]/g, (d: any): any => String('۰۱۲۳۴۵۶۷۸۹').indexOf(d));
    }
    return str;
  }

}
