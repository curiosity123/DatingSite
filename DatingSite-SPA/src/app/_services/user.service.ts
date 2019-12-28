import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { PaginationResult,  Pagination } from '../models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<
      User[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('CurrentPage', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        paginationResult.result = response.body;
        if(response.headers.get('Pagination') != null)
        {
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

  DeletePhoto(id: number, photoId: number) {
    return this.http.delete(
      this.baseUrl + 'users/' + id + '/photos/' + photoId + '/deletePhoto',
      {}
    );
  }
}
