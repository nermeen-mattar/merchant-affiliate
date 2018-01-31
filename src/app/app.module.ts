import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './core/loaders/translate-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpRequestsService } from './core/services/http-requests.service';
import { TokenHandlerService } from './auth/services/token-handler.service';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [HttpRequestsService, TokenHandlerService, AuthService, AuthGuard], // both used by auth service
  bootstrap: [AppComponent],
})
export class AppModule {}
