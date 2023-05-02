import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  errorSession: boolean = false;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private _AuthService: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('emailprueba.com', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin(): void {
    const body = this.loginForm.value;
    console.log("body ", body);
    const { email, password } = body;

    this._AuthService.sendCredentials(email, password).subscribe(
      (res) => {
        console.log("successfully login!");
        this.errorSession = false;
      },
      (error) => {
        console.log("Wrong Email or Password");
        this.errorSession = true;
      }
    );
  }
}
