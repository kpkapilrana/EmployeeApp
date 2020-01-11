import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { map, switchMap } from 'rxjs/operators';
import { Location} from '@angular/common';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  formGroup: FormGroup;
  columns = 4;
  id: any;
  data: any;
  validationMessages = {
    name: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
    ],
    phone: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
    };
  fields: any = [
      {
        id: 'name',
        placeholder: 'Name',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data'
      },
      {
        id: 'phone',
        placeholder: 'Phone',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data'
      },
      {
        id: 'city',
        placeholder: 'City',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data',
        group: 'address'
      },
      {
        id: 'address_line1',
        placeholder: 'Address Line1',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data',
        group: 'address'
      },
      {
        id: 'address_line2',
        placeholder: 'Address Line 2',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data',
        group: 'address'
      },
      {
        id: 'postal_code',
        placeholder: 'Postal Code',
        rows: 1,
        cols: 1,
        errorMessage: 'Please Enter Valid Data',
        group: 'address'
      }
  ];

  buttons: any = [
    {
      id: "cancel",
      name: 'Cancel'
    },
    {
      id: "submit",
      name: 'Submit'
    }
  ]
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private snackBarService: SnackbarService
  ) {
    this.formGroup = this.createFormGroup();
    // this.createFormGroup();
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.data);
      this.setFormData(this.data);
    } else {
      this.route.params
      .subscribe(res => {
        if (res) {
          this.id = res.id;
        }
      });
    }
  }

  ngOnInit() {
    if (this.id) {
        this.getData(this.id);
    }
  }

  createFormGroup() {
    const group = {};
    this.fields.forEach(el => {
      if (el.id === 'phone') {
        group[el.id] = new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$') ]));
      } else {
        group[el.id] = new FormControl(null, [Validators.required, Validators.minLength(4)]);
      }
    });
    return new FormGroup(group);
    // this.formGroup = this.fb.group({
    //   name: '',
    //   phone: '',
    //   city: '',
    //   address_line1: '',
    //   address_line2: '',
    //   postal_code: '',
    // });
  }

  setFormData(data) {
    console.log(data);
      this.formGroup.get('name').setValue(data.name ? data.name : null);
      this.formGroup.get('phone').setValue(data.phone ? data.phone : null);
      this.formGroup.get('city').setValue(data.city ? data.city : null);
      this.formGroup.get('address_line1').setValue(data.address_line1 ? data.address_line1 : null);
      this.formGroup.get('address_line2').setValue(data.address_line2 ? data.address_line2 : null);
      this.formGroup.get('postal_code').setValue(data.postal_code ? data.postal_code : null);
  }

  submit() {
    const formData = this.formGroup.value;
    const formattedPayload = {
      name: formData.name,
      phone: formData.phone,
      address: {
        city: formData.city,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        postal_code: formData.postal_code
      }
    };
    if (this.data) {
      const payload  = {
        id: this.data.id,
        data: formattedPayload
      };
      this.employeeService.edit(payload).subscribe((result) => {
        if (result) {
          this.snackBarService.open('Successfully Updated');
          this.router.navigate(['/']);
          // this.location.back();
        } else {
          this.snackBarService.open('Not Updated');
        }
    })
    ;
    } else {
      this.employeeService.add(formattedPayload).subscribe(result => {
        if (result) {
          this.snackBarService.open('Successfully Added');
          this.location.back();
        }
    });
    }
  }

  cancel() {
    this.location.back();
  }

  getData(id) {
    this.employeeService.getById({ id}).subscribe(res => {
      if (res) {
          this.setFormData(res.data);
      }
  });
  }

}
