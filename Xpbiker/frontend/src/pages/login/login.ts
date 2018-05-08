import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular-lite';
import { MbscForm } from '@mobiscroll/angular-lite';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ApiService } from '../../app/api.service';
import { AuthService } from '../../app/auth.service';
import { SlidesPage } from '../slides/slides';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    loginData = {}
  reactForm: FormGroup;
  reactSubmitted: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private apiservice:ApiService, private authservice:AuthService) {
    this.reactForm = fb.group({
     
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  getErrorState(field: string) {
    var ctrl = this.reactForm.get(field);
    return ctrl.invalid && this.reactSubmitted;
  }


  @ViewChild('templForm')
    templForm: any;
    templSubmitted: boolean = false;
    gender: string = '';

    home(value:any) {
        this.templSubmitted = true;
        this.authservice.loginUser(this.loginData);
        console.log(this.loginData);
         if (this.templForm && this.templForm.valid) {
          this.navCtrl.push(SlidesPage);
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
    username: {
        required: 'Username required',
        minlength: 'Has to be at least 2 characters'
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
