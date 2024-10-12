import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbdHintComponent } from './kbd-hint.component';

describe('KbdHintComponent', () => {
  let component: KbdHintComponent;
  let fixture: ComponentFixture<KbdHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KbdHintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KbdHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
