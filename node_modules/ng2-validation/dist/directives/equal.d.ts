import { OnInit } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { EqualValueType } from '../custom-validators';
export declare class EqualValidator implements Validator, OnInit {
    equal: EqualValueType;
    private validator;
    ngOnInit(): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
