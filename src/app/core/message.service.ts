import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { };

  success(message: string){
    this.toastrService.success(message);
  }

  error(message: string){
    this.toastrService.error(message);
  }
}
