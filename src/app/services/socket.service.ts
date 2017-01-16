/**
 * Created by Paulius on 11/9/2016.
 */
import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";

@Injectable()
export class SocketIOService {

  public socket;

  constructor() {
    this.socket = io('http://194.135.90.112:3001/');
    var self = this;
    this.socket.on('connect', function () {
      self.socket.emit('web')
    })

  }

  emitData(event, data) {
    this.socket.emit(event, data)
  }
}
