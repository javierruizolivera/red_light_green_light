import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userForm: FormGroup;


  constructor(private _formBuilder: FormBuilder, private _usersServices: UsersService, private _router: Router) { 
    this.userForm = this._createForm();
  }

  ngOnInit() {
  }

  public createUser(){
   let name:string = this.userForm?.getRawValue().userName;
   let user:any = this._usersServices.findUser(name);

   if (!user){
     user = { name: name.toLowerCase(), score: 0, highScore: 0}
     this._usersServices.addNewUser(user);
   }
   this._usersServices.setUserGame(user);
   this._navigateToGame();
  }

  private _navigateToGame(){
    this._router.navigate(['/game']);
  }

  private _createForm(){
    return this._formBuilder.group({
      userName: new FormControl('')
    });
  }

}
