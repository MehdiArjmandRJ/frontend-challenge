import {NgModule} from '@angular/core';
import {SvgIconComponent, provideSvgIcons} from '@ngneat/svg-icon';
import {businessIcons} from './icons/Business';
import {gridIcons} from './icons/Grid';
import { essetionalIcons } from './icons/Essetional';
import { moneyIcons } from './icons/Money';
import { contentEditIcons } from './icons/Content-Edit';
import { usersIcons } from './icons/Users';
import { supportLikeQuestionIcons } from './icons/Support-Like-Question';
import { computersDevicesElectronicsIcons } from './icons/Computers-Devices-Electronics';
import { arrowIcons } from './icons/Arrow';
import { notificationsIcons } from './icons/Notifications';
import { emailsMessagesIcons } from './icons/Emails-Messages';
import { shopIcons } from './icons/Shop';
import { securityIcons } from './icons/Security';
import { searchIcons } from './icons/Search';
import { customIcons } from './icons/Custom';
import { timeIcons } from './icons/Time';
import { schoolLearningIcons } from './icons/School-Learning';
import { customNotificationIcons } from './icons/Custom-Notification';

@NgModule({
  providers: [
    provideSvgIcons([
      ...businessIcons,
      ...shopIcons,
      ...arrowIcons,
      ...emailsMessagesIcons,
      ...notificationsIcons,
      ...gridIcons,
      ...essetionalIcons,
      ...moneyIcons,
      ...contentEditIcons,
      ...usersIcons,
      ...supportLikeQuestionIcons,
      ...computersDevicesElectronicsIcons,
      ...securityIcons,
      ...searchIcons,
      ...customIcons,
      ...timeIcons,
      ...schoolLearningIcons,
      ...customNotificationIcons,
    ]),
  ],
  imports: [
    SvgIconComponent,
  ],
  exports: [
    SvgIconComponent,
  ]
})
export class IconsModule {}
