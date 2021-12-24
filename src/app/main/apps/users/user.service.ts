import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AdmUser } from './AdmUser';
import { environment as env } from 'environments/environment';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {PersonsService} from '../../../shared/services/person.service'




@Injectable({providedIn: 'root'})

export class UserService {

    OnUserChange: BehaviorSubject<any>;
    OnSingleUserChange: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onUserLoguedChanged: Subject<any>;

    constructor( 
        private api: ApiService, private PersonService: PersonsService, private _fuseProgressBarService: FuseProgressBarService) {
        this.OnUserChange = new BehaviorSubject([]);   
        this.OnSingleUserChange = new BehaviorSubject([]);   
        this.onSearchTextChanged = new Subject();
        this.onUserLoguedChanged = new BehaviorSubject([]);
        

    }


}