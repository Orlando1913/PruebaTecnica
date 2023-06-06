import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEditComponent } from './dialog-add-edit.component';

describe('DialogAddEditComponent', () => {
  let component: DialogAddEditComponent;
  let fixture: ComponentFixture<DialogAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddEditComponent]
    });
    fixture = TestBed.createComponent(DialogAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
