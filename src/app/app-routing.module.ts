import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FalconeFinderComponent } from './falcone-finder/falcone-finder.component';
import { HelpinfoComponent } from './helpinfo/helpinfo.component';
import { SuccessLayoutComponent } from './success-layout/success-layout.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"success/:planet_name", component:SuccessLayoutComponent},
  {path:"find_falcone", component:FalconeFinderComponent},
  {path:"help", component:HelpinfoComponent},
  {path:"", component:WelcomeComponent},
  {path:"**", component:FalconeFinderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
