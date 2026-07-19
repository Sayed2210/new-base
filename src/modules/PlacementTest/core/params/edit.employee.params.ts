import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type { EmployeeStatusEnm } from '@/modules/employee/core/constant/employee.status.enum';
import type { GenderENum } from '@/modules/employee/core/constant/gender.enum';
import isBase64 from '@/base/Presentation/Utils/is_base64';

/**
 * Parameters for editing an employee
 */
export default class EditEmployeeParams implements Params {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phone: string;
  public image: string;
  public EmployeeRef: string;
  public gender: GenderENum;
  public employeeStatus: EmployeeStatusEnm;
  public password: string;

  public static readonly validation = new ClassValidation().setRules({
    firstname: { required: true },
    email: { required: true },
    phone: { required: true },
    password: { required: false },
  });

  constructor(data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    image: string;
    EmployeeRef: string;
    gender: GenderENum;
    employeeStatus: EmployeeStatusEnm;
    password: string;
  }) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.phone = data.phone;
    this.image = data.image;
    this.EmployeeRef = data.EmployeeRef;
    this.gender = data.gender;
    this.employeeStatus = data.employeeStatus;
    this.password = data.password;
  }

  toMap(): { [p: string]: any } {
    return {
      employee_id: this.id,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      phone: this.phone,
      ...(isBase64(this.image) && {
        image: this.image,
      }),
      employee_ref: this.EmployeeRef,
      gender: this.gender,
      status: this.employeeStatus,
      password: this.password,
    };
  }

  validate() {
    return EditEmployeeParams.validation.validate(this);
  }

  validateOrThrow() {
    return EditEmployeeParams.validation.validateOrThrow(this);
  }
}
