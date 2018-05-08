import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular-lite';
import { MbscForm } from '@mobiscroll/angular-lite';
import { ApiService } from '../../app/api.service';
import { AuthService } from '../../app/auth.service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  reactForm: FormGroup;
  reactSubmitted: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private apiservice:ApiService, private authservice:AuthService) {
    this.reactForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      bio: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
 
   registerData = {}
   
  getErrorState(field: string) {
    var ctrl = this.reactForm.get(field);
    return ctrl.invalid && this.reactSubmitted;
  }


  @ViewChild('templForm')
    templForm: any;
    templSubmitted: boolean = false;
    gender: string = '';

    login() {
        console.log(this.registerData)
        this.authservice.getUser(this.registerData)
        this.templSubmitted = true;
        if (this.templForm && this.templForm.valid) {
          this.navCtrl.push(LoginPage);
           
        }
    };

    getErrorMessage(field: string, form: string) {
      var formCtrl = form === 'react' ? this.reactForm : this.templForm.control,
          message = '';
      if (formCtrl) {
          var ctrl = formCtrl.get(field);
          if (ctrl && ctrl.errors) {
              for (var err in ctrl.errors) {
                  if (!message && ctrl.errors[err]) {
                      message = this.errorMessages[field][err];
                  }
              }
          }
      }
      return message;
  }

  errorMessages = {
    namef: {
      required: 'Name required',
      minlength: 'Has to be at least 2 characters'
  },
    username: {
        required: 'Username required',
        minlength: 'Has to be at least 2 characters'
    },
    gender: {
        required: 'Gender required'
    },
    tel: {
        required: 'Number required',
        minlength: "Don't be shy, enter your number"
    },
    email: {
        required: 'Email address required',
        email: 'Invalid email address'
    },
    password: {
        required: 'Password required',
        minlength: 'At least 6 characters required'
    }
  }

  @ViewChild('thanks')
  thanksPopup: any;

  widgetSettings: any = {
      theme: 'ios',
      display: 'center',
      focusOnClose: false,
      buttons: [{
          text: 'Log in',
          handler: 'set'
      }]
  };

}
