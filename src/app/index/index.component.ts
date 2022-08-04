import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  employees:any;

  get skills() {
    return this.newEmployee.get("skills") as FormArray;
  };

  get skills_edit() {
    return this.editEmployee.get("skills_edit") as FormArray;
  };

  constructor(private FB: FormBuilder, private CRUDService: CrudService) { }

  ngOnInit() {
    this.CRUDService.read()
    .subscribe(
      response => this.readResponseHandler(response),
      error => console.log("Failed to read! ", error),
    );
    this.editEmployee.patchValue({
        firstName_edit: "yes",
        lastName_edit: "we",
        contactNumber_edit: "are",
        emailAddress_edit: "here",
        dateOfBirth_edit: "to",
        streetAddress_edit: "stay",
        city_edit: "all",
        postalCode_edit: "night",
        country_edit: "long"
    });
    this.skills_edit.push(this.FB.group(
      {
        skill: ["eeee"],
        yrsExp: ["bbbb"],
        seniorityRating: ["rrrr"]
      }
    ));
    this.skills_edit.push(this.FB.group(
      {
        skill: ["qqq"],
        yrsExp: ["ccccc"],
        seniorityRating: ["hhhh"]
      }
    ));
  }

  readResponseHandler(response: any) {
    this.employees = response;
    console.log("Successfully read!", this.employees);
  }

  newEmployee = this.FB.group({
    firstName: ["Your name..."],
    lastName: [""],
    contactNumber: [""],
    emailAddress: [""],
    dateOfBirth: [""],
    streetAddress: [""],
    city: [""],
    postalCode: [""],
    country: [""],
    skills: this.FB.array([])
  })

  addSkill() {
    this.skills.push(this.FB.group({
      skill: [""],
      yrsExp: [""],
      seniorityRating: [""]
    }));
  }

  removeSkill(i:any) {
    this.skills.removeAt(i);
  }

  submitData() {
    this.CRUDService.add(this.newEmployee.value)
    .subscribe(
      response => this.addResponseHandler(response),
      error => console.log("Failed to add! ", error),
    );
  }

  addResponseHandler(response: any) {
    this.employees = response;
    console.log("Successfully added!", this.employees);
  }

  deleteData(employeeID:string) {
    let obj = {"employeeID": employeeID};
    this.CRUDService.delete(obj)
    .subscribe(
      response => this.deleteResponseHandler(response),
      error => console.log("Failed to delete! ", error),
    );
  }

  deleteResponseHandler(response: any) {
    this.employees = response;
    console.log("Successfully deleted!", this.employees);
  }

  editData(employeeData: any) {
    console.log(employeeData);
  }

  editEmployee = this.FB.group({
    firstName_edit: ["..."],
    lastName_edit: ["..."],
    contactNumber_edit: [""],
    emailAddress_edit: [""],
    dateOfBirth_edit: [""],
    streetAddress_edit: [""],
    city_edit: [""],
    postalCode_edit: [""],
    country_edit: [""],
    skills_edit: this.FB.array([])
  })

  addSkill_edit() {
    this.skills_edit.push(this.FB.group({
      skill: [""],
      yrsExp: [""],
      seniorityRating: [""]
    }));
  }

  removeSkill_edit(i:any) {
    this.skills_edit.removeAt(i);
  }

  updateData() {
    console.log(this.editEmployee.value);
    /*this.CRUDService.add(this.newEmployee.value)
    .subscribe(
      response => this.addResponseHandler(response),
      error => console.log("Failed to add! ", error),
    );*/
  }

}
