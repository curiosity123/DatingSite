import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = true;
  baseUrl = environment.apiUrl;

  @Input() photos: Photo[];

  constructor(private authService: AuthService) {
    this.uploader = new FileUploader({
      url: this.baseUrl +
      'users/' +
      this.authService.decodedToken.nameid +
      '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      isHTML5:true,
      allowedFileType: ['image'],
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      },

      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
 
    this.hasBaseDropZoneOver = false;

 

  }

  ngOnInit() {

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


}
