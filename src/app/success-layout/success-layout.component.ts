import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-layout',
  templateUrl: './success-layout.component.html',
  styleUrls: ['./success-layout.component.css']
})
export class SuccessLayoutComponent implements OnInit {

    
    constructor(private route:ActivatedRoute) {
      this.planet_name = this.route.snapshot.params['planet_name'];

     }
  planet_name=""
  ngOnInit(): void {
  }

}
