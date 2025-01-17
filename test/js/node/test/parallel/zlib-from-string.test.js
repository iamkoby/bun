//#FILE: test-zlib-from-string.js
//#SHA1: 0514669607bbf01e20f41875fa716660ebfcf28b
//-----------------
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";
// Test compressing and uncompressing a string with zlib

const zlib = require("zlib");

const inputString =
  "ΩΩLorem ipsum dolor sit amet, consectetur adipiscing eli" +
  "t. Morbi faucibus, purus at gravida dictum, libero arcu " +
  "convallis lacus, in commodo libero metus eu nisi. Nullam" +
  " commodo, neque nec porta placerat, nisi est fermentum a" +
  "ugue, vitae gravida tellus sapien sit amet tellus. Aenea" +
  "n non diam orci. Proin quis elit turpis. Suspendisse non" +
  " diam ipsum. Suspendisse nec ullamcorper odio. Vestibulu" +
  "m arcu mi, sodales non suscipit id, ultrices ut massa. S" +
  "ed ac sem sit amet arcu malesuada fermentum. Nunc sed. ";
const expectedBase64Deflate =
  "eJxdUUtOQzEMvMoc4OndgT0gJCT2buJWlpI4jePeqZfpmX" +
  "AKLRKbLOzx/HK73q6vOrhCunlF1qIDJhNUeW5I2ozT5OkD" +
  "lKWLJWkncJG5403HQXAkT3Jw29B9uIEmToMukglZ0vS6oc" +
  "iBh4JG8sV4oVLEUCitK2kxq1WzPnChHDzsaGKy491LofoA" +
  "bWh8do43oeuYhB5EPCjcLjzYJo48KrfQBvnJecNFJvHT1+" +
  "RSQsGoC7dn2t/xjhduTA1NWyQIZR0pbHwMDatnD+crPqKS" +
  "qGPHp1vnlsWM/07ubf7bheF7kqSj84Bm0R1fYTfaK8vqqq" +
  "fKBtNMhe3OZh6N95CTvMX5HJJi4xOVzCgUOIMSLH7wmeOH" +
  "aFE4RdpnGavKtrB5xzfO/Ll9";
const expectedBase64Gzip =
  "H4sIAAAAAAAAA11RS05DMQy8yhzg6d2BPSAkJPZu4laWkjiN4" +
  "96pl+mZcAotEpss7PH8crverq86uEK6eUXWogMmE1R5bkjajN" +
  "Pk6QOUpYslaSdwkbnjTcdBcCRPcnDb0H24gSZOgy6SCVnS9Lq" +
  "hyIGHgkbyxXihUsRQKK0raTGrVbM+cKEcPOxoYrLj3Uuh+gBt" +
  "aHx2jjeh65iEHkQ8KNwuPNgmjjwqt9AG+cl5w0Um8dPX5FJCw" +
  "agLt2fa3/GOF25MDU1bJAhlHSlsfAwNq2cP5ys+opKoY8enW+" +
  "eWxYz/Tu5t/tuF4XuSpKPzgGbRHV9hN9ory+qqp8oG00yF7c5" +
  "mHo33kJO8xfkckmLjE5XMKBQ4gxIsfvCZ44doUThF2mcZq8q2" +
  "sHnHNzRtagj5AQAA";

test("deflate and inflate", async () => {
  const buffer = await new Promise((resolve, reject) => {
    zlib.deflate(inputString, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });

  const inflated = await new Promise((resolve, reject) => {
    zlib.inflate(buffer, (err, inflated) => {
      if (err) reject(err);
      else resolve(inflated);
    });
  });

  expect(inflated.toString()).toBe(inputString);
});

test("gzip and gunzip", async () => {
  const buffer = await new Promise((resolve, reject) => {
    zlib.gzip(inputString, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });

  const gunzipped = await new Promise((resolve, reject) => {
    zlib.gunzip(buffer, (err, gunzipped) => {
      if (err) reject(err);
      else resolve(gunzipped);
    });
  });

  expect(gunzipped.toString()).toBe(inputString);
});

test("unzip deflated data", async () => {
  const buffer = Buffer.from(expectedBase64Deflate, "base64");
  const unzipped = await new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, unzipped) => {
      if (err) reject(err);
      else resolve(unzipped);
    });
  });

  expect(unzipped.toString()).toBe(inputString);
});

test("unzip gzipped data", async () => {
  const buffer = Buffer.from(expectedBase64Gzip, "base64");
  const unzipped = await new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, unzipped) => {
      if (err) reject(err);
      else resolve(unzipped);
    });
  });

  expect(unzipped.toString()).toBe(inputString);
});
