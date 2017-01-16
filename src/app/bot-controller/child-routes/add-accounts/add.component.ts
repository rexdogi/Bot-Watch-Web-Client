import {SelectItem} from "primeng/components/common/api";
import {Component} from  "@angular/core"
import {HTTPService} from "../../../services/http.service";
import {SocketIOService} from "../../../services/socket.service";
import {ActivatedRoute} from "@angular/router";
/**
 * Created by Paulius on 11/11/2016.
 */
@Component({
  templateUrl: './add.component.html'
})

export class AddAccounts {

  accounts: SelectItem[];
  selectedAccount: string;
  params : any;
  sessionId
  name: string;
  count: string;
  myText;

  constructor(private hs:HTTPService, private socket:SocketIOService, private route: ActivatedRoute) {
    hs.get('/accounts').subscribe(
      data => {
        this.pushAccounts(data)
      }
    )
    this.params = route.snapshot.parent.params['id']
    console.log(this.params)
  }

  pushAccounts(data) {
    var account = [];
    for(var i = 0; i < data.length; i++) {
      account.push({label: data[i].accountId, value: JSON.stringify({name: data[i].names, password: data[i].passwords})})
    }
    this.accounts = account;
    console.log(this.accounts)
  }

  addManually() {
    this.socket.socket.emit('addmanually', {
      name: this.name,
      count: this.count
    })
  }

  submit() {
    console.log("sending")
    console.log({
      name: this.selectedAccount,
      id: this.params
    })
    this.socket.socket.emit('add accounts', {
      name: JSON.parse(this.selectedAccount).name,
      password: JSON.parse(this.selectedAccount).password,
      id: this.params
    })
  }

  remove() {
    this.hs.remove('/removeAccount/' + this.selectedAccount).subscribe(
      data => {
        console.log(data)
      },
      err => console.log(err)
    )
    for(var i = 0; i < this.accounts.length; i++) {
      if(this.accounts[i].label == this.selectedAccount) {
        this.accounts.splice(i, 1)
        return
      }
    }
  }

  addText() {
    var names = [];
    var passwords = [];
    var line = this.myText.split("\n")
    for(var i = 0; i < line.length; i++) {
      var lineValues = line[i].split(":")
      names.push(lineValues[0])
      passwords.push(lineValues[1])
    }
    this.socket.socket.emit('addmanually', {
      name: names,
      password: passwords
    })
  }
}
