import {SocketIOService} from "../../../services/socket.service";
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './proxies.component.html'
})

export class Proxies {

  ip;
  id;

  constructor(private socket: SocketIOService, private route: ActivatedRoute) {
    this.id = route.snapshot.parent.params['id']
  }

  set() {
    this.socket.socket.emit('setproxy', {ip: this.ip, id: this.id})
  }
}
