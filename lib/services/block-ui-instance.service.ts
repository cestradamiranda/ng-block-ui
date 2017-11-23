import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUISettings } from '../models/block-ui-settings.model';
import { BlockUIService } from '../../index';


@Injectable()
export class BlockUIInstanceService {
  blockUISettings: BlockUISettings | any = {};
  private blockUISubject: ReplaySubject<any> = new ReplaySubject();
  private blockUIObservable: Observable<any> = this.blockUISubject.asObservable();

  constructor() { }

  getSettings(): BlockUISettings | any {
    return this.blockUISettings;
  }

  setSettings(settings: BlockUISettings | any = {}): void {
    this.blockUISettings = settings;
  }

  decorate(name: string = BlockUIDefaultName): NgBlockUI {
    return {
      start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
      update: this.dispatch(this.blockUISubject, BlockUIActions.UPDATE, name),
      stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
      reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
      unsubscribe: this.dispatch(this.blockUISubject, BlockUIActions.UNSUBSCRIBE, name)
    } as NgBlockUI;
  }

  observe(): Observable<any> {
    return this.blockUIObservable;
  }

  private dispatch(subject: ReplaySubject<any>, action: BlockUIActions, name: string = BlockUIDefaultName): Function {
    return (message?: any): void => {
      subject.next({
        name,
        action,
        message
      });
    };
  }
}
