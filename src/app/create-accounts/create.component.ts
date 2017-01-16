/**
 * Created by Paulius on 11/9/2016.
 */
import {Component} from "@angular/core";
import {SocketIOService} from "../services/socket.service";

@Component({
  selector: 'create-accounts',
  templateUrl: './create.component.html'
})

export class CreateAccounts {

  accounts: number = 18;
  proxies: number = 6;
  email: string;
  createdAccounts = [];

  constructor(private socket: SocketIOService) {
    var self = this
    socket.socket.on('account created', function (account) {
      console.log(account)
      self.createdAccounts.push(account.toString())
    })

    socket.socket.on('test', function () {
      console.log('test')
    })
  }

  submit() {
    console.log("submit")
    this.socket.emitData('createaccounts', {
      accountCount: this.accounts,
      proxyCount: this.proxies,
      emailName: this.email
    })
  }


}
