import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccidentsContainerComponent } from './view-accidents-container.component';

describe('ViewAccidentsContainerComponent', () => {
  let component: ViewAccidentsContainerComponent;
  let fixture: ComponentFixture<ViewAccidentsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAccidentsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAccidentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
