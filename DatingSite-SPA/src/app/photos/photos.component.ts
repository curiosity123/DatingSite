import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Photo } from '../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AuthService } from '../_services/auth.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { JsonPipe } from '@angular/common';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  @Input() photos: Photo[];
  @Output() OnMainPhotoChanged = new EventEmitter<string>();
  @Output() OnDeletePhoto = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }

  onSend() {
    if (this.previewUrl == null) {
      return;
    }

    const formData = new FormData();
    formData.append('File', this.fileData);

    this.fileUploadProgress = '0%';

    this.http
      .post(
        this.baseUrl +
          'users/' +
          this.authService.decodedToken.nameid +
          '/photos',
        formData,
        {
          reportProgress: true,
          observe: 'events'
        }
      )
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress =
            Math.round((events.loaded / events.total) * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          this.previewUrl = null;
          this.photos.push(events.body as Photo);
          if (this.photos.length === 1)
          {
            this.currentMain = this.photos.filter(x => x.isMain === true)[0];
            this.currentMain.isMain = false;
            (events.body as Photo).isMain = true;
            this.OnMainPhotoChanged.emit((events.body as Photo).url);
          }
          console.log(events.body);
          this.alertify.success('Added sucessfully!!');
        }
      });
  }

  setAsMain(photo: Photo) {
    this.userService
      .SetMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        x => {
          this.currentMain = this.photos.filter(x => x.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.OnMainPhotoChanged.emit(photo.url);     
        },
        error => this.alertify.error('Error')
      );
  }

  removePhoto(id: number) {
    this.alertify.confirm('Do you want to remove photo?', () => this.OnDeletePhoto.emit(id));
  }
}
