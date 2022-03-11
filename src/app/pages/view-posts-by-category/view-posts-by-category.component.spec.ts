import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostsByCategoryComponent } from './view-posts-by-category.component';

describe('ViewPostsByCategoryComponent', () => {
  let component: ViewPostsByCategoryComponent;
  let fixture: ComponentFixture<ViewPostsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
