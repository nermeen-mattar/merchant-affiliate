import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
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
    CoreModule
  ],
  providers: [HttpRequestsService, TokenHandlerService, AuthService, AuthGuard], // both used by auth service
  bootstrap: [AppComponent],
})
export class AppModule {}
