import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };

  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (
      this.registerUser.userName.length != 0 &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.loading = false;
          this.success = true;
          this.warning = '';
        },
        (err) => {
          this.success = false;
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    } else {
      this.warning = 'Passwords do not match';
    }
  }
}
