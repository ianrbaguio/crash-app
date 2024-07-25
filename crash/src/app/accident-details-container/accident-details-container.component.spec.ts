import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentDetailsContainerComponent } from './accident-details-container.component';

describe('AccidentDetailsContainerComponent', () => {
  let component: AccidentDetailsContainerComponent;
  let fixture: ComponentFixture<AccidentDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentDetailsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccidentDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
