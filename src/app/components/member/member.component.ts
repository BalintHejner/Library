import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MemberModel } from '../../models/member.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

  errorMessage = '';
  name = '';
  members: MemberModel[] = [];

  constructor(private httpService: HttpService) {}

  search(): void {
    this.errorMessage = '';
    this.members = [];
    if (!this.name) {
      this.errorMessage = 'Kérem adja meg a keresett nevet!';
      return;
    }

    this.httpService.memberList(this.name).subscribe({
      next: (result: MemberModel[]) => {
        this.members = result;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? err.message;
        console.log(err);
      }
    })
  }
}
