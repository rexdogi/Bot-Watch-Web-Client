import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import {CreateAccounts} from "./create-accounts/create.component";
import {BotController} from "./bot-controller/controller.component";
import {AddAccounts} from "./bot-controller/child-routes/add-accounts/add.component";
import {Proxies} from "./bot-controller/child-routes/proxies/proxies.component";
import {StartScript} from "./bot-controller/child-routes/start-script/start.component";
import {Mules} from "./mules/mules.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'create', component: CreateAccounts},
  { path: 'mules', component: Mules},
  { path: 'bot/:id', component: BotController, children: [
    { path: '', component: AddAccounts},
    { path: 'add', component: AddAccounts},
    { path: 'proxy', component: Proxies},
    { path: 'start', component: StartScript}
  ]},
  { path: '**',    component: NoContentComponent },
];
