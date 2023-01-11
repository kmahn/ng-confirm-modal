import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Confirmable, ConfirmTarget } from './dialogs';

@Component({
  selector: 'lf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: any[] = [
    { name: '사과', price: 1000 },
    { name: '배', price: 2000 },
    { name: '포도', price: 1500 },
    { name: '바나나', price: 500 },
  ];

  constructor() {
  }


  @Confirmable({
    title: '다음 상품을 추가하시겠습니까?',
    description: '상품명: %s'
  })
  add(@ConfirmTarget() name: string, price: number) {
    this.items.push({ name, price });
  }

  @Confirmable({
    title: '다음 상품을 삭제하시겠습니까?',
    description: '상품명: %s'
  })
  delete(@ConfirmTarget('name') item: any) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
