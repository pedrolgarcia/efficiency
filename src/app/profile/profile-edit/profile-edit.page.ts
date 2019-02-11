import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';
import { Regex } from '../../regex';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { BASE_URL, BASE_BACKEND } from '../../app.api';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  editProfileForm: FormGroup;
  changePassword = false;
  myphoto;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private regex: Regex,
    private camera: Camera,
    private transfer: FileTransfer
  ) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      name: this.formBuilder.control(this.authService.getUser().name, [Validators.pattern(new Regex().alphabeticRegex)]),
      changePassword: this.formBuilder.control(''),
      oldPassword: this.formBuilder.control('', [Validators.minLength(6)]),
      password: this.formBuilder.control('', [Validators.minLength(6)]),
      confirmPassword: this.formBuilder.control('', [Validators.minLength(6)])
    });
  }

  onSubmit(user): void {
    this.profileService.editUser(user).subscribe(response => {
      localStorage.setItem('user', btoa(JSON.stringify(response[0])));
      this.uploadImage(response[0]);

      this.alert.header = response.success;
      this.alert.message = response.message;
      this.alert.buttons = [{ text: 'OK', handler: () => this.router.navigate(['/profile']) }];
      this.alert.presentAlert();
    });
  }

  ionViewWillEnter() {
    this.myphoto = this.authService.getUser().avatar;
  }

  showPasswordFields(e) {
    this.changePassword = e.target.checked;
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

  uploadImage(user) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    var random = Math.floor(Math.random() * 100);

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: this.editProfileForm.get('name').value + '.jpg',
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpeg',
      headers: {}
    };

    fileTransfer.upload(this.myphoto, `${BASE_URL}/photoUpload/${user.id}`, options)
      .then((data) => {
        user.avatar = `${BASE_BACKEND}${JSON.parse(data.response).path}`;
        localStorage.setItem('user', btoa(JSON.stringify(user)));
      }, (err) => {
        console.log(err);
      });
  }

}
