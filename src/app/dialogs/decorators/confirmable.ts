import 'reflect-metadata';
import { Dialog } from '@angular/cdk/dialog';
import { lastValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../dialogs';
import { DialogsModule } from '../dialogs.module';
import { ConfirmDialogOptions } from '../types';

const CONFIRM_TARGET = Symbol('CONFIRM_TAGET');

const defaultOptions: ConfirmDialogOptions = {
  description: '진행하시겠습니까?'
};

export interface ConfirmTargetParam {
  index: number;
  key?: string;
}

export function ConfirmTarget(key?: string): ParameterDecorator {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    let params: ConfirmTargetParam[] = Reflect.getOwnMetadata(CONFIRM_TARGET, target, propertyKey) || [];
    params.push({
      index: parameterIndex,
      key,
    });
    Reflect.defineMetadata(CONFIRM_TARGET, params, target, propertyKey);
  };
}

export function Confirmable(options?: ConfirmDialogOptions) {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    const data = { ...defaultOptions, ...options };

    descriptor.value = async function (...args: any) {
      const targetParams: ConfirmTargetParam[] = Reflect.getOwnMetadata(CONFIRM_TARGET, target, propertyKey);
      console.log(args);
      if (targetParams && targetParams.length > 0) {
        const { index, key } = targetParams[0];
        console.log(key);
        const str = key ? args[index][key] : args[index];
        data!.title = options?.title?.replace('%s', str) || '';
        data!.description = options?.description?.replace('%s', str) || '';

      }

      let dialog: Dialog = DialogsModule.injector.get<Dialog>(Dialog);
      const yes = await lastValueFrom(dialog.open(ConfirmDialogComponent, { data }).closed);
      if (!yes) {
        return;
      }

      return original!.apply(this, arguments);
    }
  };
}
