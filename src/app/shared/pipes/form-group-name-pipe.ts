import { Pipe, PipeTransform } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Pipe({name: 'getGroupFormName'})

export class GetGroupFormNamePipe implements PipeTransform {
    transform(group: FormGroup): any {
        return group.controls['group_name'].value
    }
}