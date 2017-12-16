import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { JustGeneratedSharedModule, UserRouteAccessService } from './shared';
import { JustGeneratedAppRoutingModule} from './app-routing.module';
import { JustGeneratedHomeModule } from './home/home.module';
import { JustGeneratedAdminModule } from './admin/admin.module';
import { JustGeneratedAccountModule } from './account/account.module';
import { JustGeneratedEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        JustGeneratedAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JustGeneratedSharedModule,
        JustGeneratedHomeModule,
        JustGeneratedAdminModule,
        JustGeneratedAccountModule,
        JustGeneratedEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JustGeneratedAppModule {}
