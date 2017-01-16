/**
 * Created by Paulius on 11/11/2016.
 */
import {Component} from "@angular/core";
import {MenuItem} from "primeng/components/common/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './controller.component.html'
})

export class BotController {

  id;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => {
        if(params['id']) {
          this.id = params
          this.init()
        }
      }
    )
  }

  private items:MenuItem[];


  init() {
    this.items = [
      {label: 'Add accounts', icon: 'fa-calendar', routerLink: ['/bot/' + this.id.id + '/add']},
      {label: 'Proxies', icon: 'fa-calendar', routerLink: ['/bot/' + this.id.id + '/proxy']},
      {label: 'Start script', icon: 'fa-calendar',routerLink: ['/bot/' + this.id.id + '/start']},
      {label: 'Status', icon: 'fa-calendar'}
    ]
  }
}
