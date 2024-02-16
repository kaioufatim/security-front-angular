import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenficationComponent } from './authenfication.component';

describe('AuthenficationComponent', () => {
  let component: AuthenficationComponent;
  let fixture: ComponentFixture<AuthenficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenficationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
