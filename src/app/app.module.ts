import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, ActivatedRoute} from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { XLarge } from './home/x-large';
import {
  TabMenuModule,
  SliderModule,
  ButtonModule,
  InputTextModule,
  ListboxModule
} from 'primeng/primeng';
import {CreateAccounts} from "./create-accounts/create.component";
import {SocketIOService} from "./services/socket.service";
import {BotController} from "./bot-controller/controller.component";
import {HTTPService} from "./services/http.service";
import {AddAccounts} from "./bot-controller/child-routes/add-accounts/add.component";
import {Proxies} from "./bot-controller/child-routes/proxies/proxies.component";
import {StartScript} from "./bot-controller/child-routes/start-script/start.component";
import {Mules} from "./mules/mules.component";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    Mules,
    NoContentComponent,
    CreateAccounts,
    BotController,
    AddAccounts,
    Proxies,
    StartScript,
    XLarge,
  ],
  imports: [ // import Angular's modules
    SliderModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    ListboxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InputTextareaModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    SocketIOService,
    HTTPService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

