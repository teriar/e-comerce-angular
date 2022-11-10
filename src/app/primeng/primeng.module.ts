import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';



@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    TableModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule
   
  ]
})
export class PrimengModule { }
