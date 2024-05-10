import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcSecurityService } from 'angular-auth-oidc-client';

import { environment } from '@env/environment';
import { ProfileService } from '@app/shared/components/header/repository/profile.service';
import { Store } from '@ngxs/store';
import { SvgIcons } from '@ngneat/svg-icon';
import { OAuthUserModel } from '@app/shared/modules/user/models/User';

class ProfileOptionsModel {
  title?: string;
  icon?: SvgIcons;
  onClick?: () => void;
  hasStatus?: boolean;
  status?: string;
}
@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent implements OnInit {
  userFullName: string;
  profileOptions: ProfileOptionsModel[] = [
    {
      title: 'توافق نامه ها',
      icon: 'clipboard-tick',
      onClick: () => {
        this.router.navigateByUrl('/panel/contracts').then();
      },
      hasStatus: false,
    },
    {
      title: 'تغییر کلمه عبور',
      icon: 'password-check',
      onClick: () => this.redirect('account-management/change-password'),
      hasStatus: false,
    },
    {
      title: 'گزارش ورود و خروج',
      icon: 'calendar-2',
      onClick: () => this.redirect('account-management/login-history'),
      hasStatus: false,
    },
    {
      title: 'وضعیت ورود دو مرحله ای',
      icon: 'login',
      onClick: () => this.redirect('account-management'),
      hasStatus: true,
      status: 'active',
    },
    {
      title: 'خروج',
      icon: 'logout',
      onClick: () => this.logout(),
      hasStatus: false,
    },
  ];

  constructor(private profileService: ProfileService, private oidcSecurityService: OidcSecurityService, private router: Router, private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.get2faStatus();
    this.getUserInfo();
  }

  getUserInfo() {
    this.oidcSecurityService.getUserData().subscribe((response: OAuthUserModel) => {
      this.userFullName = `${response.first_name} ${response.last_name}`;
    });
  }

  private logout() {
    this.oidcSecurityService.logoff().subscribe();
  }

  private get2faStatus(): void {
    this.profileService.get2fa().subscribe(status => {
      this.profileOptions.find(i => i.title === 'وضعیت ورود دو مرحله ای').status = status ? 'active' : 'deActive';

      this.cdr.detectChanges();
    });
  }

  private redirect(link: string): void {
    window.location.href = `${environment.oauthBaseUrl}/${link}?return_url=${window.location.href}`;
  }
}
