import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccidentsComponent } from './view-accidents.component';

describe('ViewAccidentsComponent', () => {
  let component: ViewAccidentsComponent;
  let fixture: ComponentFixture<ViewAccidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAccidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
