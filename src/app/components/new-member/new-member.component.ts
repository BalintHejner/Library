import { Component } from '@angular/core';
import { MemberModel } from '../../models/member.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.css'
})
export class NewMemberComponent {

  member: MemberModel = {
    id: 0,
    name: '',
    birthDate: '',
    email: '',
    mobil: '',
    from: '',
    to: ''
  };

  errorMessage ='';

  constructor(private httpService: HttpService, private router: Router) {}

  save(): void {
    if (!this.member.name) {
      this.errorMessage = 'Kérem adja meg a tag nevét!'
      return;
    }
    if (!this.member.birthDate) {
      this.errorMessage = 'Kérem adja meg a tag születési idejét!'
      return;
    }
    if (!this.member.email) {
      this.errorMessage = 'Kérem adja meg a tag email címét!'
      return;
    }
    if (!this.member.mobil) {
      this.errorMessage = 'Kérem adja meg a tag mobil számát!'
      return;
    }

    this.httpService.newMember(this.member).subscribe({
      next: (result:MemberModel) => {
        alert(`A tag olvasójegyének száma: ${result.id}`);
        this.router.navigateByUrl('members');
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? err.message;
        console.log(err);
      }
    });
  }
}
