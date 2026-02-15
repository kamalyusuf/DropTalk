import * as Sentry from "@sentry/node";
import { env } from "./lib/env.js";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (env.SENTRY_DSN)
  Sentry.init({
    dsn: env.SENTRY_DSN,
    integrations: [Sentry.httpIntegration(), nodeProfilingIntegration()],
    tracesSampleRate: 1.0
  });
