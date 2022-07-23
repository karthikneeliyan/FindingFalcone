import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconeFinderComponent } from './falcone-finder.component';

describe('FalconeFinderComponent', () => {
  let component: FalconeFinderComponent;
  let fixture: ComponentFixture<FalconeFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalconeFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FalconeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
