import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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

  public hideBtn = false;
  public hideBtn_edit = false;
  public addLoader = false;
  public deleteLoaderId = "";
  public editLoaderId = "";
  public updateLoader = false;
  public mainLoader = false;
  public emptyArray = false;
  
  public addEmployeeClass = "addEmployee";
  public editEmployeeClass = "editEmployee";

  constructor(private FB: FormBuilder, private CRUDService: CrudService) { }

  ngOnInit() {
    this.CRUDService.read()
    .subscribe(
      response => this.readResponseHandler(response),
      error => alert("Failed to read! "+error),
    );
  }

  readResponseHandler(response: any) {
    this.mainLoader = true;
    this.employees = response;
    if (this.employees.length == 0) {
      this.emptyArray = true;
    };
  }

  newEmployee = this.FB.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    contactNumber: ["", Validators.required],
    emailAddress: ["", Validators.required],
    dateOfBirth: ["", Validators.required],
    streetAddress: ["", Validators.required],
    city: ["", Validators.required],
    postalCode: ["", Validators.required],
    country: ["", Validators.required],
    skills: this.FB.array([])
  })

  addEmployeeBtn() {
    this.addEmployeeClass = "addEmployee_show"
  }

  addSkill() {
    if (this.skills.length < 3) {
      this.skills.push(this.FB.group({
        skill: [""],
        yrsExp: [""],
        seniorityRating: [""]
      }));
    } 
    if (this.skills.length == 3) {
      this.hideBtn = true;
    }
  }

  removeSkill(i:any) {
    this.skills.removeAt(i);
    if (this.skills.length < 3) {
      this.hideBtn = false;
    }
  }

  submitData() {
    this.addLoader = true;
    this.emptyArray = false;
    this.CRUDService.add(this.newEmployee.value)
    .subscribe(
      response => this.addResponseHandler(response),
      error => alert("Failed to add! "+error),
    );
  }

  addResponseHandler(response: any) {
    this.employees = response;
    this.addLoader = false;
    this.newEmployee.reset();
    this.addEmployeeClass = "addEmployee";
    if (this.employees.length == 0) {
      this.emptyArray = true;
    };
  }

  cancelNewEmployee() {
    this.newEmployee.reset();
    this.addEmployeeClass = "addEmployee";
  }

  deleteData(employeeID:string) {
    this.deleteLoaderId = employeeID;
    let obj = {"employeeID": employeeID};
    this.CRUDService.delete(obj)
    .subscribe(
      response => this.deleteResponseHandler(response),
      error => alert("Failed to delete! "+error),
    );
  }

  deleteResponseHandler(response: any) {
    this.deleteLoaderId = "";
    this.employees = response;
    if (this.employees.length == 0) {
      this.emptyArray = true;
    };
  }

  editData(employeeId: string) {
    this.editLoaderId = employeeId;
    this.CRUDService.read().subscribe(
      response => this.editResponseHandler(response, employeeId),
      error => alert("Failed to read employee data! "+error)
    )
  }

  editResponseHandler(response: any, employeeId: string) {
    this.editLoaderId = "";
    this.editEmployeeClass = "editEmployee_show";
    response.map((employee: any) => {
      if (employeeId == employee.employee_id) {
        this.editEmployee.patchValue({
          employee_id: employeeId,
          firstName_edit: employee.first_name,
          lastName_edit: employee.last_name,
          contactNumber_edit: employee.contact_number,
          emailAddress_edit: employee.email_address,
          dateOfBirth_edit: employee.date_of_birth,
          streetAddress_edit: employee.street_address,
          city_edit: employee.city,
          postalCode_edit: employee.postal_code,
          country_edit: employee.country
        });
        
        while (this.skills_edit.length != 0) {
          this.skills_edit.removeAt(0);
        }
        for (let count = 1; count <= 3; count++) {
          if (employee["skill_"+count] != null) {
            this.skills_edit.push(this.FB.group(
              {
                skill: [employee["skill_"+count]],
                yrsExp: [employee["years_of_exp_"+count]],
                seniorityRating: [employee["seniority_rating_"+count]]
              }
            ));
          }
        }
      }
    });
    if (this.skills.length == 3) {
      this.hideBtn = true;
    } else if (this.skills_edit.length < 3) {
      this.hideBtn_edit = false;
    };
  }

  editEmployee = this.FB.group({
    employee_id: [""],
    firstName_edit: ["", Validators.required],
    lastName_edit: ["", Validators.required],
    contactNumber_edit: ["", Validators.required],
    emailAddress_edit: ["", Validators.required],
    dateOfBirth_edit: ["", Validators.required],
    streetAddress_edit: ["", Validators.required],
    city_edit: ["", Validators.required],
    postalCode_edit: ["", Validators.required],
    country_edit: ["", Validators.required],
    skills_edit: this.FB.array([])
  })

  addSkill_edit() {
    if (this.skills_edit.length < 3) {
      this.skills_edit.push(this.FB.group({
        skill: [""],
        yrsExp: [""],
        seniorityRating: [""]
      }));
    } 
    if (this.skills_edit.length == 3) {
      this.hideBtn_edit = true;
    }
  }

  updateData() {
    this.updateLoader = true;
    this.CRUDService.update(this.editEmployee.value)
    .subscribe(
      response => this.updateResponseHandler(response),
      error => alert("Failed to update! "+error),
    );
  }

  updateResponseHandler(response: any) {
    this.employees = response;
    this.updateLoader = false;
    this.editEmployeeClass = "editEmployee";
  }

  cancelUpdate() {
    this.editEmployee.reset();
    this.editEmployeeClass = "editEmployee";
  }

}
