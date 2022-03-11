import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostsItemComponent } from './list-posts-item.component';

describe('ListPostsItemComponent', () => {
  let component: ListPostsItemComponent;
  let fixture: ComponentFixture<ListPostsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
