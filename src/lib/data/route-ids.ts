/**
 * Id of a tour's own (default) route in the route picker.
 *
 * This lives in a plain module on purpose: a server component that imports a constant from a
 * 'use client' file does not get the value, it gets a client reference object, so every
 * `[BASE_ROUTE_ID]` key and `id: BASE_ROUTE_ID` built on the server is wrong. Server and client
 * code must both import it from here.
 */
export const BASE_ROUTE_ID = 'base';
