import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FalconeFinderComponent } from './falcone-finder/falcone-finder.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './token.service';
import { PlanetSelectorCallbackPipe } from './planet-selector-callback.pipe';
import { SuccessLayoutComponent } from './success-layout/success-layout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HelpinfoComponent } from './helpinfo/helpinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FalconeFinderComponent,
    PlanetSelectorCallbackPipe,
    SuccessLayoutComponent,
    WelcomeComponent,
    HelpinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [TokenService,PlanetSelectorCallbackPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
