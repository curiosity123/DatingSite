import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.css']
})
export class UserDatailComponent implements OnInit {

  @ViewChild('userTabs', { static: true }) userTabs: TabsetComponent;


  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;

    });
   this.route.queryParams.subscribe(x=>{
     const selectTab = x.tab;
     this.userTabs.tabs[selectTab>0? selectTab:0].active = true;
   })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        preview: false,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = this.getImages();
  }


  getImages() {
    const imagesUrl = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imagesUrl.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });

    }
    return imagesUrl;
  }

  like(id: number) {
    console.log("poszło");
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(res => {
      this.alertifyService.success('User was liked :)');
    }, error => {
      this.alertifyService.error('something went wrong :( ');
    });
  }

  selectTab(tabId: number) {
    this.userTabs.tabs[tabId].active = true;
  }

}
