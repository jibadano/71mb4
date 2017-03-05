import { OnInit } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare class EqualToValidator implements Validator, OnInit {
    equalTo: AbstractControl;
    private validator;
    ngOnInit(): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
