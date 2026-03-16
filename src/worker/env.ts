export type Env = {
  // Cloudflare D1 (Wrangler binding: DB)
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => any;
      all: () => Promise<{ results: unknown[] }>;
      first: () => Promise<any>;
    };
  };

  // Optional bindings configured in wrangler.json
  R2_BUCKET?: unknown;
  EMAILS?: unknown;
};

