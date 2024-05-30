import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDateComponent } from './initial-date.component';

describe('InitialDateComponent', () => {
  let component: InitialDateComponent;
  let fixture: ComponentFixture<InitialDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
