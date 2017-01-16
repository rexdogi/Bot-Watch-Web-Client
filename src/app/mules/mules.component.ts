
import {Component} from "@angular/core";
import {SelectItem} from "primeng/components/common/api";
import {SocketIOService} from "../services/socket.service";
import {HTTPService} from "../services/http.service";

@Component({
  templateUrl: './mules.component.html'
})

export class Mules {

  mules: SelectItem[]
  selectedMule: string
  mule: string

  constructor(private socket: SocketIOService, private hs:HTTPService) {
    this.mules = [{label: "  ", value: "  "}]
    this.hs.get('/getMules').subscribe(
      data => {
        var dataM = [];
        for(var i = 0; i < data.length; i++) {
          dataM.push({label: data[i].name, value: data[i].name})
        }
        this.mules = dataM;
      },
      err => console.log(err)
    )
  }

  start() {
    this.socket.socket.emit("startnow", {mule: this.selectedMule})
  }

  add() {
    this.mules.push({label: this.mule, value: this.mule})
    this.socket.socket.emit("addmule", {name: this.mule})
  }
}
