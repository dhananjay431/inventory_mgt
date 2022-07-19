import { Component, OnInit, VERSION } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  data: any = '';
  sub = new Subject();
  x: any;
  y: any;
  ngOnInit() {
    let that = this;
    this.data = this.sub.pipe(map((d) => this.generag(d[0], d[1])));

    setTimeout(() => {
      that.change();
    }, 0);
  }
  change() {
    let c1 = this.getNumber(5, 20);
    this.x = Array(this.getNumber(5, 20)).fill(1);
    this.y = Array(this.getNumber(5, 20)).fill(1);
    this.sub.next([this.x, this.y]);
  }

  change_status() {
    this.sub.next([this.x, this.y]);
  }
  genRand = (len) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2)
      .toUpperCase();
  };
  oa(d) {
    return d;
  }
  getNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  generag(x, y) {
    let Level = x.map((d1, i1) => {
      return {
        levelnumber: i1 + 1,
        levelData: y.map((d2, i2) => {
          let a = [2, 2,2,2, 5];
          return {
            slot: {
              slotnumber: this.genRand(2),
              seq: i2 + 1,
              // status: Math.floor(Math.random() * 100) % 2 === 0 ? 1 : 0,
              status: a[Math.floor(Math.random() * a.length)] % 2 === 0 ? 1 : 0,
              desc: this.genRand(4),
            },
          };
        }),
      };
    });

    return {
      row: {
        rownumber: 'A',
        Level: Level,
      },
    };
  }
}
