import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorAreaComponent } from './floor-area.component';

describe('FloorAreaComponent', () => {
  let component: FloorAreaComponent;
  let fixture: ComponentFixture<FloorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
