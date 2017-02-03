import { Injectable } from '@angular/core';

import {
  Interceptor,
  InterceptorRequest,
  InterceptorRequestBuilder
} from 'x-ng2-http-interceptor';

@Injectable()
export class ShortCircuitTriggerHttpInterceptor implements Interceptor {

  beforeRequest(request: InterceptorRequest, interceptorStep: number): InterceptorRequest | void {
    if (request.sharedData['short-circuit']) {
      const builder = InterceptorRequestBuilder.new(request)
        .shortCircuitAtCurrentStep(true);
      if (request.sharedData['complete']) {
        builder.alsoForceRequestCompletion(true);
      }
      return builder.build();
    }
  }

}
