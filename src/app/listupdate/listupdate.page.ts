import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";


@Component({
  selector: "app-listupdate",
  templateUrl: "./listupdate.page.html",
  styleUrls: ["./listupdate.page.scss"]
})
export class ListupdatePage implements OnInit {
  public formUpdateList: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private router: Router,
    public fb: AngularFireDatabase
  ) {}

  ngOnInit() {
    let dataRoutes = JSON.parse(this.route.snapshot.paramMap.get("data"));
    //console.log(JSON.parse(dataRoutes));
    this.formUpdateList = this.formBuild.group({
      key: [dataRoutes.key, Validators.required],
      Temperature: [dataRoutes.payload.Temperature, Validators.required],
      Humadity: [dataRoutes.payload.Humadity, Validators.required]
    });
  }
  public onUpdate() {
    let keyUpdate = this.formUpdateList.value.key;

    if (confirm("ยืนยันการแก้ไข")) delete this.formUpdateList.value.key;
    this.fb
      .object("/logs/" + keyUpdate)
      .update(this.formUpdateList.value)
      .then((value: any) => {
        //arrow FN
        this.router.navigate(["/list"]);
      })
      .catch((reason: any) => {});
    // console.log(this.formUpdateList.value);
  }
}
