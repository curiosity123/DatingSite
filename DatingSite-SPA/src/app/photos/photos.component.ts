import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AuthService } from '../_services/auth.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

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

  constructor(private authService: AuthService, private http: HttpClient) {

  }

  ngOnInit() {

  }



  // authToken: 'Bearer ' + localStorage.getItem('token')
  fileProgress(fileInput: any) {
    this.fileData =  fileInput.target.files[0] as File;
    this.preview();
}

preview() {
  // Show preview
  const mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(this.fileData);
  reader.onload = (_event) => {
    this.previewUrl = reader.result;
  };
}





  onSend() {
    const formData = new FormData();
    formData.append('File', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post(this.baseUrl +
      'users/' +
      this.authService.decodedToken.nameid +
      '/photos', formData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);
        alert('SUCCESS !!');
      }

    });
};

}
