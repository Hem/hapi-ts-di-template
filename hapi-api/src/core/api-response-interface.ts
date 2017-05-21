import * as Hapi from 'hapi';


// The `apiMethod` constructor will take an `ApiMethodDefinition` as argument.
export type ApiMethodDefinition<T> = (req: Hapi.Request) => Promise<T>

// Now the constructor:
export function apiMethod<T> (f: ApiMethodDefinition<T>): any {
  // here we take benefit from Request & Response typings
  return async function (req: Hapi.Request, reply: Hapi.ReplyWithContinue) {
    // No way you forget the try/catch
    try {
      // call the apiMethod definition
      const data = await f(req);

      if (data) {
          reply(data);
      } else {
          reply(data).code(404);
      }
    } catch (e) {
      // always catch any unexpected error
      reply(e).code(500);
    }
  }
}