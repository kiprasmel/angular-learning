import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchImprovedComponent } from './hero-search-improved.component';

describe('HeroSearchImprovedComponent', () => {
  let component: HeroSearchImprovedComponent;
  let fixture: ComponentFixture<HeroSearchImprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchImprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchImprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
