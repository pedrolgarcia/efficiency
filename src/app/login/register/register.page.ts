import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AlertService } from '../../shared/alert/alert.service';
import { Router } from '@angular/router';
import { MenuController, ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BASE_URL } from '../../app.api';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  myphoto;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private menuCtrl: MenuController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File, private http: HttpClient,
    private actionSheetController: ActionSheetController, private loadingCtrl: LoadingController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        response => {
          if (this.myphoto) {
            this.uploadImage();
          }
          this.alert.header = response.success;
          this.alert.message = response.message;
          this.alert.buttons = [{ text: 'Acessar', handler: () => this.router.navigate(['/login']) }];
          this.alert.presentAlert();
        }
      );
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadImage() {
    const fileTransfer: FileTransferObject = this.transfer.create();

    var random = Math.floor(Math.random() * 100);

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: this.registerForm.get('name').value + '.jpg',
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpeg',
      headers: {}
    };

    fileTransfer.upload(this.myphoto, `${BASE_URL}/photoUpload`, options)
      .then((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }
}
