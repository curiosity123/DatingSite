import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserParams } from 'src/app/models/UserParams';
import { filter } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.css']
})
export class UserListFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  userParams: UserParams;
  @Input() ngValue: boolean
  @Output() FilterParamsChanged = new EventEmitter<UserParams>();
  myForms: FormGroup;
 


  ngOnInit() {
    this.userParams = new UserParams();
    this.myForms = this.formBuilder.group({
      filter: 'Created',
      gender: 'kobieta'
    });
    this.CommitFilter();
  }


  CommitFilter() {
    this.myForms.get('filter').value == 'Created' ? this.userParams.sortByLastActive = false : this.userParams.sortByLastActive = true;
    this.myForms.get('gender').value == 'kobieta' ? this.userParams.gender = 'kobieta' : this.userParams.gender = 'mężczyzna';
    this.FilterParamsChanged.emit(this.userParams);
  }
  ClearFilter() {
    this.userParams = new UserParams();
    this.CommitFilter();
  }

}
