import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit
} from "@angular/core";
import { PackagesService } from "./services/packages.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Package } from "./interfaces/package";
// import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = "flink-ecosystem";
  packages: Package[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    private packagesService: PackagesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPackages(): void {
    this.packagesService
      .getPackages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.packages = data.items || [];
          this.cdr.markForCheck();
        },
        error => {
          this.cdr.markForCheck();
        }
      );
  }
}
