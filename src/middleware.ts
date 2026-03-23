import { auth } from "./auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("isPrerendered ", context.isPrerendered);

  const isAuthed = context.isPrerendered
    ? null
    : await auth.api.getSession({
        headers: context.request.headers,
      });

  console.log({ isAuthed });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
