import {SocketIOService} from "../../../services/socket.service";
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/components/common/api";
import {HTTPService} from "../../../services/http.service";

@Component({
  templateUrl: './start.component.html'
})

export class StartScript {

  accounts: MenuItem[]
  activeAccount: SelectItem[]
  mules: SelectItem[]
  scripts: SelectItem[]
  selectedMule: string
  selectedName: string
  selectedActive: string
  selectedScript: string
  scriptName: string
  ip: string;
  id: string;
  accountCount: number = 18;

  constructor(private socket: SocketIOService, private route: ActivatedRoute, private hs: HTTPService) {
    this.id = route.snapshot.parent.params['id']
    this.hs.get('/getByServer/' + this.id).subscribe(
      data => this.pushAccs(data)
    )
    this.hs.get('/getActiveAccount/' + this.id).subscribe(
      data => this.setActiveAccount(data)
    )
    this.hs.get('/getMules').subscribe(
      data => this.setMules(data)
    )
    this.hs.get('/getScripts').subscribe(
      data => this.setScripts(data)
    )
  }

  pushAccs(data) {
    if(data) {
      console.log(data);
      var accs = []
      for (var i = 0; i < data.length; i++) {
        if(data[i].names.length != 0) {
          accs.push({
            label: data[i].accountId + "(" + data[i].names.length + ")",
            value: JSON.stringify({name: data[i].names})
          })
        }
      }
      console.log(accs);
      this.accounts = accs;
    }
  }

  setActiveAccount(data) {
    console.log(data)
    if(data.length != 0) {
      this.activeAccount = [{label: data[0].name, value: data[0].name}]
    }
  }

  setMules(data) {
    var mules = [];
    for(var i = 0; i < data.length; i++) {
      mules.push({label: data[i].name, value: data[i].name})
    }
    this.mules = mules;
  }

  start() {
    this.socket.socket.emit('start', {
      name: JSON.parse(this.selectedName).name,
      ip: this.id,
      mule: this.selectedMule,
      amount: this.accountCount,
      script: this.selectedScript
    })
    this.activeAccount = [{label: this.selectedName, value: this.selectedName}]
  }

  deleteAccount() {
    this.socket.socket.emit('delete', {
      name: JSON.parse(this.selectedName).name
    })
  }

  addAccount() {

  }

  setScripts(data) {
    console.log(data[0].name)
    var scripts = []
    for(var i = 0; i < data.length; i++) {
      scripts.push({label:data[i].name, value: data[i].name})
    }
    this.scripts = scripts
  }

  startActive() {
    this.socket.socket.emit('start', {
      name: JSON.parse(this.selectedName),
      ip: this.id,
      mule: this.selectedMule,
      amount: this.accountCount,
      script: this.selectedScript
    })
  }

  add() {
    this.socket.socket.emit('addScript', {name: this.scriptName})
  }
}
