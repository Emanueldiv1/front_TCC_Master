import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatComponent } from './web-chat.component';

describe('WebChatComponent', () => {
  let component: WebChatComponent;
  let fixture: ComponentFixture<WebChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
