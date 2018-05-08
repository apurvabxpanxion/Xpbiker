import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, App, AlertController, MenuController, LoadingController  } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { UsersPage } from '../users/users';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit  {
  public tap: number = 0;
  public todos = [];
  constructor(public navCtrl: NavController, public app: App, public loadingCtrl: LoadingController, private alertController: AlertController, public menuCtrl: MenuController) {

  }
  name:string;
  ngOnInit() {
   this.name = "Apurva"
  }
  openMenu() {
    this.menuCtrl.open();
  }
  closeMenu(){
    this.menuCtrl.close();
  }
  tapEvent(e) {
    this.tap++
  }
  AboutPage(){
    
    this.navCtrl.push(AboutPage);
  }
  ProfilePage(){
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
    this.navCtrl.push(ProfilePage);
  }
  UsersPage(){
    this.navCtrl.push(UsersPage);
  }    logout(){
      const root = this.app.getRootNav();
      root.popToRoot();
    }

    openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title:"Add your Comment",
      inputs:[{
        type:"text",
        name:"addTodoInput"
      }],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"Add Comment",
          handler: (inputData)=>{
            let todoText;
            todoText =  inputData.addTodoInput;
            this.todos.push(todoText);
          }
        }
      ]
    });
     addTodoAlert.present();
    }
}
