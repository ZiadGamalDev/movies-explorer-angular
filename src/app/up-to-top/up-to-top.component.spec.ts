import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpToTopComponent } from './up-to-top.component';

describe('UpToTopComponent', () => {
  let component: UpToTopComponent;
  let fixture: ComponentFixture<UpToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpToTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
