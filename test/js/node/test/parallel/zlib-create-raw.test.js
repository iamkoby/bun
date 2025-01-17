//#FILE: test-zlib-create-raw.js
//#SHA1: 187539d5696ec6b7c567dfba0d1528c4b65d1e0a
//-----------------
"use strict";

const zlib = require("zlib");

test("zlib.createInflateRaw() creates an instance of InflateRaw", () => {
  const inflateRaw = zlib.createInflateRaw();
  expect(inflateRaw).toBeInstanceOf(zlib.InflateRaw);
});

test("zlib.createDeflateRaw() creates an instance of DeflateRaw", () => {
  const deflateRaw = zlib.createDeflateRaw();
  expect(deflateRaw).toBeInstanceOf(zlib.DeflateRaw);
});
