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
  ngOnInit() {
    let that = this;
    this.data = this.sub.pipe(
      map((d) => {
        let dt = this.generag();
        console.log(dt);
        return dt;
      })
    );

    setTimeout(() => {
      that.change();
    }, 0);
  }
  change() {
    this.sub.next(1);
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

  generag() {
    var x = Array(this.getNumber(3, 10)).fill(1);
    var y = Array(this.getNumber(3, 10)).fill(1);
    let Level = x.map((d1, i1) => {
      return {
        levelnumber: i1 + 1,
        levelData: y.map((d2, i2) => {
          return {
            slot: {
              slotnumber: this.genRand(2),
              seq: i2 + 1,
              status: Math.floor(Math.random() * 100) % 2 === 0 ? 1 : 0,
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
