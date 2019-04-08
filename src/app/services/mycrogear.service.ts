import { Injectable } from "@angular/core";
import { variable } from "@angular/compiler/src/output/output_ast";
declare let Microgear: any;
@Injectable({
  providedIn: "root"
})
export class MycrogearService {
  constructor() {}
  public microgaer() {
    let microgear = Microgear.create({
      key: "QsgQQg5wtcnAdwM",
      secret: "mjB636RFLQmx0iP13vQdgfm42",
      alias: "MyApp"
    });
    microgear.connect("ionic");
    return microgear;
  }
}
