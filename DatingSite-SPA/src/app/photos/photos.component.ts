import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Photo } from '../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AuthService } from '../_services/auth.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  baseUrl = environment.apiUrl;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  @Input() photos: Photo[];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private alertify: AlertifyService
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
          console.log(events.body);
          this.alertify.success('Added sucessfully!!');
        }
      });
  }
}
