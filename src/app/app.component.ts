import {Component, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Location} from '@angular/common';
import {SocketIOService} from "./services/socket.service";
import {HTTPService} from "./services/http.service";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  private items: MenuItem[];

  private links: string[];

  constructor(private location:Location, private socket:SocketIOService, private hs:HTTPService){
    this.init()
    var self = this
    socket.socket.on('controller connected', function (data) {
      console.log(data)
      var url = self.getUrl(data);
      self.items.push(
        {label: self.getNormalIp(data), icon: 'fa-android', routerLink: ['/bot/' + url]}
      )
    })
  }

  ngOnInit() {
    this.items = [
      {label: 'Create Accounts', icon: 'fa-calendar', routerLink: ['/create']},
      {label: 'Mules', icon: 'fa-calendar', routerLink: ['/mules']}
    ];
  }

  getUrl(data: string) {
    return data.split('.').join('');
  }

  getNormalIp(data: string) {
    return data
  }

  init() {
    this.hs.get('/controller').subscribe(
      data => {
        console.log(data)
        this.pushControllers(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  pushControllers(data) {
    for(var i = 0; i < data.length; i++) {
      this.items.push({label: this.getNormalIp(data[i].ip), icon: 'fa-android', routerLink: ['/bot/' + this.getUrl(data[i].ip)]})
    }
  }

}
