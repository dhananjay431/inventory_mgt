import { Component, OnInit, VERSION } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;

  data: any = "";
  sub = new Subject();
  x: any;
  y: any;
  rr: any;
  htm = (d) =>
    `<div>desc=${d.desc}<br>status=${d.status}<br>slotnumber=${d.slotnumber}<br>seq=${d.seq}</div>`;
  ngOnInit() {
    let that = this;
    this.data = this.sub.pipe(
      map((d) => {
        let dt = this.generag(d[0], d[1]);
        console.log("dt=>", dt);
        return dt;
      })
    );

    setTimeout(() => {
      that.change();
    }, 0);
  }
  change() {
    let c1 = this.getNumber(5, 20);
    this.x = Array(this.getNumber(5, 20)).fill(1);
    // this.y = Array(this.getNumber(5, 20)).fill(1);
    this.rr = this.getNumber(1, 6);
    this.y = Array(this.rr * 3).fill(1);
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
    let that = this;
    let Level = x.map((d1, i1) => {
      return {
        levelnumber: i1 + 1,
        levelData: y.map((d2, i2) => {
          let a = [2, 2, 2, 2, 5];
          let g = "G";
          if (Math.floor(i2 / that.rr) == 0) {
            g = "G";
          }
          if (Math.floor(i2 / that.rr) == 1) {
            g = "M";
          }
          if (Math.floor(i2 / that.rr) == 2) {
            g = "T";
          }
          // if (i2 == 0 || i2 == 1) {
          //   g = "G";
          // }
          // if (i2 == 2 || i2 == 3) {
          //   g = "M";
          // }
          // if (i2 == 4 || i2 == 5) {
          //   g = "T";
          // }
          return {
            slot: {
              slotnumber: this.genRand(2),
              seq: i2 + 1,
              // status: Math.floor(Math.random() * 100) % 2 === 0 ? 1 : 0,
              status: a[Math.floor(Math.random() * a.length)] % 2 === 0 ? 1 : 0,
              // desc: this.genRand(4),
              desc: "A" + (i1 + 1) + g + ((i2 % that.rr) + 1),
            },
          };
        }),
      };
    });

    return {
      row: {
        rownumber: "A",
        Level: Level,
      },
    };
  }
}
