import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { PaginationResult, Pagination } from '../models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, filter?, likeParams?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<
      User[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('CurrentPage', page);
      params = params.append('PageSize', itemsPerPage);
    }

    if (likeParams == 'UserLikes') {
      params = params.append('UserLikes', 'true');
    }

    if (likeParams == 'UserIsLiked') {
      params = params.append('UserIsLiked', 'true');
    }


    if (filter != null) {
      params = params.append('minAge', filter.minAge);
      params = params.append('maxAge', filter.maxAge);
      if (filter.gender != '') {
        params = params.append('gender', filter.gender);
      }

      if (filter.martialStatus != '') {
        params = params.append('martialStatus', filter.martialStatus);
      }

      if (filter.children != '') {
        params = params.append('children', filter.children);
      }


      if (filter.city != '') {
        params = params.append('city', filter.city);
      }

      params = params.append('sortByLastActive', filter.sortByLastActive);



    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body;

        if (response.headers.get('Pagination') != null) {

          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginationResult;
      })

    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  UpdateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  SetMainPhoto(id: number, photoId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/photos/' + photoId + '/setMain',
      {}
    );
  }

  sendLike(id: number, LikedUserId: number) {

    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + LikedUserId,
      {}
    );
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginationResult: PaginationResult<Message[]> = new PaginationResult<
      Message[]
    >();
    let params = new HttpParams();

    params = params.append('messageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('CurrentPage', page);
      params = params.append('PageSize', itemsPerPage);
    }



    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body;

        if (response.headers.get('Pagination') != null) {

          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginationResult;
      })

    );

  }

  GetConversation(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/conversation/' + recipientId ,  {});
  }

  DeletePhoto(id: number, photoId: number) {
    return this.http.delete(
      this.baseUrl + 'users/' + id + '/photos/' + photoId + '/deletePhoto',
      {}
    );
  }
}
