import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QlockPage } from './qlock.page';

const routes: Routes = [
  {
    path: '',
    component: QlockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QlockPageRoutingModule {}
